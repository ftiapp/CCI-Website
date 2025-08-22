'use client';

import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

/**
 * Reusable QR scanner using html5-qrcode loaded dynamically on client.
 * Props:
 * - onDecode: (text) => void
 * - title: string
 */
export default function QRScanner({ onDecode, title = 'สแกน QR Code' }) {
  const containerRef = useRef(null);
  const scannerRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(null);
  const [cameras, setCameras] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState('');
  const [Html5QrcodeModule, setHtml5QrcodeModule] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function setup() {
      try {
        const { Html5Qrcode } = await import('html5-qrcode');
        setHtml5QrcodeModule({ Html5Qrcode });
        if (!isMounted) return;
        if (!containerRef.current) return;

        // Create a container div id for the scanner
        const el = document.createElement('div');
        el.id = 'qr-reader';
        el.className = 'w-full aspect-square max-w-sm';
        containerRef.current.innerHTML = '';
        containerRef.current.appendChild(el);

        // Get cameras first
        const cams = await Html5Qrcode.getCameras();
        if (!cams || cams.length === 0) {
          setError('ไม่พบอุปกรณ์กล้อง');
          setReady(false);
          toast.error('ไม่พบอุปกรณ์กล้องบนเครื่องนี้', {
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
          return;
        }
        setCameras(cams);
        const deviceId = cams.find(c => /back|rear|environment/i.test(c.label))?.id || cams[0].id;
        setSelectedDeviceId(deviceId);

        const html5QrCode = new Html5Qrcode('qr-reader');
        scannerRef.current = html5QrCode;

        const config = { fps: 10, qrbox: { width: 250, height: 250 } };

        // Start with chosen deviceId
        // Debounced continuous scanning (no stop), for fast repeated scans
        let accepting = true;
        await html5QrCode.start({ deviceId: { exact: deviceId } }, config, (decodedText) => {
          if (!decodedText) return;
          if (!accepting) return;
          accepting = false;
          onDecode?.(decodedText.trim());
          // Re-accept after short delay
          setTimeout(() => { accepting = true; }, 1200);
        });

        setReady(true);
      } catch (e) {
        console.error('QR scanner init error:', e);
        setError(e?.message || 'Unable to start camera');
        toast.error('ไม่สามารถเปิดกล้องสำหรับสแกนได้', {
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
    }

    // Only run on client
    if (typeof window !== 'undefined') {
      setup();
    }

    return () => {
      isMounted = false;
      if (scannerRef.current) {
        // Only stop stream; do not call clear() to avoid DOM race with React unmount
        Promise.resolve(scannerRef.current.stop()).catch(() => {});
      }
    };
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
            onChange={async (e) => {
              const newId = e.target.value;
              setSelectedDeviceId(newId);
              if (scannerRef.current) {
                try {
                  // Stop current stream before switching
                  await scannerRef.current.stop();
                } catch {}
                try {
                  let accepting = true;
                  await scannerRef.current.start({ deviceId: { exact: newId } }, { fps: 10, qrbox: { width: 250, height: 250 } }, (decodedText) => {
                    if (!decodedText) return;
                    if (!accepting) return;
                    accepting = false;
                    onDecode?.(decodedText.trim());
                    setTimeout(() => { accepting = true; }, 1200);
                  });
                } catch (err) {
                  console.error('Switch camera failed:', err);
                  toast.error('สลับกล้องไม่สำเร็จ', { position: 'top-right', style: { borderRadius: '10px', background: '#333', color: '#fff', padding: '16px', fontFamily: 'prompt, sans-serif', fontWeight: '500' } });
                }
              }
            }}
          >
            {cameras.map((c) => (
              <option key={c.id} value={c.id}>{c.label || c.id}</option>
            ))}
          </select>
        </div>
      )}

      <div ref={containerRef} className="flex items-center justify-center min-h-[280px]">
        {!ready && !error && (
          <div className="text-sm text-earth-700">กำลังเตรียมกล้องสำหรับสแกน...</div>
        )}
        {error && (
          <div className="text-sm text-red-600">
            ไม่สามารถใช้กล้องได้ โปรดอนุญาตการใช้งานกล้อง หรือลองใหม่อีกครั้ง
          </div>
        )}
      </div>

      {/* Fallback: upload image to scan */}
      <div className="mt-3">
        <label className="font-prompt text-sm text-earth-800 mb-1 block">สแกนจากรูปภาพ</label>
        <input
          type="file"
          accept="image/*"
          className="font-prompt text-sm"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            if (!Html5QrcodeModule || !Html5QrcodeModule.Html5Qrcode) {
              toast.error('ไม่พร้อมสำหรับการสแกนไฟล์รูปภาพ', { position: 'top-right', style: { borderRadius: '10px', background: '#333', color: '#fff', padding: '16px', fontFamily: 'prompt, sans-serif', fontWeight: '500' } });
              return;
            }
            try {
              // Use a temporary instance for file scanning
              const tempId = 'qr-file-reader-' + Date.now();
              const tempDiv = document.createElement('div');
              tempDiv.id = tempId;
              tempDiv.style.display = 'none';
              document.body.appendChild(tempDiv);
              const reader = new Html5QrcodeModule.Html5Qrcode(tempId);
              const result = await reader.scanFile(file, true);
              // Do NOT call clear() then remove child to avoid double-removal race
              // Try to close the instance gracefully
              try { await reader.stop(); } catch {}
              // Remove temp div if still in DOM
              if (document.body.contains(tempDiv)) {
                document.body.removeChild(tempDiv);
              }
              if (result) {
                onDecode?.(String(result).trim());
              } else {
                toast.error('ไม่พบ QR ในรูปภาพ', { position: 'top-right', style: { borderRadius: '10px', background: '#333', color: '#fff', padding: '16px', fontFamily: 'prompt, sans-serif', fontWeight: '500' } });
              }
            } catch (err) {
              console.error('Scan image error:', err);
              toast.error('สแกนจากรูปภาพไม่สำเร็จ', { position: 'top-right', style: { borderRadius: '10px', background: '#333', color: '#fff', padding: '16px', fontFamily: 'prompt, sans-serif', fontWeight: '500' } });
            }
          }}
        />
        <p className="text-xs text-earth-600 mt-1 font-prompt">หากกล้องใช้ไม่ได้ สามารถเลือกรูป QR จากแกลเลอรีเพื่อสแกน</p>
      </div>
    </div>
  );
}
