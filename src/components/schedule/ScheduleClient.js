'use client';

import { useState, useEffect } from 'react';
import { ClockIcon, MapPinIcon, UserIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';
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
  
  // สีที่ใช้:
  // Mocha Mousse: #9D7553 (น้ำตาลอ่อน)
  // Mother of Pearl: #F2F2F2 (ขาวมุก)
  // Beige: #F5F5DC (เบจ)
  
  return (
    <div className="bg-[#F2F2F2] py-12 font-prompt">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal direction="up" distance={20} duration={0.4}>
            <div className="bg-[#E6DBCC] rounded-lg shadow-sm mb-8 overflow-hidden">
              <div className="px-6 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-[#8B7D6B] p-2 rounded-lg text-white">
                    <CalendarDaysIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h1 className="text-xl font-prompt font-semibold text-[#8B7D6B]">{translations.title}</h1>
                    {eventDate && (
                      <p className="text-sm font-prompt text-[#A99985]">{formatEventDate(eventDate)}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="h-1 bg-gradient-to-r from-[#8B7D6B] to-[#D4C5B1]"></div>
            </div>
          </ScrollReveal>
          
          {/* Morning Schedule */}
          <div className="mb-12">
            <ScrollReveal direction="up" distance={15} duration={0.3} delay={0.1}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-prompt font-semibold text-[#9D7553] flex items-center">
                  <span className="w-8 h-8 bg-[#9D7553] rounded-full flex items-center justify-center text-white mr-2">
                    <ClockIcon className="w-4 h-4" />
                  </span>
                  {translations.morning}
                </h2>
                
                {eventDate && (
                  <div className="text-[#9D7553] font-medium flex items-center">
                    <CalendarDaysIcon className="w-4 h-4 mr-2" />
                    {formatEventDate(eventDate)}
                  </div>
                )}
              </div>
            </ScrollReveal>
            
            <ScrollReveal direction="up" distance={10} duration={0.3} delay={0.2}>
              <div className="bg-white rounded-lg shadow-sm border border-[#F5F5DC] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-[#F5F5DC]">
                        <th className="py-3 px-4 text-left text-[#9D7553] w-1/6 min-w-[120px]">{translations.time}</th>
                        <th className="py-3 px-4 text-left text-[#9D7553] w-2/6 min-w-[200px]">{translations.topic}</th>
                        <th className="py-3 px-4 text-left text-[#9D7553] w-1/6 min-w-[120px]">{translations.room}</th>
                        <th className="py-3 px-4 text-left text-[#9D7553] w-2/6 min-w-[200px]">{translations.description}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {morningSchedule.map((item, index) => (
                        <tr 
                          key={item.id} 
                          className="border-t border-[#F5F5DC] hover:bg-[#F5F5DC]/20"
                          style={{
                            opacity: 0,
                            animation: `fadeIn 0.5s ease-out ${0.1 + index * 0.05}s forwards`
                          }}
                        >
                          <td className="py-3 px-4 text-[#9D7553]">
                            {formatTimeDisplay(item.time_start)} - {formatTimeDisplay(item.time_end)}
                          </td>
                          <td className="py-3 px-4 text-[#9D7553] font-medium">
                            {locale === 'th' ? item.title_th : item.title_en}
                          </td>
                          <td className="py-3 px-4 text-[#9D7553]/90">
                            {locale === 'th' ? item.room_name_th : item.room_name_en}
                          </td>
                          <td className="py-3 px-4 text-[#9D7553]/80 text-sm">
                            {locale === 'th' ? 
                              (item.description_th || '-') : 
                              (item.description_en || '-')}
                          </td>
                        </tr>
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
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-prompt font-semibold text-[#9D7553] flex items-center">
                  <span className="w-8 h-8 bg-[#9D7553] rounded-full flex items-center justify-center text-white mr-2">
                    <ClockIcon className="w-4 h-4" />
                  </span>
                  {translations.afternoon}
                </h2>
                
                {eventDate && (
                  <div className="text-[#9D7553] font-medium flex items-center">
                    <CalendarDaysIcon className="w-4 h-4 mr-2" />
                    {formatEventDate(eventDate)}
                  </div>
                )}
              </div>
            </ScrollReveal>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.keys(afternoonByRoom).map((roomId, roomIndex) => {
                const roomSchedule = afternoonByRoom[roomId];
                const roomInfo = roomSchedule[0];
                
                return (
                  <motion.div 
                    key={roomId} 
                    className="bg-white rounded-lg shadow-sm border border-[#F5F5DC] overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 0.3 + (roomIndex * 0.1),
                      ease: "easeOut"
                    }}
                  >
                    <div className="bg-[#9D7553] text-white p-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium flex items-center">
                          <MapPinIcon className="w-4 h-4 mr-1" />
                          {locale === 'th' ? roomInfo.room_name_th : roomInfo.room_name_en}
                        </h3>
                        

                      </div>
                    </div>
                
                    <div className="p-4">
                      {roomSchedule.map((session, sessionIndex) => (
                        <div 
                          key={session.id} 
                          className="mb-4 pb-4 border-b border-[#F5F5DC] last:border-0 last:mb-0 last:pb-0"
                          style={{
                            opacity: 0,
                            animation: `fadeIn 0.5s ease-out ${0.4 + (roomIndex * 0.1) + (sessionIndex * 0.05)}s forwards`
                          }}
                        >
                          <div className="text-sm text-[#9D7553]/80 mb-1 flex items-center">
                            <ClockIcon className="w-3 h-3 mr-1" />
                            {formatTimeDisplay(session.time_start)} - {formatTimeDisplay(session.time_end)}
                          </div>
                          
                          <h4 className="font-medium text-[#9D7553] mb-1">
                            {locale === 'th' ? session.title_th : session.title_en}
                          </h4>
                          
                          <div className="text-sm text-[#9D7553]/90 mb-2 flex items-center">
                            <UserIcon className="w-3 h-3 mr-1" />
                            {locale === 'th' ? session.speaker_th : session.speaker_en}
                          </div>
                          
                          <p className="text-sm text-[#9D7553]/80">
                            {locale === 'th' ? 
                              (session.description_th || '-') : 
                              (session.description_en || '-')}
                          </p>
                        </div>
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