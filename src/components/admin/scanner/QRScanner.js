'use client';

import { useEffect, useRef, useState, useCallback, useId } from 'react';
import toast from 'react-hot-toast';
import { Html5Qrcode } from 'html5-qrcode';

/**
 * QR scanner using html5-qrcode for instant scanning
 * Props:
 * - onDecode: (text) => void
 * - title: string
 */
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
  const startRetryRef = useRef(null); // timer id
  const startAttemptsRef = useRef(0);
  const MAX_START_ATTEMPTS = 5;
  const START_RETRY_DELAY = 600; // ms

  // Get available cameras
  const getCameras = useCallback(async () => {
    try {
      const devices = await Html5Qrcode.getCameras();
      console.log('Available cameras:', devices);
      setCameras(devices);
      
      if (devices.length > 0) {
        // Prefer back camera if available
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

  // Success callback when QR code is detected
  const onScanSuccess = useCallback((decodedText, decodedResult) => {
    console.log('QR Code detected instantly:', decodedText);
    setScanCount(prev => prev + 1);
    setLastScanResult(decodedText);
    
    // Call the parent callback
    onDecode?.(decodedText);
    
    // Visual feedback
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
  }, [onDecode]);

  // Error callback
  const onScanFailure = useCallback((error) => {
    // Don't log every scan attempt failure, only real errors
    try {
      const msg = typeof error === 'string' ? error : (error?.message || String(error));
      if (!msg.includes('No QR code found')) {
        console.warn('QR scan error:', msg);
      }
    } catch {}
  }, []);

  // Start scanning with html5-qrcode
  const startScanning = useCallback(async () => {
    if (isScanning) {
      console.log('Scanner already running, skip start');
      return;
    }
    if (!selectedDeviceId) {
      console.log('No camera selected yet, skip start');
      return;
    }
    const container = document.getElementById(scannerIdRef.current);
    if (!container) {
      console.warn('qr-reader element not found in DOM; delaying start...');
      // Retry shortly in case DOM isn't painted yet
      if (startAttemptsRef.current < MAX_START_ATTEMPTS) {
        startAttemptsRef.current += 1;
        startRetryRef.current = setTimeout(() => {
          startScanning();
        }, START_RETRY_DELAY);
      } else {
        toast.error('ไม่สามารถเริ่มสแกนได้ (DOM ไม่พร้อม)', {
          position: 'top-right',
          style: { borderRadius: '10px', background: '#ef4444', color: '#fff', padding: '16px', fontFamily: 'prompt, sans-serif', fontWeight: '500' },
        });
      }
      return;
    }
    try {
      console.log('Starting html5-qrcode scanner with camera:', selectedDeviceId);
      const html5QrCode = new Html5Qrcode(scannerIdRef.current);
      html5QrCodeRef.current = html5QrCode;

      // Valid configuration for html5-qrcode when passing cameraId (deviceId string)
      const config = {
        fps: 30,
        qrbox: { width: 300, height: 300 },
        aspectRatio: 1.0,
        disableFlip: false
      };

      // Security note
      if (typeof window !== 'undefined' && !window.isSecureContext) {
        console.warn('Page not in secure context (HTTPS). Camera may not work on some browsers.');
        toast((t) => (
          'โปรดใช้งานผ่าน HTTPS หรือ localhost เพื่อให้กล้องทำงานได้อย่างถูกต้อง'
        ), {
          position: 'top-right',
          style: { borderRadius: '10px', background: '#f59e0b', color: '#111', padding: '16px', fontFamily: 'prompt, sans-serif', fontWeight: '500' },
        });
      }

      await html5QrCode.start(
        selectedDeviceId,
        config,
        onScanSuccess,
        onScanFailure
      );

      setIsScanning(true);
      setError(null);
      console.log('Html5-qrcode scanner started successfully');
      startAttemptsRef.current = 0;
    } catch (err) {
      console.error('Error starting scanner:', err);
      let errorMessage = 'ไม่สามารถเริ่มสแกนได้';
      const name = err?.name || '';
      if (name === 'NotAllowedError') {
        errorMessage = 'กรุณาอนุญาตการเข้าถึงกล้อง';
      } else if (name === 'NotFoundError') {
        errorMessage = 'ไม่พบกล้องที่เลือก';
      } else if (name === 'NotReadableError') {
        errorMessage = 'ไม่สามารถเข้าถึงสตรีมกล้องได้ อาจมีแอปใช้งานกล้องอยู่';
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

      // Retry starting if it's a transient error and attempts remain
      const transient = name === 'NotReadableError' || name === 'AbortError' || name === 'SecurityError';
      if (transient && startAttemptsRef.current < MAX_START_ATTEMPTS) {
        startAttemptsRef.current += 1;
        console.log(`Retrying start in ${START_RETRY_DELAY}ms (attempt ${startAttemptsRef.current}/${MAX_START_ATTEMPTS})`);
        startRetryRef.current = setTimeout(() => {
          startScanning();
        }, START_RETRY_DELAY);
      }
    }
  }, [selectedDeviceId, isScanning, onScanSuccess, onScanFailure]);

  // Stop scanning
  const stopScanning = useCallback(async () => {
    if (html5QrCodeRef.current && isScanning) {
      try {
        console.log('Stopping html5-qrcode scanner...');
        await html5QrCodeRef.current.stop();
        // Clear the UI and release DOM elements to avoid React DOM conflicts
        try {
          await html5QrCodeRef.current.clear();
        } catch (clearErr) {
          console.warn('Warning during scanner clear():', clearErr);
        }
        html5QrCodeRef.current = null;
        setIsScanning(false);
        console.log('Scanner stopped successfully');
      } catch (err) {
        console.error('Error stopping scanner:', err);
      }
    }
  }, [isScanning]);

  // Handle camera switch
  const handleCameraSwitch = useCallback(async (deviceId) => {
    console.log('Switching to camera:', deviceId);
    await stopScanning();
    setSelectedDeviceId(deviceId);
    // Scanner will restart automatically via useEffect
  }, [stopScanning]);

  // Handle file upload for QR scanning
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

  // Initialize scanner
  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      if (!isMounted) return;
      
      console.log('Initializing QR scanner...');
      const availableCameras = await getCameras();
      
      if (!isMounted || availableCameras.length === 0) {
        setError('ไม่พบกล้องบนอุปกรณ์นี้');
        return;
      }
      // Ensure the container is present for immediate start
      if (!document.getElementById(scannerIdRef.current)) {
        console.log('qr-reader not in DOM yet during init');
      }
    };

    init();

    return () => {
      isMounted = false;
      if (startRetryRef.current) {
        clearTimeout(startRetryRef.current);
      }
      stopScanning();
    };
  }, [getCameras, stopScanning]);

  // Auto-start scanning when camera is selected
  useEffect(() => {
    if (selectedDeviceId && !isScanning) {
      startScanning();
    }
  }, [selectedDeviceId, isScanning, startScanning]);

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="font-prompt font-bold text-earth-800 mb-3">{title}</h3>
      
      {/* Camera selector when multiple cameras */}
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

      {/* Scanner container */}
      <div className="relative">
        {!isScanning && !error && (
          <div className="flex items-center justify-center min-h-[280px] bg-gray-100 rounded-lg">
            <div className="text-sm text-earth-700 font-prompt">กำลังเตรียมกล้องสำหรับสแกน...</div>
          </div>
        )}
        
        {error && (
          <div className="flex items-center justify-center min-h-[280px] bg-gray-100 rounded-lg">
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200 m-4">
              <div className="font-prompt font-medium mb-2">⚠️ ปัญหาการเข้าถึงกล้อง</div>
              <div className="font-prompt mb-2">{error}</div>
              <div className="flex gap-2">
                <button 
                  onClick={() => window.location.reload()} 
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs font-prompt"
                >
                  รีเฟรชหน้าเว็บ
                </button>
                <button 
                  onClick={async () => {
                    setError(null);
                    const availableCameras = await getCameras();
                    if (availableCameras.length > 0) {
                      setSelectedDeviceId(availableCameras[0].id);
                    }
                  }} 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-prompt"
                >
                  ลองใหม่
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Html5-qrcode scanner container */}
        <div
          id={scannerIdRef.current}
          className="w-full"
          style={{ minHeight: 300 }}
        ></div>
        
        {/* Hidden div for file scanning */}
        <div id={fileScanIdRef.current} className="hidden"></div>

        {/* Status overlay */}
        {isScanning && (
          <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded font-prompt text-xs">
            📹 สแกนอัตโนมัติ... ({scanCount} ครั้ง)
          </div>
        )}

        {/* Last scan result */}
        {lastScanResult && (
          <div className="absolute bottom-4 left-4 right-4 bg-green-500 bg-opacity-90 text-white px-3 py-2 rounded font-prompt text-sm">
            ✅ สแกนล่าสุด: {lastScanResult.substring(0, 20)}...
          </div>
        )}
      </div>

      {/* Control buttons */}
      {isScanning && (
        <div className="mt-3 flex justify-center">
          <button
            onClick={stopScanning}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-prompt text-sm"
          >
            หยุดสแกน
          </button>
        </div>
      )}

      {/* Fallback: upload image to scan */}
      <div className="mt-4 border-t pt-4">
        <label className="font-prompt text-sm text-earth-800 mb-2 block">สแกนจากรูปภาพ</label>
        <input
          type="file"
          accept="image/*"
          className="font-prompt text-sm w-full border rounded px-3 py-2"
          onChange={handleFileUpload}
        />
        <p className="text-xs text-earth-600 mt-1 font-prompt">หากกล้องใช้ไม่ได้ สามารถเลือกรูป QR จากแกลเลอรีเพื่อสแกน</p>
      </div>
    </div>
  );
}
