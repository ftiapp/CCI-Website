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
    
    // Get updated participant data
    const participants = await executeQuery(
      `SELECT r.*, 
        ot.name_th as organization_type_th, ot.name_en as organization_type_en,
        tt.name_th as transportation_type_th, tt.name_en as transportation_type_en,
        sr.name_th as room_name_th, sr.name_en as room_name_en
      FROM CCI_registrants r
      LEFT JOIN CCI_organization_types ot ON r.organization_type_id = ot.id
      LEFT JOIN CCI_transportation_types tt ON r.transportation_type_id = tt.id
      LEFT JOIN CCI_seminar_rooms sr ON r.selected_room_id = sr.id
      WHERE r.id = ?`,
      [data.registrationId]
    );
    
    if (participants.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Participant not found after update' },
        { status: 404 }
      );
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
