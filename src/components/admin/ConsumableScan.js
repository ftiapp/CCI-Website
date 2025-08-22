'use client';

import { useCallback, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import QRScanner from './scanner/QRScanner';

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

      if (data.alreadyReceived) {
        // Duplicate scan: show popup and warning tone
        playBeep(220, 0.15); // lower pitch
        setDuplicateInfo({
          uuid: data.participant?.uuid || uuid,
          first_name: data.participant?.first_name,
          last_name: data.participant?.last_name,
        });
        toast((t) => (
          'ผู้เข้าร่วมรายนี้ได้รับเรียบร้อยแล้ว'
        ), { position: 'top-right', style: toastStyle, icon: 'ℹ️' });
        return;
      }

      // Success new record
      playBeep(880, 0.1); // higher pitch quick beep
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

      {/* Duplicate popup */}
      {duplicateInfo && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full">
            <h4 className="font-prompt font-bold text-earth-900 mb-2">สแกนซ้ำ</h4>
            <p className="font-prompt text-earth-800 mb-1">ผู้เข้าร่วมรายนี้ได้รับเรียบร้อยแล้ว</p>
            <div className="font-prompt text-sm text-earth-700">
              <div>UUID: <span className="font-semibold">{duplicateInfo.uuid}</span></div>
              {(duplicateInfo.first_name || duplicateInfo.last_name) && (
                <div>ชื่อ: {duplicateInfo.first_name || ''} {duplicateInfo.last_name || ''}</div>
              )}
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setDuplicateInfo(null)}
                className="bg-earth-700 hover:bg-earth-800 text-white font-prompt px-4 py-2 rounded"
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
