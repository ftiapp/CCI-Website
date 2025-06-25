import React from 'react';

export default function OrganizationInfoForm({ formData, handleChange, organizationTypes, industryTypes }) {
  return (
    <div className="bg-gray-50 p-4 rounded-md">
      <h4 className="text-lg font-prompt font-medium mb-4">ข้อมูลองค์กร</h4>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label htmlFor="organization_name" className="block text-sm font-prompt mb-1">ชื่อองค์กร *</label>
          <input
            type="text"
            id="organization_name"
            name="organization_name"
            value={formData.organization_name}
            onChange={handleChange}
            className="w-full p-2 border rounded-md font-prompt"
            required
          />
        </div>
        
        <div>
          <label htmlFor="organization_type_id" className="block text-sm font-prompt mb-1">ประเภทองค์กร *</label>
          <select
            id="organization_type_id"
            name="organization_type_id"
            value={formData.organization_type_id}
            onChange={handleChange}
            className="w-full p-2 border rounded-md font-prompt"
            required
          >
            <option value="">เลือกประเภทองค์กร</option>
            {organizationTypes.map(type => (
              <option key={type.id} value={type.id}>
                {type.name_th}
              </option>
            ))}
            <option value="99">อื่นๆ</option>
          </select>
        </div>
        
        {(formData.organization_type_id === 99 || formData.organization_type_id === '99') && (
          <div>
            <label htmlFor="organization_type_other" className="block text-sm font-prompt mb-1">ระบุประเภทองค์กรอื่นๆ *</label>
            <input
              type="text"
              id="organization_type_other"
              name="organization_type_other"
              value={formData.organization_type_other || ''}
              onChange={handleChange}
              className="w-full p-2 border rounded-md font-prompt"
              required
            />
          </div>
        )}
        
        <div>
          <label htmlFor="industry_type_id" className="block text-sm font-prompt mb-1">ประเภทอุตสาหกรรม *</label>
          <select
            id="industry_type_id"
            name="industry_type_id"
            value={formData.industry_type_id || ''}
            onChange={handleChange}
            className="w-full p-2 border rounded-md font-prompt"
            required
          >
            <option value="">เลือกประเภทอุตสาหกรรม</option>
            {Array.isArray(industryTypes) && industryTypes.map(type => (
              <option key={type.id} value={type.id}>
                {type.name_th}
              </option>
            ))}
            <option value="99">อื่นๆ</option>
          </select>
        </div>
        
        {(formData.industry_type_id === 99 || formData.industry_type_id === '99') && (
          <div>
            <label htmlFor="industry_type_other" className="block text-sm font-prompt mb-1">ระบุประเภทอุตสาหกรรมอื่นๆ *</label>
            <input
              type="text"
              id="industry_type_other"
              name="industry_type_other"
              value={formData.industry_type_other || ''}
              onChange={handleChange}
              className="w-full p-2 border rounded-md font-prompt"
              required
            />
          </div>
        )}
      </div>
    </div>
  );
}
