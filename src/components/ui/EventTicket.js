'use client';

import React, { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import { CheckCircleIcon, SparklesIcon, CalendarIcon, UserIcon } from '@heroicons/react/24/solid';

/**
 * EventTicket component - ตั๋วงานในรูปแบบตั๋วหนังที่ทันสมัย
 */
export default function EventTicket({ 
  registrationId,
  firstName,
  lastName,
  phone,
  attendanceType,
  selectedRoom,
  locale
}) {
  // State for schedule data
  const [scheduleData, setScheduleData] = useState([]);
  const [morningTimeInfo, setMorningTimeInfo] = useState('08.30 - 12.00');
  const [afternoonTimeInfo, setAfternoonTimeInfo] = useState('13.00 - 16.30');
  
  // Fetch schedule data on component mount
  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        const response = await fetch('/api/schedule');
        if (response.ok) {
          const responseData = await response.json();
          
          // Check if the data is in the expected format
          if (responseData && responseData.data && Array.isArray(responseData.data)) {
            const scheduleArray = responseData.data;
            setScheduleData(scheduleArray);
            
            // Calculate morning time range
            const morningSchedule = scheduleArray.filter(item => item.is_morning);
            if (morningSchedule.length > 0) {
              const sortedSessions = [...morningSchedule].sort((a, b) => 
                a.time_start.localeCompare(b.time_start)
              );
              const firstSession = sortedSessions[0];
              const lastSession = sortedSessions[sortedSessions.length - 1];
              
              const startTime = firstSession.time_start?.substring(0, 5);
              const endTime = lastSession.time_end?.substring(0, 5);
              if (startTime && endTime) {
                setMorningTimeInfo(`${startTime} - ${endTime}`);
              }
            }
            
            // Calculate afternoon time range for selected room
            if (selectedRoom) {
              const roomSchedule = scheduleArray.filter(item => 
                item.room_id === selectedRoom.id && !item.is_morning
              );
              
              if (roomSchedule.length > 0) {
                const firstSession = roomSchedule[0];
                const startTime = firstSession.time_start?.substring(0, 5);
                const endTime = firstSession.time_end?.substring(0, 5);
                if (startTime && endTime) {
                  setAfternoonTimeInfo(`${startTime} - ${endTime}`);
                }
              }
            }
          } else {
            console.error('Schedule data is not in expected format:', responseData);
          }
        }
      } catch (error) {
        console.error('Error fetching schedule data:', error);
      }
    };
    
    fetchScheduleData();
  }, [selectedRoom]);

  // Format phone number for display (000-000-XXXX)
  const formatPhone = (phoneNumber) => {
    if (!phoneNumber) return '';
    
    // Keep only last 4 digits visible for privacy
    const digits = phoneNumber.replace(/\D/g, '');
    if (digits.length >= 10) {
      return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-XXXX`;
    }
    return phoneNumber;
  };

  // Get attendance type label with actual time information
  const getAttendanceTypeLabel = () => {
    switch (attendanceType) {
      case 'morning':
        return locale === 'th' ? `ช่วงเช้า (${morningTimeInfo} น.)` : `Morning (${morningTimeInfo})`;
      case 'afternoon':
        return locale === 'th' ? `ช่วงบ่าย (${afternoonTimeInfo} น.)` : `Afternoon (${afternoonTimeInfo})`;
      case 'full_day':
        return locale === 'th' ? `เต็มวัน (${morningTimeInfo} - ${afternoonTimeInfo.split(' - ')[1]} น.)` : `Full Day (${morningTimeInfo} - ${afternoonTimeInfo.split(' - ')[1]})`;
      default:
        return '';
    }
  };

  // Check if attending morning session
  const isMorningAttendance = attendanceType === 'morning' || attendanceType === 'full_day';
  
  // Check if attending afternoon session
  const isAfternoonAttendance = attendanceType === 'afternoon' || attendanceType === 'full_day';

  return (
    <div className="max-w-2xl mx-auto">
      {/* Background decoration */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-3xl transform rotate-1 opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-blue-500 rounded-3xl transform -rotate-1 opacity-10"></div>
        
        {/* Main ticket card */}
        <div className="relative bg-white/90 backdrop-blur-lg rounded-2xl overflow-hidden shadow-2xl border border-white/50 flex flex-col md:flex-row">
          {/* Left side - QR Code and Registration ID */}
          <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50 p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-dashed border-emerald-200 md:w-1/3 relative">
            {/* Background decoration for QR section */}
            <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-emerald-300/30 to-teal-300/30 rounded-full blur-xl"></div>
            <div className="absolute bottom-4 left-4 w-6 h-6 bg-gradient-to-br from-blue-300/30 to-emerald-300/30 rounded-full blur-xl"></div>
            
            {/* QR Code with modern styling */}
            <div className="mb-6 bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-white/50 qr-code-container">
              <div className="bg-white p-2 rounded-xl border-2 border-white">
                <QRCode 
                  value={registrationId || 'CCI_000000'} 
                  size={150} 
                  level="H"
                  className="mx-auto"
                  bgColor="#FFFFFF"
                  fgColor="#000000"
                />
              </div>
            </div>
            
            {/* Registration ID with modern styling */}
            <div className="text-center">
              <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full text-xs font-medium text-emerald-700 border border-emerald-200 mb-2">
                <SparklesIcon className="w-3 h-3 mr-1" />
                {locale === 'th' ? 'รหัสลงทะเบียน' : 'Registration ID'}
              </div>
              <p className="text-xl font-prompt font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                {registrationId || 'CCI_000000'}
              </p>
            </div>
          </div>

          {/* Right side - Event details and attendee info */}
          <div className="p-6 flex-1 flex flex-col justify-between bg-gradient-to-br from-white/50 to-slate-50/50 backdrop-blur-sm">
            {/* Header with modern styling */}
            <div className="mb-4 border-b border-slate-200/50 pb-4">
              <div className="flex items-start space-x-3 mb-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                    <CalendarIcon className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="font-prompt font-bold text-xl bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-1">
                    CCI Climate Change Forum 2025
                  </h2>
                  <div className="space-y-1">
                    <p className="text-sm text-slate-600 flex items-center">
                      <span className="inline-block w-2 h-2 bg-emerald-400 rounded-full mr-2"></span>
                      {locale === 'th' ? 'วันที่ 15 กันยายน 2568' : 'September 15, 2025'}
                    </p>
                    <p className="text-sm text-slate-600 flex items-center">
                      <span className="inline-block w-2 h-2 bg-teal-400 rounded-full mr-2"></span>
                      {locale === 'th' ? 'อาคารเอ็ม ทาวเวอร์ ชั้น 8 ถนนสุขุมวิท กรุงเทพฯ' : 'M Tower, 8th Floor, Sukhumvit Road, Bangkok'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Attendee Info with modern styling */}
            <div className="mb-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center shadow-md">
                  <UserIcon className="w-4 h-4 text-white" />
                </div>
                <p className="text-sm font-medium text-slate-600">{locale === 'th' ? 'ผู้เข้าร่วมงาน' : 'Attendee'}</p>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-sm">
                <p className="font-prompt font-semibold text-lg bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  {firstName} {lastName}
                </p>
                <p className="text-sm text-slate-600 mt-1">{formatPhone(phone)}</p>
              </div>
            </div>

            {/* Schedule with modern styling */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-md">
                  <CalendarIcon className="w-4 h-4 text-white" />
                </div>
                <p className="text-sm font-medium text-slate-600">{locale === 'th' ? 'กำหนดการ' : 'Schedule'}</p>
              </div>
              
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-sm space-y-3">
                <div className="flex items-center">
                  <div className="w-5 h-5 mr-3">
                    {isMorningAttendance ? (
                      <CheckCircleIcon className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-slate-300" />
                    )}
                  </div>
                  <span className={`text-sm ${isMorningAttendance ? 'text-slate-800 font-medium' : 'text-slate-500'}`}>
                    {locale === 'th' ? `ช่วงเช้า (${morningTimeInfo} น.)` : `Morning (${morningTimeInfo})`}
                  </span>
                </div>
                
                <div className="flex items-center">
                  <div className="w-5 h-5 mr-3">
                    {isAfternoonAttendance ? (
                      <CheckCircleIcon className="w-5 h-5 text-teal-500" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-slate-300" />
                    )}
                  </div>
                  <span className={`text-sm ${isAfternoonAttendance ? 'text-slate-800 font-medium' : 'text-slate-500'}`}>
                    {locale === 'th' ? `ช่วงบ่าย (${afternoonTimeInfo} น.)` : `Afternoon (${afternoonTimeInfo})`}
                  </span>
                </div>
                
                {isAfternoonAttendance && selectedRoom && (
                  <div className="ml-8 mt-2 p-3 bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg border border-teal-100">
                    <p className="text-xs text-slate-600 mb-1">{locale === 'th' ? 'ห้องสัมมนา:' : 'Seminar Room:'}</p>
                    <p className="text-sm font-medium text-slate-800">
                      {locale === 'th' ? selectedRoom.name_th : selectedRoom.name_en}
                      <span className="text-xs text-slate-600 ml-2 px-2 py-1 bg-white/70 rounded-full">
                        {afternoonTimeInfo}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Modern ticket edge design */}
        <div className="flex justify-between px-4 -mt-4 relative z-10">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 border-4 border-white shadow-lg"></div>
          <div className="border-t-2 border-dashed border-emerald-300 flex-grow my-4 mx-2"></div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 border-4 border-white shadow-lg"></div>
        </div>
      </div>
    </div>
  );
}