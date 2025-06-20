import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';

export async function GET(request) {
  try {
    // Get pagination and filter parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const provinceFilter = searchParams.get('province') || 'all';
    const statusFilter = searchParams.get('status') || 'all';
    
    // Calculate offset
    const offset = (page - 1) * limit;
    
    // Build WHERE clause for filters
    let whereClause = '1=1';
    const params = [];
    
    // Search filter
    if (search) {
      whereClause += ' AND (r.first_name LIKE ? OR r.last_name LIKE ? OR r.uuid LIKE ? OR r.email LIKE ? OR r.phone LIKE ?)';
      const searchParam = `%${search}%`;
      params.push(searchParam, searchParam, searchParam, searchParam, searchParam);
    }
    
    // Province filter
    if (provinceFilter !== 'all') {
      if (provinceFilter === 'bangkok') {
        whereClause += ' AND r.location_type = ?';
        params.push('bangkok');
      } else {
        whereClause += ' AND r.province_id = ?';
        params.push(parseInt(provinceFilter));
      }
    }
    
    // Status filter
    if (statusFilter !== 'all') {
      whereClause += ' AND r.check_in_status = ?';
      params.push(parseInt(statusFilter));
    }
    
    // Get total count
    const countResult = await executeQuery(
      `SELECT COUNT(*) as total FROM CCI_registrants r WHERE ${whereClause}`,
      params
    );
    const total = countResult[0].total;
    
    // Get participants with pagination
    // Ensure limit and offset are numbers
    const limitNum = Number(limit);
    const offsetNum = Number(offset);
    
    const participants = await executeQuery(
      `SELECT r.*, 
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
      WHERE ${whereClause}
      ORDER BY r.registration_date DESC
      LIMIT ${limitNum} OFFSET ${offsetNum}`,
      [...params]
    );
    
    // Get all provinces for filter
    const provinces = await executeQuery(
      'SELECT id, name_th, name_en FROM CCI_provinces ORDER BY name_th'
    );
    
    return NextResponse.json({
      success: true,
      participants,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      },
      provinces
    });
    
  } catch (error) {
    console.error('Error fetching participants:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
