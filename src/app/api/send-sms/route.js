'use server';

import { NextResponse } from 'next/server';
import { getSeminarRoomById, getSchedule } from '@/lib/db';

export async function POST(request) {
  try {
    const data = await request.json();
    const { phone, firstName, lastName, registrationId, eventDate, locale, attendanceType, selectedRoomId } = data;
    
    // Fetch schedule data to get accurate times
    const scheduleData = await getSchedule();
    
    if (!phone || !firstName || !lastName || !registrationId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Sanitize phone number (remove spaces, dashes, etc.)
    let formattedPhone = phone.replace(/[^0-9]/g, '');
    
    // Convert phone number to start with 66 instead of 0 as required by the SMS API
    if (formattedPhone.startsWith('0')) {
      formattedPhone = '66' + formattedPhone.substring(1);
    }
    
    // Format phone number for display (000-000-XXXX)
    const displayPhone = `${phone.replace(/[^0-9]/g, '').slice(0, 3)}-${phone.replace(/[^0-9]/g, '').slice(3, 6)}-XXXX`;
    
    // Base URL with fallback
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://cci.fti.or.th';
    
    // Get morning session time range
    const getMorningTimeInfo = () => {
      const morningSchedule = scheduleData.filter(item => item.is_morning);
      if (morningSchedule.length > 0) {
        // Find first and last sessions
        const sortedSessions = [...morningSchedule].sort((a, b) => 
          a.time_start.localeCompare(b.time_start)
        );
        const firstSession = sortedSessions[0];
        const lastSession = sortedSessions[sortedSessions.length - 1];
        
        const startTime = firstSession.time_start?.substring(0, 5);
        const endTime = lastSession.time_end?.substring(0, 5);
        return startTime && endTime ? `${startTime} - ${endTime}` : '08.30 - 12.00';
      }
      return '08.30 - 12.00';
    };
    
    // Get afternoon session time range for a specific room
    const getAfternoonTimeInfo = (roomId) => {
      if (!roomId) return '13.00 - 16.30';
      
      const roomSchedule = scheduleData.filter(item => 
        item.room_id === parseInt(roomId) && !item.is_morning
      );
      
      if (roomSchedule.length > 0) {
        const firstSession = roomSchedule[0];
        const startTime = firstSession.time_start?.substring(0, 5);
        const endTime = firstSession.time_end?.substring(0, 5);
        return startTime && endTime ? `${startTime} - ${endTime}` : '13.00 - 16.30';
      }
      
      return '13.00 - 16.30';
    };
    
    // Get attendance type label with accurate time information
    const getAttendanceTypeLabel = () => {
      const morningTime = getMorningTimeInfo();
      const afternoonTime = getAfternoonTimeInfo(selectedRoomId);
      
      switch (attendanceType) {
        case 'morning':
          return locale === 'th' ? `ช่วงเช้า (${morningTime} น.)` : `Morning (${morningTime})`;
        case 'afternoon':
          return locale === 'th' ? `ช่วงบ่าย (${afternoonTime} น.)` : `Afternoon (${afternoonTime})`;
        case 'full_day':
          return locale === 'th' ? `เต็มวัน (${morningTime} - ${afternoonTime.split(' - ')[1]} น.)` : `Full Day (${morningTime} - ${afternoonTime.split(' - ')[1]})`;
        default:
          return '';
      }
    };
    
    // Get seminar room info if applicable
    let roomInfo = '';
    if ((attendanceType === 'afternoon' || attendanceType === 'full_day') && selectedRoomId) {
      try {
        const room = await getSeminarRoomById(selectedRoomId);
        if (room) {
          const roomTime = getAfternoonTimeInfo(selectedRoomId);
          roomInfo = locale === 'th' 
            ? `\nห้องสัมมนา: ${room.name_th} (${roomTime} น.)`
            : `\nSeminar Room: ${room.name_en} (${roomTime})`;
        }
      } catch (error) {
        console.error('Error fetching seminar room:', error);
      }
    }
    
    // Create SMS message based on language
    let message;
    
    if (locale === 'th') {
      // For Thai messages, we need to use the raw text
      // The API requires type=5 for Thai language
      const thaiMessage = `ขอบคุณสำหรับการลงทะเบียน CCI Climate Change Forum 2025
คุณ ${firstName} ${lastName}
เบอร์โทร: ${displayPhone}
วันที่: 15 กันยายน 2568
ประเภทการเข้าร่วม: ${getAttendanceTypeLabel()}${roomInfo}
ตรวจสอบ QR Code ได้ที่: ${baseUrl}/${locale}/ticket/${registrationId}`;
      
      // For Thai language, we use the raw message as the API will handle it with type=5
      message = thaiMessage;
    } else {
      // For English messages, we need to replace spaces with +
      // The API requires type=0 for English language
      message = `Thank you for registering for CCI Climate Change Forum 2025\nName: ${firstName} ${lastName}\nPhone: ${displayPhone}\nDate: September 15, 2025\nAttendance: ${getAttendanceTypeLabel()}${roomInfo}\nCheck your QR Code at: ${baseUrl}/${locale}/ticket/${registrationId}`;
      
      // Replace spaces with + for English messages
      message = message.replace(/ /g, '+');
    }
    
    // Get SMS API parameters with fallback values
    const user = process.env.SMS_USER || 'FTITransaction';
    const pass = process.env.SMS_PASS || 'uu#bEy8J';
    const type = locale === 'th' ? '5' : '0'; // 5 for Thai language, 0 for English
    const from = process.env.SMS_FROM || 'FTIoffice'; // Using registered sender name
    const servid = process.env.SMS_SERVICE_ID || 'FTI002';
    
    // Encode all parameters properly for URL
    const encodedUser = encodeURIComponent(user);
    const encodedPass = encodeURIComponent(pass); // Properly encode the password including the # character
    const encodedFrom = encodeURIComponent(from);
    const encodedServid = encodeURIComponent(servid);
    const encodedMessage = encodeURIComponent(message);
    
    // Send SMS with fallback URL
    const smsApiUrl = process.env.SMS_API_URL || 'https://www.etracker.cc/bulksms/mesapi.aspx';
    
    // Construct the URL with all parameters properly encoded
    const completeUrl = `${smsApiUrl}?user=${encodedUser}&pass=${encodedPass}&type=${type}&from=${encodedFrom}&servid=${encodedServid}&to=${formattedPhone}&text=${encodedMessage}`;
    
    // Log the complete URL for debugging
    console.log('Complete SMS API URL:', completeUrl);
    
    try {
      const response = await fetch(completeUrl, {
        method: 'GET',
      });
      
      const responseText = await response.text();
      
      console.log('SMS API response:', responseText);
      console.log('SMS API response status:', response.status);
      
      // Check if SMS was sent successfully
      // The SMS API returns a response in format: "phone,messageId,statusCode"
      // Where statusCode 200 indicates success
      const responseParts = responseText.split(',');
      
      if (responseParts.length === 3 && responseParts[2] === '200') {
        console.log('SMS sent successfully!');
        return NextResponse.json({ 
          success: true,
          messageId: responseParts[1],
          phone: responseParts[0]
        });
      } else if (response.status === 200) {
        // If HTTP status is 200 but we don't recognize the format, assume success
        console.log('SMS likely sent successfully (HTTP 200)');
        return NextResponse.json({ success: true });
      } else {
        console.error('SMS API error response:', responseText);
        return NextResponse.json({ 
          error: responseText, 
          url: completeUrl, // Include the URL in the error response
          params: Object.fromEntries(params) // Include the parameters for debugging
        }, { status: 500 });
      }
    } catch (error) {
      console.error('SMS sending error:', error);
      return NextResponse.json({ error: 'Failed to send SMS' }, { status: 500 });
    }
    
  } catch (error) {
    console.error('Error sending SMS:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
