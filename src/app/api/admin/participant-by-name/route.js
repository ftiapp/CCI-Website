import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';

export async function GET(request) {
  try {
    // Get name from query parameters
    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name');
    
    if (!name || name.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Name is required' },
        { status: 400 }
      );
    }
    
    // Split name into parts for more flexible search
    const nameParts = name.trim().split(/\s+/);
    
    // Build query based on name parts
    let query = `
      SELECT r.*, 
        ot.name_th as organization_type_th, ot.name_en as organization_type_en,
        tt.name_th as transportation_type_th, tt.name_en as transportation_type_en,
        sr.name_th as room_name_th, sr.name_en as room_name_en,
        bd.name_th as bangkok_district_name_th, bd.name_en as bangkok_district_name_en,
        p.name_th as province_name_th, p.name_en as province_name_en
      FROM CCI_registrants r
      LEFT JOIN CCI_organization_types ot ON r.organization_type_id = ot.id
      LEFT JOIN CCI_transportation_types tt ON r.transportation_type_id = tt.id
      LEFT JOIN CCI_seminar_rooms sr ON r.selected_room_id = sr.id
      LEFT JOIN CCI_bangkok_districts bd ON r.bangkok_district_id = bd.id
      LEFT JOIN CCI_provinces p ON r.province_id = p.id
      WHERE 
    `;
    
    // Create conditions for each name part
    const conditions = [];
    const params = [];
    
    nameParts.forEach(part => {
      conditions.push(`(r.first_name LIKE ? OR r.last_name LIKE ?)`);
      params.push(`%${part}%`, `%${part}%`);
    });
    
    // If there's only one name part, also search for exact matches
    if (nameParts.length === 1) {
      conditions.push(`(r.first_name = ? OR r.last_name = ?)`);
      params.push(nameParts[0], nameParts[0]);
    }
    
    // If there are two or more name parts, try to match first and last name
    if (nameParts.length >= 2) {
      conditions.push(`(r.first_name LIKE ? AND r.last_name LIKE ?)`);
      params.push(`%${nameParts[0]}%`, `%${nameParts[1]}%`);
    }
    
    // Combine conditions with OR
    query += conditions.join(' OR ');
    
    // Limit results to prevent too many matches
    query += ' LIMIT 10';
    
    // Execute query
    const participants = await executeQuery(query, params);
    
    if (participants.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No participants found matching the name' },
        { status: 404 }
      );
    }
    
    // If only one participant is found, return it directly
    if (participants.length === 1) {
      return NextResponse.json({
        success: true,
        participant: participants[0]
      });
    }
    
    // If multiple participants are found, return the list
    return NextResponse.json({
      success: true,
      participants: participants
    });
    
  } catch (error) {
    console.error('Error fetching participant by name:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
