import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.registrationId) {
      return NextResponse.json(
        { success: false, error: 'Registration ID is required' },
        { status: 400 }
      );
    }
    
    if (data.checkInStatus === undefined || data.checkInStatus === null) {
      return NextResponse.json(
        { success: false, error: 'Check-in status is required' },
        { status: 400 }
      );
    }
    
    // Ensure check-in status is valid (0, 1, or 2)
    const checkInStatus = parseInt(data.checkInStatus);
    if (![0, 1, 2].includes(checkInStatus)) {
      return NextResponse.json(
        { success: false, error: 'Invalid check-in status. Must be 0, 1, or 2' },
        { status: 400 }
      );
    }
    
    // Update check-in status
    await executeQuery(
      'UPDATE CCI_registrants SET check_in_status = ? WHERE id = ?',
      [checkInStatus, data.registrationId]
    );
    
    // Get updated participant data with detailed transport information
    const participants = await executeQuery(
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
      [data.registrationId]
    );
    
    // Log transport data for debugging
    if (participants && participants.length > 0) {
      console.log('Participant transport data:', {
        id: participants[0].id,
        transport_type: participants[0].transport_type
      });
    }
    
    if (participants.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Participant not found after update' },
        { status: 404 }
      );
    }
    
    // ส่ง SMS ขอบคุณหลังจากเช็คอิน ถ้าสถานะเป็น 1 (checked-in)
    if (checkInStatus === 1) {
      try {
        const participant = participants[0];
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        const scheduleUrl = `${baseUrl}/schedule`;
        
        // ส่ง SMS ขอบคุณโดยใช้ API endpoint ใหม่
        await fetch(`${baseUrl}/api/send-thank-you-sms`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            phone: participant.phone,
            firstName: participant.first_name,
            lastName: participant.last_name,
            scheduleUrl: scheduleUrl
          }),
        }).catch(error => {
          console.error('Error sending thank you SMS:', error);
        });
      } catch (error) {
        console.error('Error preparing thank you SMS:', error);
      }
    }
    
    return NextResponse.json({
      success: true,
      message: 'Check-in status updated successfully',
      participant: participants[0]
    });
    
  } catch (error) {
    console.error('Error updating check-in status:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
