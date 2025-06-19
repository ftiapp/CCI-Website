'use server';

import { NextResponse } from 'next/server';

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
    
    if (!email || !firstName || !lastName || !registrationId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Get attendance type label
    const getAttendanceTypeLabel = () => {
      switch (attendanceType) {
        case 'morning':
          return locale === 'th' ? 'ช่วงเช้า (08.30 - 12.00 น.)' : 'Morning (08.30 - 12.00)';
        case 'afternoon':
          return locale === 'th' ? 'ช่วงบ่าย (13.00 - 16.30 น.)' : 'Afternoon (13.00 - 16.30)';
        case 'full_day':
          return locale === 'th' ? 'เต็มวัน (08.30 - 16.30 น.)' : 'Full Day (08.30 - 16.30)';
        default:
          return '';
      }
    };
    
    // Create room info text if applicable
    let roomInfo = '';
    if ((attendanceType === 'afternoon' || attendanceType === 'full_day') && selectedRoom) {
      const roomDescription = locale === 'th' ? selectedRoom.description_th : selectedRoom.description_en;
      
      roomInfo = locale === 'th' 
        ? `<div class="info-item">
            <span class="label">ห้องสัมมนา:</span>
            <span class="value">${selectedRoom.name_th}</span>
          </div>
          <div class="info-item">
            <span class="label">เวลา:</span>
            <span class="value">13.00 - 16.30 น.</span>
          </div>
          ${roomDescription ? `<div class="info-item">
            <span class="label">รายละเอียด:</span>
            <span class="value">${roomDescription}</span>
          </div>` : ''}`
        : `<div class="info-item">
            <span class="label">Seminar Room:</span>
            <span class="value">${selectedRoom.name_en}</span>
          </div>
          <div class="info-item">
            <span class="label">Time:</span>
            <span class="value">13.00 - 16.30</span>
          </div>
          ${roomDescription ? `<div class="info-item">
            <span class="label">Description:</span>
            <span class="value">${roomDescription}</span>
          </div>` : ''}`;
    }
    
    // Create email HTML content with classic ticket style
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${locale === 'th' ? 'การลงทะเบียนสำเร็จ' : 'Registration Successful'}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Prompt:wght@400;500;600;700&display=swap');
          body {
            font-family: 'Prompt', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            text-align: center;
            padding: 20px 0;
          }
          .ticket {
            background: #fff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            margin-bottom: 20px;
          }
          .ticket-header {
            background-color: #8D7B68;
            color: white;
            padding: 15px;
            text-align: center;
          }
          .ticket-body {
            padding: 20px;
            border-bottom: 2px dashed #ddd;
          }
          .ticket-footer {
            padding: 15px 20px;
            background-color: #f9f9f9;
            text-align: center;
          }
          .qr-section {
            background-color: #F8F1E9;
            padding: 20px;
            text-align: center;
            border-bottom: 2px dashed #ddd;
          }
          .qr-code {
            display: inline-block;
            padding: 10px;
            background: white;
            border-radius: 5px;
          }
          .button {
            display: inline-block;
            background-color: #8D7B68;
            color: white;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 5px;
            margin-top: 15px;
          }
          .info-item {
            margin-bottom: 10px;
          }
          .label {
            font-weight: 500;
            color: #666;
          }
          .value {
            font-weight: 600;
            color: #333;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="color: #8D7B68; margin-bottom: 5px;">${locale === 'th' ? 'การลงทะเบียนสำเร็จ' : 'Registration Successful'}</h1>
            <p>${locale === 'th' ? 'ขอบคุณสำหรับการลงทะเบียน' : 'Thank you for registering'}</p>
          </div>
          
          <div class="ticket">
            <div class="ticket-header">
              <h2 style="margin: 0;">CCI Climate Change Forum 2025</h2>
              <p style="margin: 5px 0;">${locale === 'th' ? 'วันที่ 15 กันยายน 2568' : 'September 15, 2025'}</p>
            </div>
            
            <div class="ticket-body">
              <div class="info-item">
                <span class="label">${locale === 'th' ? 'ชื่อ-นามสกุล:' : 'Name:'}</span>
                <span class="value">${firstName} ${lastName}</span>
              </div>
              
              <div class="info-item">
                <span class="label">${locale === 'th' ? 'อีเมล:' : 'Email:'}</span>
                <span class="value">${email}</span>
              </div>
              
              <div class="info-item">
                <span class="label">${locale === 'th' ? 'รหัสลงทะเบียน:' : 'Registration ID:'}</span>
                <span class="value">${registrationId}</span>
              </div>
              
              <div class="info-item">
                <span class="label">${locale === 'th' ? 'ช่วงเวลาเข้าร่วม:' : 'Attendance:'}</span>
                <span class="value">${getAttendanceTypeLabel()}</span>
              </div>
              
              ${attendanceType === 'morning' ? 
                `<div class="info-item">
                  <span class="label">${locale === 'th' ? 'กิจกรรม:' : 'Activity:'}</span>
                  <span class="value">${locale === 'th' ? 'การบรรยายหลัก (ห้องประชุมใหญ่)' : 'Main Conference (Main Hall)'}</span>
                </div>
                <div class="info-item">
                  <span class="label">${locale === 'th' ? 'เวลา:' : 'Time:'}</span>
                  <span class="value">${locale === 'th' ? '08.30 - 12.00 น.' : '08.30 - 12.00'}</span>
                </div>` : ''}
              
              ${roomInfo}
            </div>
            
            <div class="qr-section">
              <p>${locale === 'th' ? 'กรุณาแสดง QR Code นี้เมื่อลงทะเบียนเข้างาน' : 'Please show this QR Code when checking in at the event'}</p>
              <div class="qr-code">
                <img src="https://api.qrserver.com/v1/create-qr-code/?data=${registrationId}&size=150x150" alt="QR Code" width="150" height="150">
              </div>
            </div>
            
            <div class="ticket-footer">
              <p>${locale === 'th' ? 'สามารถดูรายละเอียดเพิ่มเติมและดาวน์โหลด QR Code ได้ที่ลิงก์ด้านล่าง' : 'You can view more details and download your QR Code at the link below'}</p>
              <a href="https://cci.fti.or.th/${locale}/ticket/${registrationId}" class="button">
                ${locale === 'th' ? 'ดูรายละเอียด' : 'View Details'}
              </a>
            </div>
          </div>
          
          <div style="text-align: center; color: #666; font-size: 12px; margin-top: 20px;">
            <p>© 2025 CCI Climate Change Forum. ${locale === 'th' ? 'สงวนลิขสิทธิ์' : 'All rights reserved.'}</p>
          </div>
        </div>
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
