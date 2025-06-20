import React from 'react';

export default function AttendanceInfoForm({ formData, handleChange, seminarRooms }) {
  return (
    <div className="bg-gray-50 p-4 rounded-md">
      <h4 className="text-lg font-prompt font-medium mb-4">ข้อมูลการเข้าร่วม</h4>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label htmlFor="attendance_type" className="block text-sm font-prompt mb-1">รูปแบบการเข้าร่วม *</label>
          <select
            id="attendance_type"
            name="attendance_type"
            value={formData.attendance_type}
            onChange={handleChange}
            className="w-full p-2 border rounded-md font-prompt"
            required
          >
            <option value="">เลือกรูปแบบการเข้าร่วม</option>
            <option value="morning">ช่วงเช้า</option>
            <option value="afternoon">ช่วงบ่าย</option>
            <option value="full_day">เต็มวัน</option>
          </select>
        </div>

        {(formData.attendance_type === 'afternoon' || formData.attendance_type === 'full_day') && (
          <div>
            <label htmlFor="selected_room_id" className="block text-sm font-prompt mb-1">ห้องสัมมนา</label>
            <select
              id="selected_room_id"
              name="selected_room_id"
              value={formData.selected_room_id}
              onChange={handleChange}
              className="w-full p-2 border rounded-md font-prompt"
              required
            >
              <option value="">เลือกห้องสัมมนา</option>
              {seminarRooms.map(room => (
                <option key={room.id} value={room.id}>
                  {room.name_th}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
}
