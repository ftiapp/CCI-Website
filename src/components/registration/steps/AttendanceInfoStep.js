'use client';

import { getTranslations } from '@/i18n';
import RadioGroup from '@/components/ui/RadioGroup';
import Select from '@/components/ui/Select';
import { 
  CalendarIcon, 
  DocumentTextIcon, 
  XMarkIcon,
  ClockIcon,
  MapPinIcon,
  SparklesIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import ScheduleClient from '@/components/schedule/ScheduleClient';
import { motion, AnimatePresence } from 'framer-motion';

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

  // Fetch schedule data when component mounts
  useEffect(() => {
    fetchScheduleData();
  }, []);
  
  // Format seminar rooms for select options with time information
  const roomOptions = seminarRooms
    .filter(room => room.id > 1) // Filter out main conference room
    .map(room => {
      // Find schedule for this room
      const roomSchedule = scheduleData.filter(item => 
        item.room_id === room.id && !item.is_morning
      );
      
      // Format time if schedule exists for this room
      let timeInfo = '';
      if (roomSchedule.length > 0) {
        const firstSession = roomSchedule[0];
        // Format time as HH:MM - HH:MM
        const startTime = firstSession.time_start.substring(0, 5);
        const endTime = firstSession.time_end.substring(0, 5);
        timeInfo = ` (${startTime} - ${endTime})`;
      }
      
      return {
        value: room.id.toString(),
        label: (locale === 'th' ? room.name_th : room.name_en) + timeInfo
      };
    });
  
  // Attendance type options
  const attendanceOptions = [
    { 
      value: 'morning', 
      label: t.registration.attendanceMorning,
      icon: '🌅',
      description: locale === 'th' ? 'เข้าร่วมเฉพาะช่วงเช้า' : 'Morning session only'
    },
    { 
      value: 'afternoon', 
      label: t.registration.attendanceAfternoon,
      icon: '🌇', 
      description: locale === 'th' ? 'เข้าร่วมเฉพาะช่วงบ่าย' : 'Afternoon session only'
    },
    { 
      value: 'full_day', 
      label: t.registration.attendanceFullDay,
      icon: '🌟',
      description: locale === 'th' ? 'เข้าร่วมทั้งวัน (แนะนำ)' : 'Full day (Recommended)'
    }
  ];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-50/30 to-blue-50/30 rounded-3xl pointer-events-none"></div>
      <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-teal-300/20 to-blue-300/20 rounded-full blur-2xl"></div>
      
      <div className="relative bg-white/70 backdrop-blur-md rounded-3xl shadow-lg border border-white/50 p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-prompt font-bold text-slate-800 mb-2 flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-blue-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
              <CalendarIcon className="w-5 h-5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
              {t.registration.attendanceInfo}
            </span>
          </h2>
          <p className="text-slate-600 font-prompt ml-14">
            {locale === 'th' 
              ? 'เลือกช่วงเวลาที่ท่านต้องการเข้าร่วมงาน' 
              : 'Select the time period you want to attend'}
          </p>
        </motion.div>
        
        {/* Attendance Type Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <label className="block mb-4 font-prompt font-semibold text-slate-700 text-sm">
            {t.registration.attendanceType} <span className="text-red-500 ml-1">*</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {attendanceOptions.map((option, index) => (
              <motion.label
                key={option.value}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                  formData.attendanceType === option.value
                    ? 'border-teal-400 bg-gradient-to-br from-teal-50 to-blue-50 shadow-lg'
                    : 'border-slate-200 bg-white/60 hover:border-teal-300 hover:bg-gradient-to-br hover:from-teal-50/50 hover:to-blue-50/50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <input
                  type="radio"
                  name="attendanceType"
                  value={option.value}
                  checked={formData.attendanceType === option.value}
                  onChange={(e) => handleRadioChange('attendanceType', e.target.value)}
                  className="sr-only"
                />
                
                {/* Selection indicator */}
                <div className={`absolute top-4 right-4 w-6 h-6 rounded-full border-2 transition-all duration-300 ${
                  formData.attendanceType === option.value
                    ? 'border-teal-500 bg-teal-500 shadow-md'
                    : 'border-slate-300'
                }`}>
                  {formData.attendanceType === option.value && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    />
                  )}
                </div>
                
                {/* Content */}
                <div className="text-center">
                  <div className="text-3xl mb-3">{option.icon}</div>
                  <h3 className="font-prompt font-bold text-slate-800 mb-2">
                    {option.label}
                  </h3>
                  <p className="text-sm text-slate-600 font-prompt">
                    {option.description}
                  </p>
                </div>
              </motion.label>
            ))}
          </div>
          {errors.attendanceType && (
            <p className="mt-2 text-sm text-red-600 font-prompt">{errors.attendanceType}</p>
          )}
        </motion.div>
        
        {/* Room Selection */}
        <AnimatePresence>
          {(formData.attendanceType === 'afternoon' || formData.attendanceType === 'full_day') && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              <div className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-200">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
                    <MapPinIcon className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="font-prompt font-semibold text-slate-800">
                    {t.registration.selectRoom}
                  </h3>
                </div>
                
                <select
                  name="selectedRoomId"
                  value={formData.selectedRoomId}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-prompt transition-all duration-300"
                  required
                >
                  <option value="">
                    {locale === 'th' ? 
                      (formData.attendanceType === 'full_day' ? 'เลือกห้องสัมมนา' : 'เลือกห้องสัมมนาช่วงบ่าย') : 
                      (formData.attendanceType === 'full_day' ? 'Select Seminar Room' : 'Select Afternoon Seminar Room')}
                  </option>
                  {roomOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                
                {errors.selectedRoomId && (
                  <p className="mt-2 text-sm text-red-600 font-prompt">{errors.selectedRoomId}</p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Schedule Modal */}
        <AnimatePresence>
          {isScheduleModalOpen && (
            <motion.div 
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Backdrop */}
              <motion.div 
                className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsScheduleModalOpen(false)}
              />
              
              {/* Modal Content */}
              <motion.div 
                className="relative bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50 w-full max-w-6xl max-h-[90vh] overflow-hidden"
                initial={{ scale: 0.8, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 20 }}
                transition={{ type: "spring", duration: 0.5 }}
              >
                {/* Header */}
                <div className="sticky top-0 z-10 flex justify-between items-center p-6 border-b border-slate-200/50 bg-white/90 backdrop-blur-sm">
                  <h3 className="text-2xl font-prompt font-bold text-slate-800 flex items-center">
                    <CalendarIcon className="w-6 h-6 mr-3 text-teal-600" />
                    {locale === 'th' ? 'กำหนดการ' : 'Schedule'}
                  </h3>
                  <button 
                    onClick={() => setIsScheduleModalOpen(false)}
                    className="w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center transition-colors duration-300"
                  >
                    <XMarkIcon className="w-5 h-5 text-slate-600" />
                  </button>
                </div>
                
                {/* Content */}
                <div className="overflow-auto max-h-[calc(90vh-80px)]">
                  {isLoading ? (
                    <div className="flex justify-center items-center py-20">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full"
                      />
                    </div>
                  ) : scheduleData.length > 0 ? (
                    <ScheduleModalContent scheduleData={scheduleData} locale={locale} />
                  ) : (
                    <div className="text-center py-20">
                      <CalendarIcon className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                      <p className="text-slate-500 font-prompt">
                        {locale === 'th' ? 'ไม่พบข้อมูลกำหนดการ' : 'No schedule data found'}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Schedule section displayed below the form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 pt-8 border-t border-slate-200/50"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-prompt font-bold text-slate-800 flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                <CalendarIcon className="w-5 h-5 text-white" />
              </div>
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {locale === 'th' ? 'กำหนดการ' : 'Schedule'}
              </span>
            </h3>
            
            <motion.button
  onClick={() => {
    const scheduleUrl = `/${locale}/schedule`;
    window.open(scheduleUrl, '_blank', 'noopener,noreferrer');
  }}
  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-xl font-prompt font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
>
  <EyeIcon className="w-4 h-4" />
  <span>{locale === 'th' ? 'ดูแบบเต็มจอ' : 'View Fullscreen'}</span>
</motion.button>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-12 bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 border-3 border-teal-500 border-t-transparent rounded-full"
              />
              <span className="ml-3 text-slate-600 font-prompt">
                {locale === 'th' ? 'กำลังโหลด...' : 'Loading...'}
              </span>
            </div>
          ) : scheduleData.length > 0 ? (
            <ScheduleModalContent scheduleData={scheduleData} locale={locale} />
          ) : (
            <motion.button
              onClick={fetchScheduleData}
              className="w-full py-8 border-2 border-dashed border-teal-300 rounded-2xl text-teal-600 hover:bg-teal-50 transition-all duration-300 bg-gradient-to-r from-teal-50/50 to-blue-50/50"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <CalendarIcon className="w-8 h-8 mx-auto mb-2 text-teal-500" />
              <span className="font-prompt font-medium">
                {locale === 'th' ? 'คลิกเพื่อดูกำหนดการ' : 'Click to view schedule'}
              </span>
            </motion.button>
          )}
        </motion.div>
        
        {/* Floating decorative elements */}
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-teal-400/50 rounded-full blur-sm"></div>
        <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-blue-400/50 rounded-full blur-sm"></div>
      </div>
    </motion.div>
  );
}