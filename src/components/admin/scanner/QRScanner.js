'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import toast from 'react-hot-toast';

/**
 * Completely rewritten QR scanner with better DOM management and camera handling
 * Props:
 * - onDecode: (text) => void
 * - title: string
 */
export default function QRScanner({ onDecode, title = 'สแกน QR Code' }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const animationRef = useRef(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState(null);
  const [cameras, setCameras] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState('');
  const [permissionGranted, setPermissionGranted] = useState(false);

  // Request camera permission
  const requestCameraPermission = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach(track => track.stop()); // Stop immediately after permission check
      setPermissionGranted(true);
      return true;
    } catch (err) {
      let errorMessage = 'ไม่สามารถเข้าถึงกล้องได้';
      
      if (err.name === 'NotAllowedError') {
        errorMessage = 'กรุณาอนุญาตการเข้าถึงกล้องในเบราว์เซอร์';
      } else if (err.name === 'NotFoundError') {
        errorMessage = 'ไม่พบกล้องบนอุปกรณ์นี้';
      } else if (err.name === 'NotReadableError') {
        errorMessage = 'กล้องถูกใช้งานโดยแอปพลิเคชันอื่น';
      }
      
      setError(errorMessage);
      toast.error(errorMessage, {
        position: 'top-right',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
          padding: '16px',
          fontFamily: 'prompt, sans-serif',
          fontWeight: '500',
        },
      });
      return false;
    }
  }, []);

  // Get available cameras
  const getCameras = useCallback(async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      setCameras(videoDevices);
      
      if (videoDevices.length > 0) {
        // Prefer back camera if available
        const backCamera = videoDevices.find(device => 
          /back|rear|environment/i.test(device.label)
        );
        setSelectedDeviceId(backCamera?.deviceId || videoDevices[0].deviceId);
      }
      
      return videoDevices;
    } catch (err) {
      console.error('Error getting cameras:', err);
      return [];
    }
  }, []);

  // Start camera stream
  const startCamera = useCallback(async (deviceId) => {
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }

      const constraints = {
        video: {
          deviceId: deviceId ? { exact: deviceId } : undefined,
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: deviceId ? undefined : { ideal: 'environment' }
        }
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      // Ensure the <video> element is rendered by setting scanning state first
      setIsScanning(true);
      setError(null);

      // Attach stream once the video element is available in the DOM
      const attachStream = () => {
        if (videoRef.current) {
          videoRef.current.srcObject = streamRef.current;
          // play() might return a promise; ignore errors from autoplay policies
          try { videoRef.current.play(); } catch {}
          startScanning();
        } else {
          // Try again on next animation frame until mounted
          animationRef.current = requestAnimationFrame(attachStream);
        }
      };
      attachStream();
    } catch (err) {
      console.error('Error starting camera:', err);
      let errorMessage = 'ไม่สามารถเปิดกล้องได้';
      
      if (err.name === 'NotAllowedError') {
        errorMessage = 'กรุณาอนุญาตการเข้าถึงกล้อง';
      } else if (err.name === 'NotFoundError') {
        errorMessage = 'ไม่พบกล้องที่เลือก';
      } else if (err.name === 'NotReadableError') {
        errorMessage = 'กล้องถูกใช้งานโดยแอปอื่น';
      }
      
      setError(errorMessage);
      setIsScanning(false);
    }
  }, []);

  // QR code scanning logic
  const startScanning = useCallback(() => {
    const scan = async () => {
      if (!videoRef.current || !canvasRef.current || !isScanning) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        try {
          // Use jsQR library for QR detection
          const { default: jsQR } = await import('jsqr');
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height);

          if (code) {
            onDecode?.(code.data.trim());
            // Brief pause after successful scan
            setTimeout(() => {
              if (isScanning) {
                animationRef.current = requestAnimationFrame(scan);
              }
            }, 1000);
            return;
          }
        } catch (err) {
          console.warn('QR scanning error:', err);
        }
      }

      if (isScanning) {
        animationRef.current = requestAnimationFrame(scan);
      }
    };

    animationRef.current = requestAnimationFrame(scan);
  }, [isScanning, onDecode]);

  // Stop camera and scanning
  const stopCamera = useCallback(() => {
    setIsScanning(false);
    
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, []);

  // Initialize scanner
  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      if (!isMounted) return;
      
      const hasPermission = await requestCameraPermission();
      if (!hasPermission || !isMounted) return;

      const availableCameras = await getCameras();
      if (!isMounted || availableCameras.length === 0) {
        setError('ไม่พบกล้องบนอุปกรณ์นี้');
        return;
      }

      const deviceId = selectedDeviceId || availableCameras[0].deviceId;
      await startCamera(deviceId);
    };

    init();

    return () => {
      isMounted = false;
      stopCamera();
    };
  }, []);

  // Handle camera switch
  const handleCameraSwitch = useCallback(async (deviceId) => {
    setSelectedDeviceId(deviceId);
    await startCamera(deviceId);
  }, [startCamera]);

  // Handle file upload for QR scanning
  const handleFileUpload = useCallback(async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const { default: jsQR } = await import('jsqr');
      
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        
        if (code) {
          onDecode?.(code.data.trim());
          toast.success('สแกน QR จากรูปภาพสำเร็จ', {
            position: 'top-right',
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
              padding: '16px',
              fontFamily: 'prompt, sans-serif',
              fontWeight: '500',
            },
          });
        } else {
          toast.error('ไม่พบ QR Code ในรูปภาพ', {
            position: 'top-right',
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
              padding: '16px',
              fontFamily: 'prompt, sans-serif',
              fontWeight: '500',
            },
          });
        }
      };
      
      img.src = URL.createObjectURL(file);
    } catch (err) {
      console.error('File scan error:', err);
      toast.error('ไม่สามารถสแกนจากรูปภาพได้', {
        position: 'top-right',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
          padding: '16px',
          fontFamily: 'prompt, sans-serif',
          fontWeight: '500',
        },
      });
    }
  }, [onDecode]);

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
              <option key={camera.deviceId} value={camera.deviceId}>
                {camera.label || `กล้อง ${camera.deviceId.slice(0, 8)}`}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Video container */}
      <div className="relative flex items-center justify-center min-h-[280px] bg-gray-100 rounded-lg overflow-hidden">
        {!isScanning && !error && (
          <div className="text-sm text-earth-700 font-prompt">กำลังเตรียมกล้องสำหรับสแกน...</div>
        )}
        
        {error && (
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
                  const hasPermission = await requestCameraPermission();
                  if (hasPermission) {
                    const availableCameras = await getCameras();
                    if (availableCameras.length > 0) {
                      await startCamera(selectedDeviceId || availableCameras[0].deviceId);
                    }
                  }
                }} 
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-prompt"
              >
                ลองใหม่
              </button>
            </div>
          </div>
        )}

        {isScanning && (
          <>
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              autoPlay
              playsInline
              muted
            />
            <canvas
              ref={canvasRef}
              className="hidden"
            />
            {/* Scanning overlay */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-4 border-2 border-green-500 rounded-lg">
                <div className="absolute top-0 left-0 w-6 h-6 border-l-4 border-t-4 border-green-500"></div>
                <div className="absolute top-0 right-0 w-6 h-6 border-r-4 border-t-4 border-green-500"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 border-l-4 border-b-4 border-green-500"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-r-4 border-b-4 border-green-500"></div>
              </div>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded font-prompt text-sm">
                วาง QR Code ในกรอบเพื่อสแกน
              </div>
            </div>
          </>
        )}
      </div>

      {/* Control buttons */}
      {isScanning && (
        <div className="mt-3 flex justify-center">
          <button
            onClick={stopCamera}
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
