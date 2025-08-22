'use client';

import { useEffect, useRef, useState, useCallback, useId } from 'react';
import toast from 'react-hot-toast';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';

export default function QRScanner({ onDecode, title = 'สแกน QR Code' }) {
  const html5QrCodeRef = useRef(null);
  const reactId = useId();
  const scannerIdRef = useRef(`qr-reader-${reactId}-${Date.now()}`);
  const fileScanIdRef = useRef(`file-scan-${reactId}-${Date.now()}`);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState(null);
  const [cameras, setCameras] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState('');
  const [lastScanResult, setLastScanResult] = useState('');
  const [scanCount, setScanCount] = useState(0);
  // Cooldown/lock to prevent rapid repeated decode callbacks
  const decodeLockedRef = useRef(false);
  const lastDecodedTextRef = useRef('');
  const cooldownMsRef = useRef(1200);

  // Get available cameras
  const getCameras = useCallback(async () => {
    try {
      const devices = await Html5Qrcode.getCameras();
      console.log('Available cameras:', devices);
      setCameras(devices);
      
      if (devices.length > 0) {
        const backCamera = devices.find(device => 
          /back|rear|environment/i.test(device.label)
        );
        setSelectedDeviceId(backCamera?.id || devices[0].id);
      }
      
      return devices;
    } catch (err) {
      console.error('Error getting cameras:', err);
      setError('ไม่สามารถเข้าถึงกล้องได้');
      return [];
    }
  }, []);

  // Success callback - ปรับให้รับ QR ได้ดีขึ้น
  const onScanSuccess = useCallback((decodedText, decodedResult) => {
    // Throttle repeated detections
    const normalizedText = String(decodedText || '').trim();
    if (decodeLockedRef.current && normalizedText === lastDecodedTextRef.current) {
      // Ignore identical scans during cooldown
      return;
    }

    lastDecodedTextRef.current = normalizedText;
    decodeLockedRef.current = true;

    // Try to briefly pause the scanner (if supported) to avoid multiple triggers
    try {
      if (html5QrCodeRef.current && typeof html5QrCodeRef.current.pause === 'function') {
        html5QrCodeRef.current.pause(true);
      }
    } catch {}

    console.log('QR Code detected:', normalizedText);
    setScanCount(prev => prev + 1);
    setLastScanResult(normalizedText);

    onDecode?.(normalizedText);

    toast.success('🎯 สแกน QR สำเร็จ!', {
      position: 'top-right',
      duration: 1000,
      style: {
        borderRadius: '10px',
        background: '#22c55e',
        color: '#fff',
        padding: '12px',
        fontFamily: 'prompt, sans-serif',
        fontWeight: '500',
      },
    });

    // Release lock after cooldown and resume scanning if it was paused
    setTimeout(() => {
      decodeLockedRef.current = false;
      try {
        if (html5QrCodeRef.current && typeof html5QrCodeRef.current.resume === 'function') {
          html5QrCodeRef.current.resume();
        }
      } catch {}
    }, cooldownMsRef.current);
  }, [onDecode]);

  // Error callback - เงียบลง
  const onScanFailure = useCallback((error) => {
    // ไม่ต้อง log ทุกครั้ง เพราะจะ spam console
  }, []);

  // Helper to detect iOS Safari
  const isIOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isSafari = typeof navigator !== 'undefined' && /Safari/.test(navigator.userAgent) && !/Chrome|CriOS|Edg|OPR/.test(navigator.userAgent);

  // Start scanning - ปรับ config ให้อ่าน QR ได้ดีขึ้น และรองรับ Safari/iOS
  const startScanning = useCallback(async () => {
    if (isScanning || !selectedDeviceId) return;
    
    const container = document.getElementById(scannerIdRef.current);
    if (!container) {
      setTimeout(startScanning, 500);
      return;
    }

    try {
      console.log('Starting QR scanner...');
      const html5QrCode = new Html5Qrcode(scannerIdRef.current);
      html5QrCodeRef.current = html5QrCode;

      // Config: ใช้กรอบสแกนแบบปรับตามจอ และรองรับ Safari/iOS ให้ดีขึ้น
      const baseConfig = {
        fps: 20,
        qrbox: (viewfinderWidth, viewfinderHeight) => {
          const size = Math.min(320, Math.floor(Math.min(viewfinderWidth, viewfinderHeight) * 0.7));
          return { width: size, height: size };
        },
        aspectRatio: isIOS ? undefined : 1.3333, // ไม่กำหนดใน iOS เพื่อลดปัญหากล้อง
        disableFlip: isIOS || isSafari, // ปิด mirror ใน Safari/iOS
        rememberLastUsedCamera: true,
        formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
        // ใช้ Detector ถ้าบราวเซอร์รองรับ (ไม่กระทบ Safari เก่า)
        experimentalFeatures: { useBarCodeDetectorIfSupported: true }
      };

      // พยายาม start แบบปกติก่อนด้วย deviceId
      let started = false;
      try {
        await html5QrCode.start(
          selectedDeviceId,
          baseConfig,
          onScanSuccess,
          onScanFailure
        );
        started = true;
      } catch (e1) {
        console.warn('Start with deviceId failed, retry with facingMode environment:', e1);
      }

      // ถ้าไม่สำเร็จ ลอง fallback สำหรับ Safari/iOS
      if (!started) {
        const fallbackConfig = {
          ...baseConfig,
          videoConstraints: {
            facingMode: { exact: 'environment' }
          }
        };
        try {
          await html5QrCode.start(
            fallbackConfig.videoConstraints,
            fallbackConfig,
            onScanSuccess,
            onScanFailure
          );
          started = true;
        } catch (e2) {
          console.error('Fallback start failed:', e2);
          throw e2;
        }
      }

      setIsScanning(true);
      setError(null);
      console.log('Scanner started successfully');
    } catch (err) {
      console.error('Error starting scanner:', err);
      let errorMessage = 'ไม่สามารถเริ่มสแกนได้';
      
      if (err?.name === 'NotAllowedError') {
        errorMessage = 'กรุณาอนุญาตการเข้าถึงกล้อง';
      } else if (err?.name === 'NotFoundError') {
        errorMessage = 'ไม่พบกล้องที่เลือก';
      } else if (err?.name === 'NotReadableError') {
        errorMessage = 'กล้องถูกใช้งานโดยแอปอื่น';
      }
      
      setError(errorMessage);
      toast.error(errorMessage, {
        position: 'top-right',
        style: {
          borderRadius: '10px',
          background: '#ef4444',
          color: '#fff',
          padding: '16px',
          fontFamily: 'prompt, sans-serif',
          fontWeight: '500',
        },
      });
    }
  }, [selectedDeviceId, isScanning, onScanSuccess, onScanFailure]);

  // Stop scanning
  const stopScanning = useCallback(async () => {
    if (html5QrCodeRef.current && isScanning) {
      try {
        await html5QrCodeRef.current.stop();
        await html5QrCodeRef.current.clear();
        html5QrCodeRef.current = null;
        setIsScanning(false);
      } catch (err) {
        console.error('Error stopping scanner:', err);
      }
    }
  }, [isScanning]);

  // Handle camera switch
  const handleCameraSwitch = useCallback(async (deviceId) => {
    await stopScanning();
    setSelectedDeviceId(deviceId);
  }, [stopScanning]);

  // Handle file upload
  const handleFileUpload = useCallback(async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const html5QrCode = new Html5Qrcode(fileScanIdRef.current);
      const result = await html5QrCode.scanFile(file, true);
      
      onDecode?.(result);
      toast.success('🎯 สแกน QR จากรูปภาพสำเร็จ', {
        position: 'top-right',
        style: {
          borderRadius: '10px',
          background: '#22c55e',
          color: '#fff',
          padding: '16px',
          fontFamily: 'prompt, sans-serif',
          fontWeight: '500',
        },
      });
    } catch (err) {
      console.error('File scan error:', err);
      toast.error('ไม่พบ QR Code ในรูปภาพ', {
        position: 'top-right',
        style: {
          borderRadius: '10px',
          background: '#ef4444',
          color: '#fff',
          padding: '16px',
          fontFamily: 'prompt, sans-serif',
          fontWeight: '500',
        },
      });
    }
  }, [onDecode]);

  // Initialize
  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      if (!isMounted) return;
      
      const availableCameras = await getCameras();
      
      if (!isMounted || availableCameras.length === 0) {
        setError('ไม่พบกล้องบนอุปกรณ์นี้');
        return;
      }
    };

    init();

    return () => {
      isMounted = false;
      stopScanning();
    };
  }, [getCameras, stopScanning]);

  // Auto-start scanning
  useEffect(() => {
    if (selectedDeviceId && !isScanning) {
      startScanning();
    }
  }, [selectedDeviceId, isScanning, startScanning]);

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="font-prompt font-bold text-earth-800 mb-3">{title}</h3>
      
      {/* Camera selector */}
      {cameras.length > 1 && (
        <div className="mb-3 flex items-center gap-2">
          <label className="font-prompt text-sm text-earth-800">เลือกกล้อง:</label>
          <select
            className="border rounded px-2 py-1 font-prompt text-sm"
            value={selectedDeviceId}
            onChange={(e) => handleCameraSwitch(e.target.value)}
          >
            {cameras.map((camera) => (
              <option key={camera.id} value={camera.id}>
                {camera.label || `กล้อง ${camera.id.slice(0, 8)}`}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* แสดงเคล็ดลับสำคัญ */}
      {isScanning && (
        <div className="mb-3 bg-yellow-50 border border-yellow-200 rounded p-2">
          <div className="font-prompt text-xs text-yellow-800">
            💡 <strong>เคล็ดลับ:</strong> ถือให้นิ่ง ห่างจาก QR Code ประมาณ 15-25 ซม. และให้แสงสว่างเพียงพอ
          </div>
        </div>
      )}

      {/* Scanner container */}
      <div className="relative">
        {!isScanning && !error && (
          <div className="flex items-center justify-center min-h-[280px] bg-gray-100 rounded-lg">
            <div className="text-sm text-earth-700 font-prompt">กำลังเตรียมกล้อง...</div>
          </div>
        )}
        
        {error && (
          <div className="flex items-center justify-center min-h-[280px] bg-gray-100 rounded-lg">
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200 m-4">
              <div className="font-prompt font-medium mb-2">⚠️ {error}</div>
              <button 
                onClick={() => window.location.reload()} 
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs font-prompt"
              >
                รีเฟรชหน้าเว็บ
              </button>
            </div>
          </div>
        )}

        {/* Html5-qrcode container */}
        <div
          id={scannerIdRef.current}
          className="w-full"
          style={{ minHeight: 300 }}
        ></div>
        
        {/* Hidden div for file scanning */}
        <div id={fileScanIdRef.current} className="hidden"></div>

        {/* Status */}
        {isScanning && (
          <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded font-prompt text-xs">
            📹 กำลังสแกน... ({scanCount} ครั้ง)
          </div>
        )}

        {/* Last result */}
        {lastScanResult && (
          <div className="absolute bottom-4 left-4 right-4 bg-green-500 bg-opacity-90 text-white px-3 py-2 rounded font-prompt text-sm">
            ✅ สแกนล่าสุด: {lastScanResult.substring(0, 30)}...
          </div>
        )}
      </div>

      {/* Control buttons */}
      {isScanning && (
        <div className="mt-3 flex justify-center gap-2">
          <button
            onClick={stopScanning}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-prompt text-sm"
          >
            หยุดสแกน
          </button>
          <button
            onClick={() => {
              stopScanning().then(() => {
                setTimeout(startScanning, 500);
              });
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-prompt text-sm"
          >
            🔄 รีสตาร์ท
          </button>
        </div>
      )}

      {/* File upload fallback */}
      <div className="mt-4 border-t pt-4">
        <label className="font-prompt text-sm text-earth-800 mb-2 block">สแกนจากรูปภาพ</label>
        <input
          type="file"
          accept="image/*"
          className="font-prompt text-sm w-full border rounded px-3 py-2"
          onChange={handleFileUpload}
        />
        <p className="text-xs text-earth-600 mt-1 font-prompt">
          หากกล้องใช้ไม่ได้ สามารถเลือกรูป QR จากแกลเลอรีเพื่อสแกน
        </p>
      </div>
    </div>
  );
}