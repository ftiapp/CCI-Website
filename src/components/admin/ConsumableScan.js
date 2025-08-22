'use client';

import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import QRScanner from './scanner/QRScanner';

// Props: { type: 'beverage' | 'food', title: string }
export default function ConsumableScan({ type, title }) {
  const [lastUuid, setLastUuid] = useState('');
  const [updating, setUpdating] = useState(false);

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
    // Extract code if URL-embedded, or if full UUID contains prefix
    const match = s.match(/CCI-[A-Z0-9]{6}/);
    if (match) return match[0];
    // If only 6 chars provided
    if (/^[A-Z0-9]{6}$/.test(s)) return `CCI-${s}`;
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

      toast.success(
        type === 'beverage' ? 'บันทึกการรับเครื่องดื่มสำเร็จ' : 'บันทึกการรับอาหารสำเร็จ',
        { position: 'top-right', style: toastStyle }
      );
      setLastUuid(uuid);
    } catch (e) {
      console.error('Update consumable error:', e);
      toast.error('เกิดข้อผิดพลาดในการอัปเดตสถานะ', { position: 'top-right', style: toastStyle });
    } finally {
      setUpdating(false);
    }
  }, [type]);

  const handleDecode = useCallback((text) => {
    const uuid = normalizeUuid(text);
    if (!uuid) {
      toast.error('รูปแบบ QR ไม่ถูกต้อง', { position: 'top-right', style: toastStyle });
      return;
    }
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
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div>
        <QRScanner title={title} onDecode={handleDecode} />
        <form onSubmit={handleManualSubmit} className="mt-4 flex gap-2">
          <input
            type="text"
            value={manualInput}
            onChange={(e) => setManualInput(e.target.value)}
            className="flex-1 border rounded px-3 py-2 font-prompt"
            placeholder="กรอก CCI-XXXXXX หรือ 6 ตัวท้าย"
          />
          <button
            type="submit"
            disabled={updating}
            className="bg-earth-700 hover:bg-earth-800 text-white font-prompt px-4 py-2 rounded disabled:opacity-60"
          >
            ยืนยัน
          </button>
        </form>
      </div>
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-prompt font-bold text-earth-800 mb-3">ผลการสแกนล่าสุด</h3>
        {lastUuid ? (
          <div className="font-prompt">
            <div className="text-sm text-earth-700">UUID</div>
            <div className="text-xl font-semibold">{lastUuid}</div>
            <div className="mt-2 text-green-700">
              {type === 'beverage' ? 'บันทึกการรับเครื่องดื่มแล้ว' : 'บันทึกการรับอาหารแล้ว'}
            </div>
          </div>
        ) : (
          <div className="text-sm text-earth-700">ยังไม่มีข้อมูลการสแกน</div>
        )}
      </div>
    </div>
  );
}
