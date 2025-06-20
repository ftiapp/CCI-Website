import React from 'react';

export default function LocationInfoForm({ formData, handleChange, provinces, bangkokDistricts }) {
  return (
    <div className="bg-gray-50 p-4 rounded-md">
      <h4 className="text-lg font-prompt font-medium mb-4">ข้อมูลที่อยู่</h4>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label htmlFor="location_type" className="block text-sm font-prompt mb-1">พื้นที่ *</label>
          <select
            id="location_type"
            name="location_type"
            value={formData.location_type}
            onChange={handleChange}
            className="w-full p-2 border rounded-md font-prompt"
            required
          >
            <option value="">เลือกพื้นที่</option>
            <option value="bangkok">กรุงเทพมหานคร</option>
            <option value="province">ต่างจังหวัด</option>
          </select>
        </div>

        {formData.location_type === 'bangkok' && (
          <div>
            <label htmlFor="bangkok_district_id" className="block text-sm font-prompt mb-1">เขต</label>
            <select
              id="bangkok_district_id"
              name="bangkok_district_id"
              value={formData.bangkok_district_id}
              onChange={handleChange}
              className="w-full p-2 border rounded-md font-prompt"
              required
            >
              <option value="">เลือกเขต</option>
              {bangkokDistricts.map(district => (
                <option key={district.id} value={district.id}>
                  {district.name_th}
                </option>
              ))}
            </select>
          </div>
        )}

        {formData.location_type === 'province' && (
          <div>
            <label htmlFor="province_id" className="block text-sm font-prompt mb-1">จังหวัด</label>
            <select
              id="province_id"
              name="province_id"
              value={formData.province_id}
              onChange={handleChange}
              className="w-full p-2 border rounded-md font-prompt"
              required
            >
              <option value="">เลือกจังหวัด</option>
              {provinces.map(province => (
                <option key={province.id} value={province.id}>
                  {province.name_th}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
}
