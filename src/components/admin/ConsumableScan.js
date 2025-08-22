'use client';

import { useCallback, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import QRScanner from './scanner/QRScanner';
import { XCircleIcon } from '@heroicons/react/24/solid';

// Props: { type: 'beverage' | 'food', title: string }
export default function ConsumableScan({ type, title }) {
  const [lastUuid, setLastUuid] = useState('');
  const [updating, setUpdating] = useState(false);
  const [duplicateInfo, setDuplicateInfo] = useState(null); // { uuid, first_name, last_name }

  const toastStyle = {
    borderRadius: '10px',
    background: '#333',
    color: '#fff',
    padding: '16px',
    fontFamily: 'prompt, sans-serif',
    fontWeight: '500',
  };

  const normalizeUuid = (raw) => {
    if (!raw) return '';
    const s = String(raw).trim().toUpperCase();
    
    // More flexible pattern matching for various QR formats
    // Handle URLs with embedded codes
    const urlMatch = s.match(/CCI-[A-Z0-9]{6}/);
    if (urlMatch) return urlMatch[0];
    
    // Handle direct UUID input
    if (/^CCI-[A-Z0-9]{6}$/.test(s)) return s;
    
    // If only 6 chars provided
    if (/^[A-Z0-9]{6}$/.test(s)) return `CCI-${s}`;
    
    // Handle common QR variations with different separators
    const separatorMatch = s.match(/CCI[_\-\s]?([A-Z0-9]{6})/);
    if (separatorMatch) return `CCI-${separatorMatch[1]}`;
    
    return '';
  };

  const updateStatus = useCallback(async (uuid) => {
    if (!uuid) return;
    setUpdating(true);
    try {
      const res = await fetch('/api/admin/update-consumable', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uuid, type })
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'อัปเดตไม่สำเร็จ');

      if (data.alreadyReceived) {
        // Duplicate scan: show popup and warning tone
        playBeep(220, 0.15); // lower pitch
        setDuplicateInfo({
          uuid: data.participant?.uuid || uuid,
          first_name: data.participant?.first_name,
          last_name: data.participant?.last_name,
        });
        toast.error('ลูกค้ารายนี้ได้รับไปแล้ว', {
          position: 'top-right',
          style: toastStyle,
          duration: 1500,
        });
        
        // Auto-close duplicate popup after 3 seconds for faster processing
        setTimeout(() => {
          setDuplicateInfo(null);
        }, 3000);
        return;
      }

      // Success new record
      playBeep(880, 0.1); // higher pitch quick beep
      const successMessage = type === 'beverage' ? 
        `✅ บันทึกการรับเครื่องดื่มสำเร็จ (${uuid})` : 
        `✅ บันทึกการรับอาหารสำเร็จ (${uuid})`;
      
      toast.success(successMessage, {
        position: 'top-right', 
        style: toastStyle, 
        duration: 2000 
      });
      setLastUuid(uuid);
      
      // Auto-clear after 2 seconds for faster scanning
      setTimeout(() => {
        setLastUuid('');
      }, 2000);
    } catch (e) {
      console.error('Update consumable error:', e);
      const errorMessage = e.message || 'เกิดข้อผิดพลาดในการอัปเดตสถานะ';
      toast.error(`❌ ${errorMessage}`, { 
        position: 'top-right', 
        style: toastStyle,
        duration: 4000 
      });
    } finally {
      setUpdating(false);
    }
  }, [type]);

  const handleDecode = useCallback((text) => {
    console.log('QR decoded raw text:', text); // Debug logging
    const uuid = normalizeUuid(text);
    if (!uuid) {
      console.log('Failed to normalize UUID from:', text); // Debug logging
      toast.error(`รูปแบบ QR ไม่ถูกต้อง: ${text.substring(0, 20)}...`, { 
        position: 'top-right', 
        style: toastStyle,
        duration: 3000 
      });
      return;
    }
    console.log('Normalized UUID:', uuid); // Debug logging
    updateStatus(uuid);
  }, [updateStatus]);

  const [manualInput, setManualInput] = useState('');

  const handleManualSubmit = async (e) => {
    e.preventDefault();
    const uuid = normalizeUuid(manualInput);
    if (!uuid) {
      toast.error('กรุณากรอก UUID ให้ถูกต้อง (CCI-XXXXXX หรือ 6 ตัวท้าย)', { position: 'top-right', style: toastStyle });
      return;
    }
    await updateStatus(uuid);
    // Clear manual input after submission for faster processing
    setManualInput('');
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="order-2 lg:order-1">
        <QRScanner title={title} onDecode={handleDecode} />
        <form onSubmit={handleManualSubmit} className="mt-4 flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={manualInput}
            onChange={(e) => setManualInput(e.target.value)}
            className="flex-1 border rounded px-3 py-2 font-prompt text-sm"
            placeholder="กรอก CCI-XXXXXX หรือ 6 ตัวท้าย"
          />
          <button
            type="submit"
            disabled={updating}
            className="bg-earth-700 hover:bg-earth-800 text-white font-prompt px-4 py-2 rounded disabled:opacity-60 text-sm sm:text-base whitespace-nowrap"
          >
            {updating ? 'กำลังบันทึก...' : 'ยืนยัน'}
          </button>
        </form>
      </div>
      <div className="bg-white rounded-lg shadow p-4 order-1 lg:order-2">
        <h3 className="font-prompt font-bold text-earth-800 mb-3 text-sm sm:text-base">ผลการสแกนล่าสุด</h3>
        {lastUuid ? (
          <div className="font-prompt">
            <div className="text-xs sm:text-sm text-earth-700">UUID</div>
            <div className="text-lg sm:text-xl font-semibold break-all">{lastUuid}</div>
            <div className="mt-2 text-green-700 text-sm">
              {type === 'beverage' ? 'บันทึกการรับเครื่องดื่มแล้ว' : 'บันทึกการรับอาหารแล้ว'}
            </div>
          </div>
        ) : (
          <div className="text-xs sm:text-sm text-earth-700">ยังไม่มีข้อมูลการสแกน</div>
        )}
      </div>

      {/* Duplicate popup */}
      {duplicateInfo && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-4 sm:p-6 max-w-sm w-full mx-4 border border-red-200">
            <div className="flex items-start gap-3">
              <XCircleIcon className="h-6 w-6 text-red-600 mt-0.5" />
              <div>
                <h4 className="font-prompt font-bold text-red-700 mb-1 text-sm sm:text-base">สแกนซ้ำ</h4>
                <p className="font-prompt text-red-700 mb-2 text-sm">ลูกค้ารายนี้ได้รับไปแล้ว</p>
                <div className="font-prompt text-xs sm:text-sm text-earth-700">
                  <div className="break-all">UUID: <span className="font-semibold">{duplicateInfo.uuid}</span></div>
                  {(duplicateInfo.first_name || duplicateInfo.last_name) && (
                    <div>ชื่อ: {duplicateInfo.first_name || ''} {duplicateInfo.last_name || ''}</div>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setDuplicateInfo(null)}
                className="bg-red-600 hover:bg-red-700 text-white font-prompt px-3 sm:px-4 py-2 rounded text-sm"
              >
                ปิด
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Simple beep using Web Audio API
function playBeep(frequency = 880, duration = 0.1) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = 'sine';
    o.frequency.value = frequency;
    o.connect(g);
    g.connect(ctx.destination);
    g.gain.setValueAtTime(0.001, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.01);
    o.start();
    setTimeout(() => {
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.02);
      o.stop(ctx.currentTime + 0.03);
      setTimeout(() => ctx.close(), 50);
    }, Math.max(10, duration * 1000));
  } catch {}
}
