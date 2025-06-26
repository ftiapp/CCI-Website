'use client';

import { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

export default function ScheduleForm({ rooms, initialData, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    event_date: '',
    time_start: '',
    time_end: '',
    title_th: '',
    title_en: '',
    description_th: '',
    description_en: '',
    speaker_th: '',
    speaker_en: '',
    room_id: '',
    is_morning: 0
  });
  
  const [errors, setErrors] = useState({});
  
  // Initialize form with data if editing
  useEffect(() => {
    if (initialData) {
      // Format date to YYYY-MM-DD for input
      const formattedDate = initialData.event_date ? 
        new Date(initialData.event_date).toISOString().split('T')[0] : '';
      
      setFormData({
        event_date: formattedDate,
        time_start: initialData.time_start?.substring(0, 5) || '',
        time_end: initialData.time_end?.substring(0, 5) || '',
        title_th: initialData.title_th || '',
        title_en: initialData.title_en || '',
        description_th: initialData.description_th || '',
        description_en: initialData.description_en || '',
        speaker_th: initialData.speaker_th || '',
        speaker_en: initialData.speaker_en || '',
        room_id: initialData.room_id || '',
        is_morning: initialData.is_morning || 0
      });
    }
  }, [initialData]);
  
  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? 1 : 0) : value
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };
  
  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.event_date) newErrors.event_date = 'กรุณาระบุวันที่';
    if (!formData.time_start) newErrors.time_start = 'กรุณาระบุเวลาเริ่ม';
    if (!formData.time_end) newErrors.time_end = 'กรุณาระบุเวลาสิ้นสุด';
    if (!formData.title_th) newErrors.title_th = 'กรุณาระบุชื่อกิจกรรม (ภาษาไทย)';
    if (!formData.room_id) newErrors.room_id = 'กรุณาเลือกห้อง';
    
    // Check if end time is after start time
    if (formData.time_start && formData.time_end && formData.time_start >= formData.time_end) {
      newErrors.time_end = 'เวลาสิ้นสุดต้องมากกว่าเวลาเริ่ม';
    }
    
    // Show toast notification for errors
    if (Object.keys(newErrors).length > 0) {
      const errorMessages = Object.values(newErrors);
      toast.error(errorMessages[0], {
        position: 'top-right',
        style: {
          fontFamily: 'prompt',
          borderRadius: '10px',
          background: '#F56565',
          color: '#FFF',
        }
      });
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Convert room_id to number
      const dataToSubmit = {
        ...formData,
        room_id: parseInt(formData.room_id)
      };
      
      onSubmit(dataToSubmit);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 className="text-xl font-prompt font-bold text-deeplake-700">
            {initialData ? 'แก้ไขกิจกรรม' : 'เพิ่มกิจกรรมใหม่'}
          </h3>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 font-prompt mb-1">
                วันที่ <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="event_date"
                value={formData.event_date}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${errors.event_date ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm font-prompt focus:outline-none focus:ring-2 focus:ring-deeplake-500`}
              />
              
            </div>
            
            {/* Room */}
            <div>
              <label className="block text-sm font-medium text-gray-700 font-prompt mb-1">
                ห้อง <span className="text-red-500">*</span>
              </label>
              <select
                name="room_id"
                value={formData.room_id}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${errors.room_id ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm font-prompt focus:outline-none focus:ring-2 focus:ring-deeplake-500`}
              >
                <option value="">เลือกห้อง</option>
                {rooms.map(room => (
                  <option key={room.id} value={room.id}>
                    {room.name_th}
                  </option>
                ))}
              </select>
              
            </div>
            
            {/* Time Start */}
            <div>
              <label className="block text-sm font-medium text-gray-700 font-prompt mb-1">
                เวลาเริ่ม <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                name="time_start"
                value={formData.time_start}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${errors.time_start ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm font-prompt focus:outline-none focus:ring-2 focus:ring-deeplake-500`}
              />
              
            </div>
            
            {/* Time End */}
            <div>
              <label className="block text-sm font-medium text-gray-700 font-prompt mb-1">
                เวลาสิ้นสุด <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                name="time_end"
                value={formData.time_end}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${errors.time_end ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm font-prompt focus:outline-none focus:ring-2 focus:ring-deeplake-500`}
              />
              
            </div>
            
            {/* Title TH */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 font-prompt mb-1">
                ชื่อกิจกรรม (ภาษาไทย) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title_th"
                value={formData.title_th}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${errors.title_th ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm font-prompt focus:outline-none focus:ring-2 focus:ring-deeplake-500`}
              />
              
            </div>
            
            {/* Title EN */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 font-prompt mb-1">
                ชื่อกิจกรรม (ภาษาอังกฤษ)
              </label>
              <input
                type="text"
                name="title_en"
                value={formData.title_en}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm font-prompt focus:outline-none focus:ring-2 focus:ring-deeplake-500"
              />
            </div>
            
            {/* Speaker TH */}
            <div>
              <label className="block text-sm font-medium text-gray-700 font-prompt mb-1">
                วิทยากร (ภาษาไทย)
              </label>
              <input
                type="text"
                name="speaker_th"
                value={formData.speaker_th}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm font-prompt focus:outline-none focus:ring-2 focus:ring-deeplake-500"
              />
            </div>
            
            {/* Speaker EN */}
            <div>
              <label className="block text-sm font-medium text-gray-700 font-prompt mb-1">
                วิทยากร (ภาษาอังกฤษ)
              </label>
              <input
                type="text"
                name="speaker_en"
                value={formData.speaker_en}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm font-prompt focus:outline-none focus:ring-2 focus:ring-deeplake-500"
              />
            </div>
            
            {/* Description TH */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 font-prompt mb-1">
                รายละเอียด (ภาษาไทย)
              </label>
              <textarea
                name="description_th"
                value={formData.description_th}
                onChange={handleChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm font-prompt focus:outline-none focus:ring-2 focus:ring-deeplake-500"
              ></textarea>
            </div>
            
            {/* Description EN */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 font-prompt mb-1">
                รายละเอียด (ภาษาอังกฤษ)
              </label>
              <textarea
                name="description_en"
                value={formData.description_en}
                onChange={handleChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm font-prompt focus:outline-none focus:ring-2 focus:ring-deeplake-500"
              ></textarea>
            </div>
            
            {/* Is Morning */}
            <div className="md:col-span-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="is_morning"
                  name="is_morning"
                  checked={formData.is_morning === 1}
                  onChange={handleChange}
                  className="h-4 w-4 text-deeplake-600 focus:ring-deeplake-500 border-gray-300 rounded"
                />
                <label htmlFor="is_morning" className="ml-2 block text-sm text-gray-700 font-prompt">
                  กิจกรรมช่วงเช้า
                </label>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-prompt font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-deeplake-500"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-prompt font-medium text-white bg-deeplake-600 hover:bg-deeplake-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-deeplake-500"
            >
              {initialData ? 'บันทึกการแก้ไข' : 'เพิ่มกิจกรรม'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
