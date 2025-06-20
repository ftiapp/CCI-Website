import React from 'react';

export default function PersonalInfoForm({ formData, handleChange }) {
  return (
    <div className="bg-gray-50 p-4 rounded-md">
      <h4 className="text-lg font-prompt font-medium mb-4">ข้อมูลส่วนตัว</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="first_name" className="block text-sm font-prompt mb-1">ชื่อ *</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className="w-full p-2 border rounded-md font-prompt"
            required
          />
        </div>
        
        <div>
          <label htmlFor="last_name" className="block text-sm font-prompt mb-1">นามสกุล *</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            className="w-full p-2 border rounded-md font-prompt"
            required
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-prompt mb-1">อีเมล *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-md font-prompt"
            required
          />
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-prompt mb-1">เบอร์โทรศัพท์ *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded-md font-prompt"
            required
          />
        </div>
      </div>
    </div>
  );
}
