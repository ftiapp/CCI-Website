'use client';

import React, { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

/**
 * EventTicket component - สร้างตั๋วงานในรูปแบบตั๋วหนัง
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
      <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-earth-200 flex flex-col md:flex-row">
        {/* Left side - QR Code and Registration ID */}
        <div className="bg-beige-50 p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-dashed border-earth-300 md:w-1/3">
          <div className="mb-4 bg-white p-4 rounded-lg shadow-sm qr-code-container" style={{ backgroundColor: 'white', padding: '16px', border: '2px solid white' }}>
            <div style={{ backgroundColor: 'white', padding: '8px' }}>
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
          <p className="text-xs text-earth-600 mb-1">{locale === 'th' ? 'รหัสลงทะเบียน' : 'Registration ID'}</p>
          <p className="text-xl font-prompt font-bold text-beige-700">{registrationId || 'CCI_000000'}</p>
        </div>

        {/* Right side - Event details and attendee info */}
        <div className="p-6 flex-1 flex flex-col justify-between">
          {/* Header */}
          <div className="mb-4 border-b border-earth-100 pb-4">
            <h2 className="font-prompt font-bold text-xl text-earth-900 mb-1">CCI Climate Change Forum 2025</h2>
            <p className="text-sm text-earth-600">
              {locale === 'th' ? 'วันที่ 15 กันยายน 2568' : 'September 15, 2025'}
            </p>
            <p className="text-sm text-earth-600">
              {locale === 'th' ? 'อาคารเอ็ม ทาวเวอร์ ชั้น 8 ถนนสุขุมวิท กรุงเทพฯ' : 'M Tower, 8th Floor, Sukhumvit Road, Bangkok'}
            </p>
          </div>

          {/* Attendee Info */}
          <div className="mb-4">
            <p className="text-sm font-medium text-earth-600 mb-1">{locale === 'th' ? 'ผู้เข้าร่วมงาน' : 'Attendee'}</p>
            <p className="font-prompt font-semibold text-lg text-earth-800">{firstName} {lastName}</p>
            <p className="text-sm text-earth-600">{formatPhone(phone)}</p>
          </div>

          {/* Schedule */}
          <div>
            <p className="text-sm font-medium text-earth-600 mb-2">{locale === 'th' ? 'กำหนดการ' : 'Schedule'}</p>
            
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="w-5 h-5 mr-2">
                  {isMorningAttendance ? (
                    <CheckCircleIcon className="w-5 h-5 text-green-500" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border border-earth-300" />
                  )}
                </div>
                <span className={`text-sm ${isMorningAttendance ? 'text-earth-800 font-medium' : 'text-earth-500'}`}>
                  {locale === 'th' ? `ช่วงเช้า (${morningTimeInfo} น.)` : `Morning (${morningTimeInfo})`}
                </span>
              </div>
              
              <div className="flex items-center">
                <div className="w-5 h-5 mr-2">
                  {isAfternoonAttendance ? (
                    <CheckCircleIcon className="w-5 h-5 text-green-500" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border border-earth-300" />
                  )}
                </div>
                <span className={`text-sm ${isAfternoonAttendance ? 'text-earth-800 font-medium' : 'text-earth-500'}`}>
                  {locale === 'th' ? `ช่วงบ่าย (${afternoonTimeInfo} น.)` : `Afternoon (${afternoonTimeInfo})`}
                </span>
              </div>
              
              {isAfternoonAttendance && selectedRoom && (
                <div className="ml-7 mt-1">
                  <p className="text-xs text-earth-600">{locale === 'th' ? 'ห้องสัมมนา:' : 'Seminar Room:'}</p>
                  <p className="text-sm font-medium text-earth-800">
                    {locale === 'th' ? selectedRoom.name_th : selectedRoom.name_en}
                    <span className="text-xs text-earth-600 ml-1">
                      ({afternoonTimeInfo})
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Ticket edge design */}
      <div className="flex justify-between px-4 -mt-3 relative z-10">
        <div className="w-6 h-6 rounded-full bg-earth-100 border-4 border-white"></div>
        <div className="border-t-2 border-dashed border-earth-300 flex-grow my-3 mx-2"></div>
        <div className="w-6 h-6 rounded-full bg-earth-100 border-4 border-white"></div>
      </div>
    </div>
  );
}
