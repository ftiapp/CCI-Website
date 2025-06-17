'use client';

import { getTranslations } from '@/i18n';
import RadioGroup from '@/components/ui/RadioGroup';
import Select from '@/components/ui/Select';
import { CalendarIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import ScheduleClient from '@/components/schedule/ScheduleClient';

export default function AttendanceInfoStep({ 
  locale, 
  formData, 
  errors, 
  handleChange,
  handleRadioChange,
  seminarRooms
}) {
  const [showSchedule, setShowSchedule] = useState(false);
  // Make sure locale is properly awaited before using it with getTranslations
  const t = getTranslations(locale || 'th');
  
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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-prompt font-semibold text-earth-800 flex items-center">
          <CalendarIcon className="w-5 h-5 mr-2 text-beige-600" />
          {t.registration.attendanceInfo}
        </h2>
        
        <button
          type="button"
          onClick={() => setShowSchedule(true)}
          className="flex items-center px-4 py-2 bg-beige-100 hover:bg-beige-200 text-earth-800 rounded-md transition-colors"
        >
          <DocumentTextIcon className="w-4 h-4 mr-2" />
          {locale === 'th' ? 'ดูกำหนดการ' : 'View Schedule'}
        </button>
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
      
      {formData.attendanceType === 'afternoon' && (
        <Select
          label={t.registration.selectRoom}
          name="selectedRoomId"
          value={formData.selectedRoomId}
          onChange={handleChange}
          options={roomOptions}
          placeholder={locale === 'th' ? 'เลือกห้องสัมมนาช่วงบ่าย' : 'Select Afternoon Seminar Room'}
          required
          error={errors.selectedRoomId}
        />
      )}
      
      {/* Schedule Modal */}
      {showSchedule && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6 border-b border-earth-200">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-prompt font-semibold text-earth-800">
                  {locale === 'th' ? 'กำหนดการงานสัมมนา' : 'Seminar Schedule'}
                </h3>
                <button
                  onClick={() => setShowSchedule(false)}
                  className="text-earth-500 hover:text-earth-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {/* แสดงวันที่จัดงาน */}
              <div className="mb-6 text-center">
                <h3 className="text-lg font-prompt font-semibold text-earth-800">
                  {seminarRooms.length > 0 && seminarRooms[0].event_date && (
                    locale === 'th' ? 
                      `วันที่ ${new Date(seminarRooms[0].event_date).toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}` : 
                      `${new Date(seminarRooms[0].event_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`
                  )}
                </h3>
              </div>
              
              {/* ภาคเช้า */}
              <div className="mb-6">
                <h4 className="font-prompt font-medium text-lg text-earth-800 mb-2">
                  {locale === 'th' ? 'ภาคเช้า' : 'Morning Session'}
                </h4>
                <div className="bg-beige-50 p-4 rounded-md border border-beige-200">
                  <ul className="space-y-3">
                    {seminarRooms
                      .filter(item => item.is_morning === 1)
                      .map(item => {
                        const timeStart = new Date(`2000-01-01T${item.start_time}`).toLocaleTimeString(locale === 'th' ? 'th-TH' : 'en-US', { hour: '2-digit', minute: '2-digit' });
                        const timeEnd = new Date(`2000-01-01T${item.end_time}`).toLocaleTimeString(locale === 'th' ? 'th-TH' : 'en-US', { hour: '2-digit', minute: '2-digit' });
                        return (
                          <li key={item.id} className="flex">
                            <span className="text-beige-700 font-medium w-24">{timeStart} - {timeEnd}</span>
                            <div className="flex-1">
                              <span className="text-earth-800">{locale === 'th' ? item.title_th : item.title_en}</span>
                              {item.speaker_th && (
                                <div className="text-sm text-earth-600 mt-1">
                                  {locale === 'th' ? `วิทยากร: ${item.speaker_th}` : `Speaker: ${item.speaker_en}`}
                                </div>
                              )}
                            </div>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </div>
              
              {/* ภาคบ่าย */}
              <div>
                <h4 className="font-prompt font-medium text-lg text-earth-800 mb-2">
                  {locale === 'th' ? 'ภาคบ่าย' : 'Afternoon Session'}
                </h4>
                <div className="bg-beige-50 p-4 rounded-md border border-beige-200">
                  <ul className="space-y-3">
                    {seminarRooms
                      .filter(item => item.is_morning === 0)
                      .map(item => {
                        const timeStart = new Date(`2000-01-01T${item.start_time}`).toLocaleTimeString(locale === 'th' ? 'th-TH' : 'en-US', { hour: '2-digit', minute: '2-digit' });
                        const timeEnd = new Date(`2000-01-01T${item.end_time}`).toLocaleTimeString(locale === 'th' ? 'th-TH' : 'en-US', { hour: '2-digit', minute: '2-digit' });
                        return (
                          <li key={item.id} className="flex">
                            <span className="text-beige-700 font-medium w-24">{timeStart} - {timeEnd}</span>
                            <div className="flex-1">
                              <span className="text-earth-800">{locale === 'th' ? item.title_th : item.title_en}</span>
                              {item.room_name_th && (
                                <div className="text-sm text-beige-700 mt-1">
                                  {locale === 'th' ? `ห้อง: ${item.room_name_th}` : `Room: ${item.room_name_en}`}
                                </div>
                              )}
                              {item.speaker_th && (
                                <div className="text-sm text-earth-600 mt-1">
                                  {locale === 'th' ? `วิทยากร: ${item.speaker_th}` : `Speaker: ${item.speaker_en}`}
                                </div>
                              )}
                            </div>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-earth-200 bg-earth-50 flex justify-end">
              <button
                onClick={() => setShowSchedule(false)}
                className="px-4 py-2 bg-beige-600 hover:bg-beige-700 text-white rounded-md transition-colors"
              >
                {locale === 'th' ? 'ปิด' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
