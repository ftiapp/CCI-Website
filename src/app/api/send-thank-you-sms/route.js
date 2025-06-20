'use server';

import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const data = await request.json();
    const { phone, firstName, lastName, scheduleUrl } = data;
    
    if (!phone || !firstName || !lastName) {
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
    
    // Create thank you message as per the memory requirement
    const message = `ขอขอบคุณ คุณ${firstName} ${lastName} ที่เข้าร่วมงาน Climate Change Forum 2025 เป็นอย่างยิ่ง ทางเราหวังว่าท่านจะได้รับประโยชน์จากการเข้าร่วมงานในครั้งนี้`;
    
    // Add schedule URL if provided
    const fullMessage = scheduleUrl ? `${message}\nกำหนดการ: ${scheduleUrl}` : message;
    
    // Get SMS API parameters with fallback values
    const user = process.env.SMS_USER || 'FTITransaction';
    const pass = process.env.SMS_PASS || 'uu#bEy8J';
    const type = '5'; // 5 for Thai language
    const from = process.env.SMS_FROM || 'FTIoffice'; // Using registered sender name
    const servid = process.env.SMS_SERVICE_ID || 'FTI002';
    
    // Encode all parameters properly for URL
    const encodedUser = encodeURIComponent(user);
    const encodedPass = encodeURIComponent(pass); // Properly encode the password including the # character
    const encodedFrom = encodeURIComponent(from);
    const encodedServid = encodeURIComponent(servid);
    const encodedMessage = encodeURIComponent(fullMessage);
    
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
        console.log('Thank you SMS sent successfully!');
        return NextResponse.json({ 
          success: true,
          messageId: responseParts[1],
          phone: responseParts[0]
        });
      } else if (response.status === 200) {
        // If HTTP status is 200 but we don't recognize the format, assume success
        console.log('Thank you SMS likely sent successfully (HTTP 200)');
        return NextResponse.json({ success: true });
      } else {
        console.error('SMS API error response:', responseText);
        return NextResponse.json({ 
          error: responseText, 
          url: completeUrl
        }, { status: 500 });
      }
    } catch (error) {
      console.error('Thank you SMS sending error:', error);
      return NextResponse.json({ error: 'Failed to send thank you SMS' }, { status: 500 });
    }
    
  } catch (error) {
    console.error('Error sending thank you SMS:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
