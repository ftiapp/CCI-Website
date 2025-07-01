'use client';

import { useState, useEffect } from 'react';
import { ClockIcon, MapPinIcon, UserIcon, CalendarDaysIcon, SparklesIcon, PresentationChartBarIcon } from '@heroicons/react/24/outline';
import ScrollReveal from '@/components/motion/ScrollReveal';
import StaggerContainer from '@/components/motion/StaggerContainer';
import { StaggerItem } from '@/components/motion/StaggerContainer';
import { formatTime } from '@/lib/utils';

// Helper function to format time - เผื่อว่า formatTime ใน utils ไม่ทำงาน
const formatTimeDisplay = (timeString) => {
  if (!timeString) return '--:--';
  
  // ถ้าได้ค่าเป็น time format จาก database (HH:MM:SS หรือ HH:MM)
  if (typeof timeString === 'string') {
    // Handle case where timeString might be in ISO format or other date string format
    if (timeString.includes('T') || timeString.includes('Z')) {
      const date = new Date(timeString);
      if (!isNaN(date.getTime())) {
        return date.toLocaleTimeString('th-TH', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false 
        });
      }
    }
    
    // Handle standard time format (HH:MM:SS or HH:MM)
    const timeParts = timeString.split(':');
    if (timeParts.length >= 2) {
      const hours = timeParts[0].padStart(2, '0');
      const minutes = timeParts[1].padStart(2, '0');
      return `${hours}:${minutes}`;
    }
  }
  
  // ถ้าเป็น Date object
  if (timeString instanceof Date) {
    return timeString.toLocaleTimeString('th-TH', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  }
  
  // ถ้าเป็น timestamp
  if (typeof timeString === 'number') {
    const date = new Date(timeString);
    return date.toLocaleTimeString('th-TH', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  }
  
  // Log the problematic time format for debugging
  console.log('Unhandled time format:', timeString, typeof timeString);
  
  // Last resort - try to convert to string and return
  return String(timeString || '--:--');
};
import { motion } from 'framer-motion';

// Define CSS animation for fadeIn
const fadeInAnimation = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes slideInLeft {
    from { opacity: 0; transform: translateX(-20px); }
    to { opacity: 1; transform: translateX(0); }
  }
  
  @keyframes slideInRight {
    from { opacity: 0; transform: translateX(20px); }
    to { opacity: 1; transform: translateX(0); }
  }
`;

export default function ScheduleClient({ 
  morningSchedule, 
  afternoonByRoom, 
  locale, 
  translations,
  eventDate
}) {
  // Add style element for animations
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = fadeInAnimation;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  // Helper function to format date correctly for Thai
  const formatEventDate = (date) => {
    const dateObj = new Date(date);
    if (locale === 'th') {
      const thaiMonths = [
        'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
        'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
      ];
      const day = dateObj.getDate();
      const month = thaiMonths[dateObj.getMonth()];
      // Use the actual year (2025) instead of converting to Buddhist Era
      const year = dateObj.getFullYear();
      return `วันที่ ${day} ${month} ${year}`;
    } else {
      return dateObj.toLocaleDateString('en-US', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      });
    }
  };
  
  return (
    <div className="relative bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/30 py-16 font-prompt overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-100/20 to-teal-100/20"></div>
      <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-emerald-300/20 to-teal-300/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-br from-blue-300/20 to-emerald-300/20 rounded-full blur-3xl"></div>
      
      <div className="relative container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal direction="up" distance={20} duration={0.4}>
            <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 mb-12 overflow-hidden">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20"></div>
                <div className="relative px-8 py-6 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <CalendarDaysIcon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h1 className="text-3xl font-prompt font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                        {translations.title}
                      </h1>
                      {eventDate && (
                        <p className="text-lg font-prompt text-slate-600 mt-1 flex items-center">
                          <SparklesIcon className="w-4 h-4 mr-2 text-emerald-500" />
                          {formatEventDate(eventDate)}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="w-24 h-24 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center border border-emerald-200/50">
                      <PresentationChartBarIcon className="w-12 h-12 text-emerald-600" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500"></div>
            </div>
          </ScrollReveal>
          
          {/* Morning Schedule */}
          <div className="mb-16">
            <ScrollReveal direction="up" distance={15} duration={0.3} delay={0.1}>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-prompt font-bold text-slate-800 flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg mr-4">
                    <ClockIcon className="w-6 h-6 text-white" />
                  </div>
                  <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    {translations.morning}
                  </span>
                </h2>
                
                {eventDate && (
                  <div className="hidden md:flex items-center px-4 py-2 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full border border-emerald-200">
                    <CalendarDaysIcon className="w-5 h-5 mr-2 text-emerald-600" />
                    <span className="text-emerald-700 font-medium">{formatEventDate(eventDate)}</span>
                  </div>
                )}
              </div>
            </ScrollReveal>
            
            <ScrollReveal direction="up" distance={10} duration={0.3} delay={0.2}>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-emerald-50 to-teal-50">
                        <th className="py-4 px-6 text-left text-slate-700 font-bold w-1/6 min-w-[140px]">
                          <div className="flex items-center">
                            <ClockIcon className="w-4 h-4 mr-2 text-emerald-600" />
                            {translations.time}
                          </div>
                        </th>
                        <th className="py-4 px-6 text-left text-slate-700 font-bold w-2/6 min-w-[220px]">
                          <div className="flex items-center">
                            <PresentationChartBarIcon className="w-4 h-4 mr-2 text-teal-600" />
                            {translations.topic}
                          </div>
                        </th>
                        <th className="py-4 px-6 text-left text-slate-700 font-bold w-1/6 min-w-[140px]">
                          <div className="flex items-center">
                            <MapPinIcon className="w-4 h-4 mr-2 text-blue-600" />
                            {translations.room}
                          </div>
                        </th>
                        <th className="py-4 px-6 text-left text-slate-700 font-bold w-2/6 min-w-[220px]">
                          <div className="flex items-center">
                            <SparklesIcon className="w-4 h-4 mr-2 text-purple-600" />
                            {translations.description}
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {morningSchedule.map((item, index) => (
                        <motion.tr 
                          key={item.id} 
                          className="border-t border-slate-200/50 hover:bg-gradient-to-r hover:from-emerald-50/50 hover:to-teal-50/50 transition-all duration-300"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ 
                            duration: 0.5, 
                            delay: 0.1 + index * 0.05,
                            ease: "easeOut"
                          }}
                        >
                          <td className="py-4 px-6">
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                              <span className="text-slate-700 font-medium">
                                {formatTimeDisplay(item.time_start)} - {formatTimeDisplay(item.time_end)}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="font-semibold text-slate-800 leading-relaxed">
                              {locale === 'th' ? item.title_th : item.title_en}
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full border border-blue-200">
                              <MapPinIcon className="w-3 h-3 mr-1 text-blue-600" />
                              <span className="text-blue-700 text-sm font-medium">
                                {locale === 'th' ? item.room_name_th : item.room_name_en}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-slate-600 text-sm leading-relaxed">
                            {locale === 'th' ? 
                              (item.description_th || '-') : 
                              (item.description_en || '-')}
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </ScrollReveal>
          </div>
          
          {/* Afternoon Schedule */}
          <div>
            <ScrollReveal direction="up" distance={15} duration={0.3} delay={0.3}>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-prompt font-bold text-slate-800 flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg mr-4">
                    <ClockIcon className="w-6 h-6 text-white" />
                  </div>
                  <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                    {translations.afternoon}
                  </span>
                </h2>
                
                {eventDate && (
                  <div className="hidden md:flex items-center px-4 py-2 bg-gradient-to-r from-teal-100 to-blue-100 rounded-full border border-teal-200">
                    <CalendarDaysIcon className="w-5 h-5 mr-2 text-teal-600" />
                    <span className="text-teal-700 font-medium">{formatEventDate(eventDate)}</span>
                  </div>
                )}
              </div>
            </ScrollReveal>
            
            <div className="grid gap-8">
              {Object.keys(afternoonByRoom).map((roomId, roomIndex) => {
                const roomSchedule = afternoonByRoom[roomId];
                const roomInfo = roomSchedule[0];
                
                return (
                  <motion.div 
                    key={roomId} 
                    className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 overflow-hidden hover:shadow-xl transition-all duration-500"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: 0.3 + (roomIndex * 0.15),
                      ease: "easeOut"
                    }}
                  >
                    {/* Room Header */}
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-slate-700 to-slate-800"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-blue-500/20"></div>
                      <div className="relative p-6 text-white">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-teal-400 to-blue-400 rounded-xl flex items-center justify-center shadow-lg">
                              <MapPinIcon className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h3 className="text-lg font-bold">
                                {locale === 'th' ? roomInfo.room_name_th : roomInfo.room_name_en}
                              </h3>
                              <p className="text-slate-300 text-sm">
                                {locale === 'th' ? 'ห้องประชุม' : 'Conference Room'}
                              </p>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="flex items-center space-x-2 text-slate-200">
                              <ClockIcon className="w-4 h-4" />
                              <span className="font-medium">
                                {formatTimeDisplay(roomInfo.time_start)} - {formatTimeDisplay(roomInfo.time_end)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                
                    {/* Sessions */}
                    <div className="p-6 space-y-6">
                      {roomSchedule.map((session, sessionIndex) => (
                        <motion.div 
                          key={session.id} 
                          className="relative"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ 
                            duration: 0.5, 
                            delay: 0.4 + (roomIndex * 0.1) + (sessionIndex * 0.1),
                            ease: "easeOut"
                          }}
                        >
                          {sessionIndex > 0 && (
                            <div className="absolute -top-3 left-0 right-0 flex justify-center">
                              <div className="w-12 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
                            </div>
                          )}
                          
                          <div className="bg-gradient-to-r from-slate-50 to-slate-100/50 rounded-2xl p-6 border border-slate-200/50 hover:shadow-md transition-all duration-300">
                            {/* Session Title */}
                            <h4 className="text-xl font-bold text-slate-800 mb-3 leading-relaxed">
                              {locale === 'th' ? session.title_th : session.title_en}
                            </h4>
                            
                            {/* Speaker */}
                            <div className="flex items-center mb-4 p-3 bg-white/60 rounded-xl border border-slate-200/30">
                              <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center mr-3">
                                <UserIcon className="w-4 h-4 text-white" />
                              </div>
                              <div>
                                <div className="text-sm text-slate-500 font-medium">
                                  {locale === 'th' ? 'วิทยากร' : 'Speaker'}
                                </div>
                                <div className="text-slate-700 font-semibold">
                                  {locale === 'th' ? session.speaker_th : session.speaker_en}
                                </div>
                              </div>
                            </div>
                            
                            {/* Description */}
                            {(session.description_th || session.description_en) && (
                              <div className="text-slate-600 leading-relaxed p-4 bg-gradient-to-r from-emerald-50/50 to-teal-50/50 rounded-xl border border-emerald-100/50">
                                <div className="flex items-start space-x-2">
                                  <SparklesIcon className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                                  <p>
                                    {locale === 'th' ? 
                                      (session.description_th || '-') : 
                                      (session.description_en || '-')}
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}