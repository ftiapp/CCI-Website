'use client';

import { getTranslations } from '@/i18n';
import RadioGroup from '@/components/ui/RadioGroup';
import Select from '@/components/ui/Select';
import { CalendarIcon, DocumentTextIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import ScheduleClient from '@/components/schedule/ScheduleClient';

// Component to render schedule content inside modal or below the form
function ScheduleModalContent({ scheduleData, locale }) {
  // Extract event date (use the first item's date)
  const eventDate = scheduleData.length > 0 ? scheduleData[0].event_date : null;
  
  // Group schedule by morning/afternoon
  const morningSchedule = scheduleData.filter(item => item.is_morning);
  const afternoonSchedule = scheduleData.filter(item => !item.is_morning);
  
  // Group afternoon schedule by room
  const afternoonByRoom = {};
  afternoonSchedule.forEach(item => {
    if (!afternoonByRoom[item.room_id]) {
      afternoonByRoom[item.room_id] = [];
    }
    afternoonByRoom[item.room_id].push(item);
  });
  
  // Prepare translations for client component
  const translations = {
    title: locale === 'th' ? 'กำหนดการ' : 'Schedule',
    morning: locale === 'th' ? 'ช่วงเช้า' : 'Morning',
    afternoon: locale === 'th' ? 'ช่วงบ่าย' : 'Afternoon',
    time: locale === 'th' ? 'เวลา' : 'Time',
    topic: locale === 'th' ? 'หัวข้อ' : 'Topic',
    speaker: locale === 'th' ? 'วิทยากร' : 'Speaker',
    room: locale === 'th' ? 'ห้อง' : 'Room',
    description: locale === 'th' ? 'รายละเอียด' : 'Description'
  };

  return (
    <ScheduleClient
      morningSchedule={morningSchedule}
      afternoonByRoom={afternoonByRoom}
      locale={locale}
      translations={translations}
      eventDate={eventDate}
    />
  );
}

export default function AttendanceInfoStep({ 
  locale, 
  formData, 
  errors, 
  handleChange,
  handleRadioChange,
  seminarRooms
}) {
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [scheduleData, setScheduleData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Make sure locale is properly awaited before using it with getTranslations
  const t = getTranslations(locale || 'th');
  
  // Fetch schedule data when modal is opened
  const fetchScheduleData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/schedule');
      const result = await response.json();
      if (result.success) {
        setScheduleData(result.data);
      } else {
        throw new Error(result.error || 'Failed to fetch schedule data');
      }
    } catch (error) {
      console.error('Error fetching schedule data:', error);
      setScheduleData([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Format seminar rooms for select options
  const roomOptions = seminarRooms
    .filter(room => room.id > 1) // Filter out main conference room
    .map(room => ({
      value: room.id.toString(),
      label: locale === 'th' ? room.name_th : room.name_en
    }));
  
  // Attendance type options
  const attendanceOptions = [
    { 
      value: 'morning', 
      label: t.registration.attendanceMorning 
    },
    { 
      value: 'afternoon', 
      label: t.registration.attendanceAfternoon 
    },
    { 
      value: 'full_day', 
      label: t.registration.attendanceFullDay 
    }
  ];
  
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-prompt font-semibold text-earth-800 flex items-center">
          <CalendarIcon className="w-5 h-5 mr-2 text-beige-600" />
          {t.registration.attendanceInfo}
        </h2>
      </div>
      
      <RadioGroup
        label={t.registration.attendanceType}
        name="attendanceType"
        value={formData.attendanceType}
        onChange={(e) => handleRadioChange('attendanceType', e.target.value)}
        options={attendanceOptions}
        required
        error={errors.attendanceType}
        className="mb-6"
      />
      
      {(formData.attendanceType === 'afternoon' || formData.attendanceType === 'full_day') && (
        <Select
          label={t.registration.selectRoom}
          name="selectedRoomId"
          value={formData.selectedRoomId}
          onChange={handleChange}
          options={roomOptions}
          placeholder={locale === 'th' ? 
            (formData.attendanceType === 'full_day' ? 'เลือกห้องสัมมนา' : 'เลือกห้องสัมมนาช่วงบ่าย') : 
            (formData.attendanceType === 'full_day' ? 'Select Seminar Room' : 'Select Afternoon Seminar Room')}
          required
          error={errors.selectedRoomId}
        />
      )}
      
      {/* Schedule Modal */}
      {isScheduleModalOpen && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-auto">
            <div className="sticky top-0 z-10 flex justify-between items-center p-4 border-b bg-white">
              <h3 className="text-xl font-prompt font-semibold text-earth-800">
                {locale === 'th' ? 'กำหนดการ' : 'Schedule'}
              </h3>
              <button 
                onClick={() => setIsScheduleModalOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <XMarkIcon className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="p-4">
              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-beige-600"></div>
                </div>
              ) : scheduleData.length > 0 ? (
                <ScheduleModalContent scheduleData={scheduleData} locale={locale} />
              ) : (
                <p className="text-center py-8 text-gray-500">
                  {locale === 'th' ? 'ไม่พบข้อมูลกำหนดการ' : 'No schedule data found'}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Schedule section displayed below the form */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <h3 className="text-xl font-prompt font-semibold text-earth-800 mb-6 flex items-center">
          <CalendarIcon className="w-5 h-5 mr-2 text-beige-600" />
          {locale === 'th' ? 'กำหนดการ' : 'Schedule'}
        </h3>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-beige-600"></div>
          </div>
        ) : scheduleData.length > 0 ? (
          <ScheduleModalContent scheduleData={scheduleData} locale={locale} />
        ) : (
          <button
            onClick={fetchScheduleData}
            className="w-full py-4 border-2 border-dashed border-beige-300 rounded-lg text-beige-600 hover:bg-beige-50 transition-colors"
          >
            {locale === 'th' ? 'คลิกเพื่อดูกำหนดการ' : 'Click to view schedule'}
          </button>
        )}
      </div>
    </div>
  );
}