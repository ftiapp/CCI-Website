import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';

export async function GET(request) {
  try {
    // Get filter parameters
    const { searchParams } = new URL(request.url);
    const provinceFilter = searchParams.get('province') || 'all';
    const transportFilter = searchParams.get('transport') || 'all';
    const checkInFilter = searchParams.get('checkin') || 'all';
    
    // Build base WHERE clause for filters
    let whereClause = '';
    const params = [];
    
    if (provinceFilter !== 'all') {
      if (provinceFilter === 'bangkok') {
        whereClause += ' AND r.location_type = ?';
        params.push('bangkok');
      } else {
        whereClause += ' AND r.province_id = ?';
        params.push(parseInt(provinceFilter));
      }
    }
    
    if (transportFilter !== 'all') {
      if (transportFilter === 'public') {
        whereClause += ' AND t.transport_type = ? AND (t.public_transport_id IS NOT NULL)';
        params.push('public');
      } else if (transportFilter === 'walking') {
        whereClause += ' AND t.transport_type = ?';
        params.push('walking');
      } else if (transportFilter === 'private') {
        whereClause += ' AND t.transport_type = ?';
        params.push('private');
      }
    }
    
    if (checkInFilter !== 'all') {
      if (checkInFilter === 'checked_in') {
        whereClause += ' AND r.check_in_status = ?';
        params.push(1);
      } else if (checkInFilter === 'not_checked_in') {
        whereClause += ' AND r.check_in_status = ?';
        params.push(0);
      } else if (checkInFilter === 'not_attending') {
        whereClause += ' AND r.check_in_status = ?';
        params.push(2);
      }
    }
    
    // Get total registrations
    const totalRegistrationsResult = await executeQuery(
      `SELECT COUNT(*) as count FROM CCI_registrants r
       LEFT JOIN CCI_transportation t ON r.id = t.registrant_id
       WHERE 1=1 ${whereClause}`,
      params
    );
    const totalRegistrations = totalRegistrationsResult[0].count;
    
    // Get total checked in
    const totalCheckedInResult = await executeQuery(
      `SELECT COUNT(*) as count FROM CCI_registrants r
       LEFT JOIN CCI_transportation t ON r.id = t.registrant_id
       WHERE check_in_status = 1 ${whereClause}`,
      [...params]
    );
    const totalCheckedIn = totalCheckedInResult[0].count;
    
    // Get attendance by type
    const morningAttendeesResult = await executeQuery(
      `SELECT COUNT(*) as count FROM CCI_registrants r 
       LEFT JOIN CCI_transportation t ON r.id = t.registrant_id
       WHERE (attendance_type = 'morning' OR attendance_type = 'full_day') ${whereClause}`,
      [...params]
    );
    const morningAttendees = morningAttendeesResult[0].count;
    
    const afternoonAttendeesResult = await executeQuery(
      `SELECT COUNT(*) as count FROM CCI_registrants r 
       LEFT JOIN CCI_transportation t ON r.id = t.registrant_id
       WHERE (attendance_type = 'afternoon' OR attendance_type = 'full_day') ${whereClause}`,
      [...params]
    );
    const afternoonAttendees = afternoonAttendeesResult[0].count;
    
    const fullDayAttendeesResult = await executeQuery(
      `SELECT COUNT(*) as count FROM CCI_registrants r 
       LEFT JOIN CCI_transportation t ON r.id = t.registrant_id
       WHERE attendance_type = 'full_day' ${whereClause}`,
      [...params]
    );
    const fullDayAttendees = fullDayAttendeesResult[0].count;
    
    // Get room distribution
    const roomDistribution = await executeQuery(
      `SELECT sr.id, sr.name_th, sr.name_en, COUNT(r.id) as count
       FROM CCI_seminar_rooms sr
       LEFT JOIN CCI_registrants r ON sr.id = r.selected_room_id
       LEFT JOIN CCI_transportation t ON r.id = t.registrant_id
       ${whereClause ? `WHERE ${whereClause.substring(4)}` : ''}
       GROUP BY sr.id
       ORDER BY count DESC`,
      whereClause ? params : []
    );
    
    // Get province distribution
    const provinceDistribution = await executeQuery(
      `SELECT 
         CASE 
           WHEN r.location_type = 'bangkok' THEN 'bangkok'
           ELSE p.id
         END as id,
         CASE 
           WHEN r.location_type = 'bangkok' THEN 'กรุงเทพมหานคร'
           ELSE p.name_th
         END as name_th,
         CASE 
           WHEN r.location_type = 'bangkok' THEN 'Bangkok'
           ELSE p.name_en
         END as name_en,
         COUNT(r.id) as count
       FROM CCI_registrants r
       LEFT JOIN CCI_provinces p ON r.province_id = p.id
       LEFT JOIN CCI_transportation t ON r.id = t.registrant_id
       WHERE 1=1 ${whereClause}
       GROUP BY 
         CASE 
           WHEN r.location_type = 'bangkok' THEN 'bangkok'
           ELSE p.id
         END,
         CASE 
           WHEN r.location_type = 'bangkok' THEN 'กรุงเทพมหานคร'
           ELSE p.name_th
         END,
         CASE 
           WHEN r.location_type = 'bangkok' THEN 'Bangkok'
           ELSE p.name_en
         END
       ORDER BY count DESC`,
      [...params]
    );
    
    // Get transportation distribution
    const transportationDistribution = await executeQuery(
      `SELECT 
         CASE 
           WHEN t.transport_type = 'walking' THEN 'walking'
           WHEN t.transport_type = 'public' THEN 'public'
           WHEN t.transport_type = 'private' THEN 'private'
           ELSE 'other'
         END as type,
         COUNT(r.id) as count
       FROM CCI_registrants r
       LEFT JOIN CCI_transportation t ON r.id = t.registrant_id
       WHERE 1=1 ${whereClause}
       GROUP BY 
         CASE 
           WHEN t.transport_type = 'walking' THEN 'walking'
           WHEN t.transport_type = 'public' THEN 'public'
           WHEN t.transport_type = 'private' THEN 'private'
           ELSE 'other'
         END
       ORDER BY count DESC`,
      [...params]
    );
    
    // Get all provinces for filter
    const provinces = await executeQuery(
      'SELECT id, name_th, name_en FROM CCI_provinces ORDER BY name_th'
    );
    
    return NextResponse.json({
      success: true,
      stats: {
        totalRegistrations,
        totalCheckedIn,
        morningAttendees,
        afternoonAttendees,
        fullDayAttendees,
        roomDistribution,
        provinceDistribution,
        transportationDistribution
      },
      provinces
    });
    
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
