'use server';

import { NextResponse } from 'next/server';
import { getSchedule } from '@/lib/db';

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
      locale 
    } = data;
    
    // Fetch schedule data to get accurate times
    const scheduleData = await getSchedule();
    
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
    
    // Create email HTML content with table-based layout for email clients
    const emailHtml = `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${locale === 'th' ? 'การลงทะเบียนสำเร็จ' : 'Registration Successful'}</title>
  <style type="text/css">
    /* Reset styles */
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
    
    /* Base styles */
    body {
      margin: 0 !important;
      padding: 0 !important;
      background-color: #f5f7fa !important;
      font-family: 'Tahoma', Arial, sans-serif !important;
    }
    
    .email-container {
      max-width: 900px;
      margin: 0 auto;
      background-color: #f5f7fa;
    }
    
    .header-text {
      font-size: 28px;
      font-weight: bold;
      color: #8D7B68;
      text-align: center;
      padding: 20px;
    }
    
    .sub-header {
      font-size: 16px;
      color: #666;
      text-align: center;
      padding-bottom: 20px;
    }
    
    /* Ticket container */
    .ticket-container {
      background-color: #ffffff;
      border-radius: 20px;
      overflow: hidden;
      margin: 20px;
      box-shadow: 0 15px 35px rgba(0,0,0,0.1);
    }
    
    /* Ticket header */
    .ticket-header {
      background: linear-gradient(135deg, #8D7B68 0%, #A68B5B 100%);
      background-color: #8D7B68; /* Fallback */
      color: white;
      text-align: center;
      padding: 25px;
    }
    
    .ticket-title {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 5px;
    }
    
    .ticket-date {
      font-size: 16px;
      margin-bottom: 5px;
    }
    
    .ticket-venue {
      font-size: 14px;
      opacity: 0.9;
    }
    
    /* Main content table */
    .content-table {
      width: 100%;
      border-collapse: collapse;
    }
    
    /* QR Section */
    .qr-section {
      width: 280px;
      background-color: #F8F1E9;
      text-align: center;
      padding: 30px 20px;
      vertical-align: top;
      border-right: 2px dashed #ddd;
    }
    
    .qr-code-box {
      background-color: white;
      padding: 15px;
      border-radius: 15px;
      display: inline-block;
      margin-bottom: 15px;
      border: 3px solid #8D7B68;
    }
    
    .registration-badge {
      background: linear-gradient(135deg, #8D7B68 0%, #A68B5B 100%);
      background-color: #8D7B68; /* Fallback */
      color: white;
      padding: 10px 20px;
      border-radius: 25px;
      font-weight: bold;
      font-size: 14px;
      letter-spacing: 1.5px;
      margin: 10px 0;
      display: inline-block;
    }
    
    .qr-instruction {
      font-size: 13px;
      color: #8D7B68;
      background-color: rgba(141, 123, 104, 0.1);
      padding: 15px;
      border-radius: 12px;
      border: 1px solid rgba(141, 123, 104, 0.2);
      line-height: 1.5;
      margin-top: 15px;
    }
    
    /* Details Section */
    .details-section {
      padding: 35px 40px;
      vertical-align: top;
    }
    
    .participant-header {
      border-bottom: 2px solid #f0f0f0;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    
    .participant-name {
      font-size: 22px;
      font-weight: bold;
      color: #8D7B68;
      margin-bottom: 5px;
    }
    
    .participant-email {
      font-size: 14px;
      color: #666;
    }
    
    /* Info items */
    .info-row {
      margin-bottom: 20px;
    }
    
    .info-label {
      font-size: 13px;
      color: #888;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 8px;
      display: block;
    }
    
    .info-value {
      font-size: 15px;
      color: #333;
      font-weight: bold;
      line-height: 1.4;
    }
    
    .attendance-badge {
      background: linear-gradient(135deg, #8D7B68 0%, #A68B5B 100%);
      background-color: #8D7B68; /* Fallback */
      color: white;
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 13px;
      font-weight: bold;
      display: inline-block;
    }
    
    .venue-box {
      background-color: #f8f9fa;
      padding: 15px;
      border-radius: 10px;
      border-left: 4px solid #8D7B68;
      margin-top: 8px;
    }
    
    /* Footer */
    .ticket-footer {
      background-color: #f9f9f9;
      padding: 25px;
      text-align: center;
      border-top: 1px solid #e8e8e8;
    }
    
    .footer-text {
      color: #666;
      font-size: 14px;
      margin-bottom: 20px;
      line-height: 1.5;
    }
    
    .button {
      background: linear-gradient(135deg, #8D7B68 0%, #A68B5B 100%);
      background-color: #8D7B68; /* Fallback */
      color: white !important;
      text-decoration: none;
      padding: 15px 30px;
      border-radius: 30px;
      font-weight: bold;
      font-size: 14px;
      display: inline-block;
    }
    
    .copyright {
      text-align: center;
      color: #999;
      font-size: 12px;
      padding: 20px;
    }
    
    /* Mobile responsive */
    @media only screen and (max-width: 600px) {
      .email-container {
        width: 100% !important;
      }
      
      .ticket-container {
        margin: 10px !important;
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
        border-bottom: 2px dashed #ddd !important;
      }
      
      .participant-name {
        font-size: 20px !important;
      }
      
      .header-text {
        font-size: 24px !important;
      }
      
      .ticket-title {
        font-size: 20px !important;
      }
    }
  </style>
</head>
<body>
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f5f7fa;">
    <tr>
      <td align="center">
        <div class="email-container">
          <!-- Header -->
          <div class="header-text">${locale === 'th' ? 'การลงทะเบียนสำเร็จ' : 'Registration Successful'}</div>
          <div class="sub-header">${locale === 'th' ? 'ขอบคุณสำหรับการลงทะเบียน' : 'Thank you for registering'}</div>
          
          <!-- Ticket Container -->
          <div class="ticket-container">
            <!-- Ticket Header -->
            <div class="ticket-header">
              <div class="ticket-title">CCI Climate Change Forum 2025</div>
              <div class="ticket-date">${locale === 'th' ? 'วันที่ 15 กันยายน 2568' : 'September 15, 2025'}</div>
              <div class="ticket-venue">${locale === 'th' ? 'อาคารเอ็ม ทาวเวอร์ ชั้น 8 ถนนสุขุมวิท กรุงเทพฯ' : 'M Gower Building, 8th Floor, Sukhumvit Road, Bangkok'}</div>
            </div>
            
            <!-- Main Content -->
            <table class="content-table" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <!-- QR Section -->
                <td class="qr-section">
                  <div class="qr-code-box">
                    <img src="https://api.qrserver.com/v1/create-qr-code/?data=${registrationId}&size=160x160&margin=10" alt="QR Code" width="160" height="160" style="display: block;">
                  </div>
                  
                  <div class="registration-badge">${registrationId}</div>
                  
                  <div class="qr-instruction">
                    ${locale === 'th' ? 'กรุณาแสดง QR Code นี้เมื่อลงทะเบียนเข้างาน' : 'Please show this QR Code when checking in'}
                  </div>
                </td>
                
                <!-- Details Section -->
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
                          <span class="info-label">${locale === 'th' ? 'กำหนดการ' : 'Schedule'}</span>
                          <span class="attendance-badge">${getAttendanceTypeLabel()}</span>
                        </div>
                      </td>
                    </tr>
                    
                    ${attendanceType === 'morning' ? 
                      `<tr>
                        <td colspan="2" style="padding-top: 10px;">
                          <div class="info-row">
                            <span class="info-label">${locale === 'th' ? 'กิจกรรม' : 'Activity'}</span>
                            <span class="info-value">${locale === 'th' ? 'การบรรยายหลัก (ห้องประชุมใหญ่)' : 'Main Conference (Main Hall)'}</span>
                          </div>
                        </td>
                      </tr>` : ''}
                    
                    ${(attendanceType === 'afternoon' || attendanceType === 'full_day') && selectedRoom ? 
                      `<tr>
                        <td colspan="2" style="padding-top: 10px;">
                          <div class="info-row">
                            <span class="info-label">${locale === 'th' ? 'ห้องสัมมนา' : 'Seminar Room'}</span>
                            <span class="info-value">${locale === 'th' ? selectedRoom.name_th : selectedRoom.name_en}</span>
                            ${selectedRoom.description_th || selectedRoom.description_en ? 
                              `<div style="margin-top: 5px; font-size: 13px; color: #666;">
                                ${locale === 'th' ? selectedRoom.description_th : selectedRoom.description_en}
                              </div>` : ''}
                          </div>
                        </td>
                      </tr>` : ''}
                    
                    <tr>
                      <td colspan="2" style="padding-top: 20px;">
                        <div class="info-row">
                          <span class="info-label">${locale === 'th' ? 'สถานที่' : 'Venue'}</span>
                          <div class="venue-box">
                            <span class="info-value">
                              ${locale === 'th' ? 'อาคารเอ็ม ทาวเวอร์ ชั้น 8<br>ถนนสุขุมวิท กรุงเทพฯ' : 'M Gower Building, 8th Floor<br>Sukhumvit Road, Bangkok'}
                            </span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            
            <!-- Footer -->
            <div class="ticket-footer">
              <div class="footer-text">
                ${locale === 'th' ? 'สามารถดูรายละเอียดเพิ่มเติมและดาวน์โหลด QR Code ได้ที่ลิงก์ด้านล่าง' : 'You can view more details and download your QR Code at the link below'}
              </div>
              <a href="https://cci.fti.or.th/${locale}/ticket/${registrationId}" class="button">
                ${locale === 'th' ? 'ดูรายละเอียดเพิ่มเติม' : 'View Details'}
              </a>
            </div>
          </div>
          
          <div class="copyright">
            © 2025 CCI Climate Change Forum. ${locale === 'th' ? 'สงวนลิขสิทธิ์' : 'All rights reserved.'}
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
      "subject": locale === 'th' 
        ? `การลงทะเบียนสำเร็จ - CCI Climate Change Forum 2025`
        : `Registration Successful - CCI Climate Change Forum 2025`,
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