import React from 'react';

export default function NotesAndNotificationForm({ formData, handleChange, sendNotification, setSendNotification }) {
  return (
    <>
      {/* หมายเหตุ */}
      <div className="bg-gray-50 p-4 rounded-md">
        <h4 className="text-lg font-prompt font-medium mb-4">หมายเหตุ</h4>
        <div>
          <label htmlFor="admin_notes" className="block text-sm font-prompt mb-1">บันทึกเพิ่มเติม</label>
          <textarea
            id="admin_notes"
            name="admin_notes"
            value={formData.admin_notes}
            onChange={handleChange}
            className="w-full p-2 border rounded-md font-prompt h-24"
          ></textarea>
        </div>
      </div>
      
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
