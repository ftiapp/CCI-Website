'use server';

import { NextResponse } from 'next/server';
import { getSchedule, getSeminarRoomById } from '@/lib/db';

export async function POST(request) {
  try {
    const data = await request.json();
    const { 
      email, 
      firstName, 
      lastName, 
      registrationId, 
      attendanceType,
      selectedRoom,
      locale,
      notificationType 
    } = data;
    
    // Fetch schedule data to get accurate times
    const scheduleData = await getSchedule();
    
    // Get seminar room info if applicable
    let roomInfo = null;
    if ((attendanceType === 'afternoon' || attendanceType === 'full_day') && selectedRoom) {
      try {
        // If selectedRoom is an object with id property
        const roomId = typeof selectedRoom === 'object' && selectedRoom.id ? selectedRoom.id : selectedRoom;
        
        if (roomId) {
          const room = await getSeminarRoomById(roomId);
          if (room) {
            // Get afternoon session time range for this room
            const roomSchedule = scheduleData.filter(item => 
              item.room_id === parseInt(roomId) && !item.is_morning
            );
            
            let roomTime = '13.00 - 16.30';
            if (roomSchedule.length > 0) {
              const firstSession = roomSchedule[0];
              const startTime = firstSession.time_start?.substring(0, 5);
              const endTime = firstSession.time_end?.substring(0, 5);
              roomTime = startTime && endTime ? `${startTime} - ${endTime}` : '13.00 - 16.30';
            }
            
            roomInfo = {
              name: locale === 'th' ? room.name_th : room.name_en,
              description: locale === 'th' ? room.description_th : room.description_en,
              time: roomTime
            };
            
            console.log('Room info:', roomInfo);
          }
        }
      } catch (error) {
        console.error('Error fetching seminar room:', error);
      }
    }
    
    if (!email || !firstName || !lastName || !registrationId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
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
    const getAfternoonTimeInfo = () => {
      if (!selectedRoom) return '13.00 - 16.30';
      
      const roomSchedule = scheduleData.filter(item => 
        item.room_id === selectedRoom.id && !item.is_morning
      );
      
      if (roomSchedule.length > 0) {
        const firstSession = roomSchedule[0];
        const startTime = firstSession.time_start?.substring(0, 5);
        const endTime = firstSession.time_end?.substring(0, 5);
        return startTime && endTime ? `${startTime} - ${endTime}` : '13.00 - 16.30';
      }
      
      return '13.00 - 16.30';
    };
    
    // Get attendance type label with actual time information
    const getAttendanceTypeLabel = () => {
      const morningTime = getMorningTimeInfo();
      const afternoonTime = getAfternoonTimeInfo();
      
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
    
    // Create modern email HTML content with gradient design based on notification type
    let emailTitle, emailSubHeader;
    
    if (notificationType === 'update') {
      emailTitle = locale === 'th' ? 'ข้อมูลการลงทะเบียนได้รับการอัปเดต' : 'Registration Information Updated';
      emailSubHeader = locale === 'th' 
        ? 'ข้อมูลการลงทะเบียนของท่านได้รับการอัปเดตในระบบแล้ว'
        : 'Your registration information has been updated in our system';
    } else {
      emailTitle = locale === 'th' ? 'การลงทะเบียนสำเร็จ' : 'Registration Successful';
      emailSubHeader = locale === 'th'
        ? 'ขอบคุณสำหรับการลงทะเบียนเข้าร่วมงาน CCI Climate Change Forum 2025'
        : 'Thank you for registering for the CCI Climate Change Forum 2025';
    }
    
    const emailHtml = `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${emailTitle}</title>
  <style type="text/css">
    /* Reset styles */
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
    
    /* Base styles */
    body {
      margin: 0 !important;
      padding: 0 !important;
      background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 25%, #f0f9ff 75%, #f1f5f9 100%);
      background-color: #f8fafc !important;
      font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif !important;
    }
    
    .email-container {
      max-width: 900px;
      margin: 0 auto;
      background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 25%, #f0f9ff 75%, #f1f5f9 100%);
      background-color: #f8fafc;
    }
    
    .header-section {
      text-align: center;
      padding: 40px 20px 20px;
    }
    
    .header-text {
      font-size: 32px;
      font-weight: bold;
      color: #1f2937;
      margin-bottom: 10px;
      line-height: 1.2;
    }
    
    .sub-header {
      font-size: 18px;
      color: #374151;
      margin-bottom: 30px;
      line-height: 1.4;
    }
    
    /* Modern ticket container */
    .ticket-container {
      background: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(10px);
      border-radius: 24px;
      overflow: hidden;
      margin: 20px;
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    /* Gradient header */
    .ticket-header {
      background: linear-gradient(135deg, #10b981 0%, #0d9488 25%, #0891b2 75%, #7c3aed 100%);
      background-color: #10b981;
      color: white;
      text-align: center;
      padding: 30px 25px;
      position: relative;
      overflow: hidden;
    }
    
    .ticket-header::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
      animation: shimmer 3s ease-in-out infinite alternate;
    }
    
    @keyframes shimmer {
      0% { opacity: 0.5; }
      100% { opacity: 0.8; }
    }
    
    .ticket-title {
      font-size: 28px;
      font-weight: bold;
      margin-bottom: 8px;
      position: relative;
      z-index: 2;
    }
    
    .ticket-date {
      font-size: 16px;
      margin-bottom: 8px;
      opacity: 0.95;
      position: relative;
      z-index: 2;
    }
    
    .ticket-venue {
      font-size: 14px;
      opacity: 0.9;
      position: relative;
      z-index: 2;
    }
    
    /* Main content table */
    .content-table {
      width: 100%;
      border-collapse: collapse;
    }
    
    /* Modern QR Section */
    .qr-section {
      width: 280px;
      background: linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 50%, #f0f9ff 100%);
      background-color: #f0fdf4;
      text-align: center;
      padding: 35px 25px;
      vertical-align: top;
      border-right: 2px dashed #10b981;
      position: relative;
    }
    
    .qr-section::before {
      content: '';
      position: absolute;
      top: 20px;
      right: 20px;
      width: 20px;
      height: 20px;
      background: linear-gradient(135deg, #10b981 0%, #0d9488 100%);
      background-color: #10b981;
      border-radius: 50%;
      opacity: 0.3;
    }
    
    .qr-code-box {
      background: white;
      padding: 20px;
      border-radius: 20px;
      display: inline-block;
      margin-bottom: 20px;
      border: 3px solid #10b981;
      box-shadow: 0 15px 30px rgba(16, 185, 129, 0.1);
    }
    
    .registration-badge {
      background: linear-gradient(135deg, #10b981 0%, #0d9488 100%);
      background-color: #10b981;
      color: white !important;
      padding: 12px 24px;
      border-radius: 30px;
      font-weight: bold;
      font-size: 16px;
      letter-spacing: 1px;
      margin: 15px 0;
      display: inline-block;
      box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3);
    }
    
    .qr-instruction {
      font-size: 14px;
      color: #059669;
      background: rgba(16, 185, 129, 0.1);
      backdrop-filter: blur(5px);
      padding: 18px;
      border-radius: 16px;
      border: 1px solid rgba(16, 185, 129, 0.2);
      line-height: 1.6;
      margin-top: 20px;
    }
    
    /* Modern Details Section */
    .details-section {
      padding: 40px;
      vertical-align: top;
      background: linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(248,250,252,0.8) 100%);
      background-color: rgba(255,255,255,0.7);
    }
    
    .participant-header {
      background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
      background-color: #f8fafc;
      border-radius: 16px;
      padding: 25px;
      margin-bottom: 30px;
      border: 1px solid rgba(148, 163, 184, 0.2);
    }
    
    .participant-name {
      font-size: 24px;
      font-weight: bold;
      color: #1f2937;
      margin-bottom: 8px;
    }
    
    .participant-email {
      font-size: 16px;
      color: #64748b;
    }
    
    /* Modern info items */
    .info-row {
      margin-bottom: 25px;
    }
    
    .info-label {
      font-size: 12px;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 10px;
      display: block;
      font-weight: 600;
    }
    
    .info-value {
      font-size: 16px;
      color: #1f2937;
      font-weight: 600;
      line-height: 1.5;
    }
    
    .attendance-badge {
      background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
      background-color: #7c3aed;
      color: white !important;
      padding: 10px 20px;
      border-radius: 25px;
      font-size: 14px;
      font-weight: bold;
      display: inline-block;
      box-shadow: 0 6px 20px rgba(124, 58, 237, 0.3);
    }
    
    .venue-box {
      background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
      background-color: #f0f9ff;
      padding: 20px;
      border-radius: 16px;
      border-left: 4px solid #0891b2;
      margin-top: 12px;
      box-shadow: 0 4px 15px rgba(8, 145, 178, 0.1);
    }
    
    /* Modern Footer */
    .ticket-footer {
      background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
      background-color: #f8fafc;
      padding: 35px 30px;
      text-align: center;
      border-top: 1px solid rgba(148, 163, 184, 0.2);
    }
    
    .footer-text {
      color: #64748b;
      font-size: 16px;
      margin-bottom: 25px;
      line-height: 1.6;
    }
    
    .modern-button {
      background: linear-gradient(135deg, #10b981 0%, #0d9488 100%) !important;
      background-color: #10b981 !important;
      color: white !important;
      text-decoration: none !important;
      padding: 18px 40px !important;
      border-radius: 50px !important;
      font-weight: bold !important;
      font-size: 16px !important;
      display: inline-block !important;
      box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3) !important;
      border: none !important;
      transition: all 0.3s ease !important;
    }
    
    .modern-button:hover {
      transform: translateY(-2px) !important;
      box-shadow: 0 15px 40px rgba(16, 185, 129, 0.4) !important;
    }
    
    .copyright {
      text-align: center;
      color: #94a3b8;
      font-size: 14px;
      padding: 30px;
      background: rgba(255, 255, 255, 0.5);
    }
    
    /* Decorative elements */
    .decoration-dot {
      width: 8px;
      height: 8px;
      background: linear-gradient(135deg, #10b981 0%, #0d9488 100%);
      background-color: #10b981;
      border-radius: 50%;
      display: inline-block;
      margin: 0 4px;
      opacity: 0.6;
    }
    
    /* Mobile responsive */
    @media only screen and (max-width: 600px) {
      .email-container {
        width: 100% !important;
      }
      
      .ticket-container {
        margin: 10px !important;
        border-radius: 16px !important;
      }
      
      .content-table {
        width: 100% !important;
      }
      
      .qr-section, .details-section {
        display: block !important;
        width: 100% !important;
        padding: 25px 20px !important;
      }
      
      .qr-section {
        border-right: none !important;
        border-bottom: 2px dashed #10b981 !important;
      }
      
      .participant-name {
        font-size: 22px !important;
      }
      
      .header-text {
        font-size: 28px !important;
      }
      
      .ticket-title {
        font-size: 24px !important;
      }
      
      .participant-header {
        padding: 20px !important;
      }
    }
  </style>
</head>
<body>
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 25%, #f0f9ff 75%, #f1f5f9 100%); background-color: #f8fafc;">
    <tr>
      <td align="center">
        <div class="email-container">
          <!-- Logo Header -->
          <div style="text-align: center; padding: 20px 0;">
            <a href="https://www.facebook.com/climatechange.fti/" target="_blank" style="display: inline-block;">
              <img src="https://cci.fti.or.th/fti-cci-logo-rgb.png" alt="FTI-CCI Logo" width="180" style="max-width: 100%; height: auto;">
            </a>
          </div>
          
          <!-- Modern Header -->
          <div class="header-section">
            <div class="header-text">
              ${notificationType === 'update' ? (locale === 'th' ? 'การอัปเดตการลงทะเบียน' : 'Registration Update') : (locale === 'th' ? 'การลงทะเบียนสำเร็จ' : 'Registration Successful')}
            </div>
            <div class="sub-header">
              ${notificationType === 'update' ? (locale === 'th' ? 'ข้อมูลการลงทะเบียนของคุณได้รับการอัปเดต' : 'Your registration information has been updated') : (locale === 'th' ? 'ขอบคุณสำหรับการลงทะเบียน งานสัมมนาการเปลี่ยนแปลงสภาพภูมิอากาศ' : 'Thank you for registering for the Climate Change Forum')}
              <br>
              <span class="decoration-dot"></span>
              <span class="decoration-dot"></span>
              <span class="decoration-dot"></span>
            </div>
          </div>
          
          <!-- Modern Ticket Container -->
          <div class="ticket-container">
            <!-- Gradient Header -->
            <div class="ticket-header">
              <div class="ticket-title">CCI Climate Change Forum 2025</div>
              <div class="ticket-date">${locale === 'th' ? 'วันที่ 15 กันยายน 2568' : 'September 15, 2025'}</div>
              <div class="ticket-venue">${locale === 'th' ? 'อาคารเอ็ม ทาวเวอร์ ชั้น 8 ถนนสุขุมวิท กรุงเทพฯ' : 'M Tower, 8th Floor, Sukhumvit Road, Bangkok'}</div>
            </div>
            
            <!-- Main Content -->
            <table class="content-table" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <!-- Modern QR Section -->
                <td class="qr-section">
                  <div class="qr-code-box">
                    <img src="https://api.qrserver.com/v1/create-qr-code/?data=${registrationId}&size=200x200&margin=10&color=000000&bgcolor=ffffff&format=png&ecc=H" alt="QR Code" width="180" height="180" style="display: block;">
                  </div>
                  
                  <div class="registration-badge">${registrationId}</div>
                  
                  <div class="qr-instruction">
                    <strong>${locale === 'th' ? '🎫 วิธีใช้งาน' : '🎫 How to Use'}</strong><br>
                    ${locale === 'th' ? 'กรุณาแสดง QR Code นี้เมื่อลงทะเบียนเข้างาน หรือบันทึกรูปไว้ในมือถือ' : 'Please show this QR Code when checking in, or save the image to your phone'}
                  </div>
                </td>
                
                <!-- Modern Details Section -->
                <td class="details-section">
                  <div class="participant-header">
                    <div class="participant-name">${firstName} ${lastName}</div>
                    <div class="participant-email">${email}</div>
                  </div>
                  
                  <!-- Info Grid -->
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td width="50%" style="padding-right: 15px; vertical-align: top;">
                        <div class="info-row">
                          <span class="info-label">${locale === 'th' ? 'ผู้เข้าร่วมงาน' : 'Participant'}</span>
                          <span class="info-value">${firstName} ${lastName}</span>
                        </div>
                      </td>
                      <td width="50%" style="padding-left: 15px; vertical-align: top;">
                        <div class="info-row">
                          <span class="info-label">${locale === 'th' ? 'กำหนดการเข้าร่วม' : 'Attendance Schedule'}</span>
                          <span class="attendance-badge">${getAttendanceTypeLabel()}</span>
                        </div>
                      </td>
                    </tr>
                    
                    ${attendanceType === 'morning' ? 
                      `<tr>
                        <td colspan="2" style="padding-top: 15px;">
                          <div class="info-row">
                            <span class="info-label">${locale === 'th' ? 'กิจกรรมช่วงเช้า' : 'Morning Activity'}</span>
                            <span class="info-value">${locale === 'th' 
                              ? `📋 ${morningScheduleData && morningScheduleData.length > 0 ? morningScheduleData[0].title_th : 'การบรรยายหลัก'} (ห้องประชุมใหญ่)` 
                              : `📋 ${morningScheduleData && morningScheduleData.length > 0 ? morningScheduleData[0].title_en : 'Main Conference'} (Main Hall)`}</span>
                          </div>
                        </td>
                      </tr>` : ''}
                    
                    ${(attendanceType === 'afternoon' || attendanceType === 'full_day') ? 
                      `<tr>
                        <td colspan="2" style="padding-top: 15px;">
                          <div class="info-row">
                            <span class="info-label">${locale === 'th' ? 'ห้องสัมมนาช่วงบ่าย' : 'Afternoon Seminar Room'}</span>
                            <span class="info-value">
                              ${roomInfo ? 
                                `🏛️ ${roomInfo.name} (${roomInfo.time} ${locale === 'th' ? 'น.' : ''})` : 
                                (locale === 'th' ? '🏢 กิจกรรมเชิงปฏิบัติการ' : '🏢 Workshop Session')}
                            </span>
                            ${roomInfo && roomInfo.description ? 
                              `<div style="margin-top: 8px; font-size: 14px; color: #555555; line-height: 1.5; padding: 10px; background-color: #f8f9fa; border-radius: 8px; border-left: 3px solid #10b981;">
                                ${roomInfo.description}
                              </div>` : ''}
                          </div>
                        </td>
                      </tr>` : ''}
                    
                    <tr>
                      <td colspan="2" style="padding-top: 20px;">
                        <div class="info-row">
                          <span class="info-label">${locale === 'th' ? 'สถานที่จัดงาน' : 'Event Venue'}</span>
                          <div class="venue-box">
                            <span class="info-value">
                              📍 ${locale === 'th' ? 'อาคารเอ็ม ทาวเวอร์ ชั้น 8<br>ถนนสุขุมวิท กรุงเทพมหานคร' : 'M Tower, 8th Floor<br>Sukhumvit Road, Bangkok'}
                            </span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            
            <!-- Modern Footer -->
            <div class="ticket-footer">
              <div class="footer-text">
                ${locale === 'th' ? '🌟 สามารถดูรายละเอียดเพิ่มเติม ดาวน์โหลด QR Code และแชร์ตั๋วของคุณได้ที่ลิงก์ด้านล่าง' : '🌟 You can view more details, download your QR Code, and share your ticket at the link below'}
              </div>
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 20px;">
                <tr>
                  <td align="center" style="padding: 0 10px;">
                    <a href="https://cci.fti.or.th/${locale}/ticket/${registrationId}" class="modern-button">
                      ${locale === 'th' ? '🎫 ดูตั๋วของฉัน' : '🎫 View My Ticket'}
                    </a>
                  </td>
                  <td align="center" style="padding: 0 10px;">
                    <a href="https://cci.fti.or.th/${locale}/map" class="modern-button" style="background: linear-gradient(135deg, #0891b2 0%, #0e7490 100%) !important; background-color: #0891b2 !important; box-shadow: 0 10px 30px rgba(8, 145, 178, 0.3) !important;">
                      ${locale === 'th' ? '🗺️ แผนที่และเส้นทาง' : '🗺️ Map & Directions'}
                    </a>
                  </td>
                </tr>
              </table>
            </div>
          </div>
          
          <div class="copyright">
            © 2025 CCI Climate Change Forum • ${locale === 'th' ? 'สงวนลิขสิทธิ์' : 'All rights reserved'} • 
            <span style="color: #10b981;">Made with 💚 for a sustainable future</span>
          </div>
          
          <!-- Banner Image at Bottom -->
          <div style="margin: 20px; text-align: center;">
            <a href="https://www.facebook.com/climatechange.fti/" target="_blank" style="display: block;">
              <img src="https://cci.fti.or.th/cci-forum-banner.png" alt="CCI Climate Change Forum 2025" width="600" style="max-width: 100%; height: auto; border-radius: 8px;">
            </a>
          </div>
        </div>
      </td>
    </tr>
  </table>
</body>
</html>
    `;
    
    // Prepare email data for MailerSend
    const emailData = {
      "from": {
        "email": "noreply@fti.or.th",
        "name": "CCI Climate Change Forum"
      },
      "to": [
        {
          "email": email,
          "name": `${firstName} ${lastName}`
        }
      ],
      "subject": notificationType === 'update'
        ? (locale === 'th' ? `🔔 ข้อมูลการลงทะเบียนได้รับการอัปเดต - CCI Climate Change Forum 2025` : `🔔 Registration Information Updated - CCI Climate Change Forum 2025`)
        : (locale === 'th' ? `🎫 การลงทะเบียนสำเร็จ - CCI Climate Change Forum 2025` : `🎫 Registration Successful - CCI Climate Change Forum 2025`),
      "html": emailHtml
    };
    
    // Send email using MailerSend API with fallback API key
    const apiKey = process.env.MAILERSEND_API_KEY || 'mlsn.066f0b449e1e2228390af429d55c6ca24609ec72e2eb314762a635094a5ba4dd';
    
    const response = await fetch('https://api.mailersend.com/v1/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(emailData)
    });
    
    // Handle response safely
    let responseData = {};
    try {
      const text = await response.text();
      responseData = text ? JSON.parse(text) : {};
    } catch (error) {
      console.error('Error parsing response:', error);
    }
    
    if (response.ok) {
      return NextResponse.json({ success: true });
    } else {
      console.error('Email API error:', responseData);
      return NextResponse.json(
        { error: 'Failed to send email', details: responseData },
        { status: 500 }
      );
    }
    
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}