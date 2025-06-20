import { NextResponse } from 'next/server';
import { executeQuery, getSeminarRoomById, getSchedule } from '@/lib/db';

export async function POST(request) {
  try {
    const data = await request.json();
    const { 
      registrantId, 
      notificationType, // 'update' or 'delete'
      channels // ['email', 'sms'] or one of them
    } = data;
    
    if (!registrantId || !notificationType || !channels || channels.length === 0) {
      return NextResponse.json(
        { success: false, error: 'ข้อมูลไม่ครบถ้วน กรุณาระบุ registrantId, notificationType และ channels' },
        { status: 400 }
      );
    }
    
    // Get registrant data
    const registrants = await executeQuery(
      `SELECT r.*, 
        ot.name_th as organization_type_th, ot.name_en as organization_type_en,
        t.transport_type,
        sr.name_th as room_name_th, sr.name_en as room_name_en,
        bd.name_th as bangkok_district_name_th, bd.name_en as bangkok_district_name_en,
        p.name_th as province_name_th, p.name_en as province_name_en
      FROM CCI_registrants r
      LEFT JOIN CCI_organization_types ot ON r.organization_type_id = ot.id
      LEFT JOIN CCI_transportation t ON r.id = t.registrant_id
      LEFT JOIN CCI_seminar_rooms sr ON r.selected_room_id = sr.id
      LEFT JOIN CCI_bangkok_districts bd ON r.bangkok_district_id = bd.id
      LEFT JOIN CCI_provinces p ON r.province_id = p.id
      WHERE r.id = ?`,
      [registrantId]
    );
    
    if (registrants.length === 0) {
      return NextResponse.json(
        { success: false, error: 'ไม่พบข้อมูลผู้ลงทะเบียน' },
        { status: 404 }
      );
    }
    
    const registrant = registrants[0];
    const results = { success: true, email: null, sms: null };
    
    // Fetch schedule data for accurate times
    const scheduleData = await getSchedule();
    
    // Send email notification if requested
    if (channels.includes('email')) {
      try {
        // ใช้ URL ที่เป็น absolute URL
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        const emailResponse = await fetch(`${baseUrl}/api/send-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: registrant.email,
            firstName: registrant.first_name,
            lastName: registrant.last_name,
            registrationId: registrant.uuid,
            attendanceType: registrant.attendance_type,
            selectedRoom: registrant.selected_room_id ? {
              id: registrant.selected_room_id,
              name_th: registrant.room_name_th,
              name_en: registrant.room_name_en
            } : null,
            locale: 'th', // Default to Thai
            notificationType: notificationType
          }),
        });
        
        const emailResult = await emailResponse.json();
        results.email = emailResult;
      } catch (error) {
        console.error('Error sending email notification:', error);
        results.email = { error: 'ไม่สามารถส่งอีเมลได้' };
      }
    }
    
    // Send SMS notification if requested
    if (channels.includes('sms')) {
      try {
        // Format phone number for display (000-000-XXXX)
        const displayPhone = `${registrant.phone.replace(/[^0-9]/g, '').slice(0, 3)}-${registrant.phone.replace(/[^0-9]/g, '').slice(3, 6)}-XXXX`;
        
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
          const afternoonTime = getAfternoonTimeInfo(registrant.selected_room_id);
          
          switch (registrant.attendance_type) {
            case 'morning':
              return `ช่วงเช้า (${morningTime} น.)`;
            case 'afternoon':
              return `ช่วงบ่าย (${afternoonTime} น.)`;
            case 'full_day':
              return `เต็มวัน (${morningTime} - ${afternoonTime.split(' - ')[1]} น.)`;
            default:
              return '';
          }
        };
        
        // ใช้ URL ที่เป็น absolute URL เช่นเดียวกับการส่งอีเมล
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        const smsResponse = await fetch(`${baseUrl}/api/send-sms`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            phone: registrant.phone,
            firstName: registrant.first_name,
            lastName: registrant.last_name,
            registrationId: registrant.uuid,
            attendanceType: registrant.attendance_type,
            selectedRoomId: registrant.selected_room_id,
            locale: 'th', // Default to Thai
            notificationType: notificationType,
            eventDate: '15 กันยายน 2568' // Hardcoded for now
          }),
        });
        
        const smsResult = await smsResponse.json();
        results.sms = smsResult;
      } catch (error) {
        console.error('Error sending SMS notification:', error);
        results.sms = { error: 'ไม่สามารถส่ง SMS ได้' };
      }
    }
    
    return NextResponse.json({
      success: true,
      message: 'ส่งการแจ้งเตือนสำเร็จ',
      results
    });
    
  } catch (error) {
    console.error('Error sending notifications:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
