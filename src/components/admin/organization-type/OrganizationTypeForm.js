'use client';

import { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function OrganizationTypeForm({ initialData, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name_th: '',
    name_en: ''
  });
  
  const [errors, setErrors] = useState({});
  
  // Initialize form with data if editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        name_th: initialData.name_th || '',
        name_en: initialData.name_en || ''
      });
    }
  }, [initialData]);
  
  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };
  
  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name_th) newErrors.name_th = 'กรุณาระบุชื่อประเภทธุรกิจ (ภาษาไทย)';
    if (!formData.name_en) newErrors.name_en = 'กรุณาระบุชื่อประเภทธุรกิจ (ภาษาอังกฤษ)';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 className="text-xl font-prompt font-bold text-earth-800">
            {initialData ? 'แก้ไขประเภทธุรกิจ' : 'เพิ่มประเภทธุรกิจใหม่'}
          </h3>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-4">
            {/* Name TH */}
            <div>
              <label className="block text-sm font-medium text-gray-700 font-prompt mb-1">
                ชื่อประเภทธุรกิจ (ภาษาไทย) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name_th"
                value={formData.name_th}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${errors.name_th ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm font-prompt focus:outline-none focus:ring-2 focus:ring-earth-500`}
              />
              {errors.name_th && (
                <p className="mt-1 text-sm text-red-600 font-prompt">{errors.name_th}</p>
              )}
            </div>
            
            {/* Name EN */}
            <div>
              <label className="block text-sm font-medium text-gray-700 font-prompt mb-1">
                ชื่อประเภทธุรกิจ (ภาษาอังกฤษ) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name_en"
                value={formData.name_en}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${errors.name_en ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm font-prompt focus:outline-none focus:ring-2 focus:ring-earth-500`}
              />
              {errors.name_en && (
                <p className="mt-1 text-sm text-red-600 font-prompt">{errors.name_en}</p>
              )}
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-prompt font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-earth-500"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-prompt font-medium text-white bg-earth-600 hover:bg-earth-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-earth-500"
            >
              {initialData ? 'บันทึกการแก้ไข' : 'เพิ่มประเภทธุรกิจ'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
