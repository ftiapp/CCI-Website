import React from 'react';

export default function NotesAndNotificationForm({ sendNotification, setSendNotification }) {
  return (
    <>
      {/* ตัวเลือกการแจ้งเตือน */}
      <div className="bg-gray-50 p-4 rounded-md">
        <label className="flex items-center space-x-2 font-prompt">
          <input
            type="checkbox"
            checked={sendNotification}
            onChange={(e) => setSendNotification(e.target.checked)}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span>ส่งอีเมลแจ้งเตือนการเปลี่ยนแปลงข้อมูลไปยังผู้ลงทะเบียน</span>
        </label>
      </div>
    </>
  );
}
