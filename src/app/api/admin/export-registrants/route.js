import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';
import * as XLSX from 'xlsx';

export async function GET(request) {
  try {
    // Get filter parameters
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const provinceFilter = searchParams.get('province') || 'all';
    const statusFilterRaw = searchParams.get('status') || 'all';
    const roomFilterRaw = searchParams.get('room') || 'all';
    
    // Normalize filters
    const statusFilter = statusFilterRaw !== 'all' && !Number.isNaN(parseInt(statusFilterRaw))
      ? String(parseInt(statusFilterRaw))
      : 'all';
    const roomFilter = roomFilterRaw !== 'all' && !Number.isNaN(parseInt(roomFilterRaw))
      ? String(parseInt(roomFilterRaw))
      : 'all';
    
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
    
    // Room filter
    if (roomFilter !== 'all') {
      whereClause += ' AND r.selected_room_id = ?';
      params.push(parseInt(roomFilter));
    }
    
    // Get all registrants with their related data
    const registrants = await executeQuery(
      `SELECT r.id, r.uuid, r.first_name, r.last_name, r.email, r.phone, 
        r.organization_name, 
        ot.name_th as organization_type,
        r.organization_type_other,
        t.transport_type as transportation_category,
        CASE
          WHEN t.transport_type = 'public' THEN 'ขนส่งสาธารณะ'
          WHEN t.transport_type = 'private' THEN 'พาหนะส่วนตัว'
          WHEN t.transport_type = 'walking' THEN 'เดินทางด้วยการเดิน'
          ELSE 'ไม่ระบุ'
        END as transportation_category_text,
        pt.name_th as public_transport_type,
        t.public_transport_other,
        pv.name_th as private_vehicle_type,
        t.private_vehicle_other,
        ft.name_th as fuel_type,
        t.fuel_type_other,
        CASE
          WHEN t.passenger_type = 'alone' THEN 'เดินทางคนเดียว'
          WHEN t.passenger_type = 'carpool' THEN 'เดินทางแบบ Carpool'
          ELSE ''
        END as passenger_type,
        r.attendance_type,
        sr.name_th as selected_room,
        CASE 
          WHEN r.location_type = 'bangkok' THEN 'กรุงเทพมหานคร'
          ELSE p.name_th
        END as province,
        bd.name_th as bangkok_district,
        CASE 
          WHEN r.check_in_status = 0 THEN 'ยังไม่ได้เช็คอิน'
          WHEN r.check_in_status = 1 THEN 'เช็คอินแล้ว'
          WHEN r.check_in_status = 2 THEN 'ไม่เข้าร่วม'
          ELSE 'ไม่ระบุ'
        END as check_in_status,
        r.check_in_time,
        r.gift_received,
        r.admin_notes,
        r.registration_date
      FROM CCI_registrants r
      LEFT JOIN CCI_organization_types ot ON r.organization_type_id = ot.id
      LEFT JOIN CCI_seminar_rooms sr ON r.selected_room_id = sr.id
      LEFT JOIN CCI_bangkok_districts bd ON r.bangkok_district_id = bd.id
      LEFT JOIN CCI_provinces p ON r.province_id = p.id
      LEFT JOIN CCI_transportation t ON r.id = t.registrant_id
      LEFT JOIN CCI_public_transport_types pt ON t.public_transport_id = pt.id
      LEFT JOIN CCI_private_vehicle_types pv ON t.private_vehicle_id = pv.id
      LEFT JOIN CCI_fuel_types ft ON t.fuel_type_id = ft.id
      WHERE ${whereClause}
      ORDER BY r.registration_date DESC`,
      params
    );
    
    // Format data for Excel export
    const formattedData = registrants.map(r => {
      // Format attendance type
      let attendanceType = '';
      switch(r.attendance_type) {
        case 'morning': attendanceType = 'ช่วงเช้า'; break;
        case 'afternoon': attendanceType = 'ช่วงบ่าย'; break;
        case 'full_day': attendanceType = 'เต็มวัน'; break;
        default: attendanceType = r.attendance_type;
      }
      
      // ใช้ค่า transportation_category_text ที่แปลงแล้วจาก SQL
      let transportationCategory = r.transportation_category_text || '';
      
      // ถ้าไม่มีค่า ให้แปลงเอง
      if (!transportationCategory) {
        switch(r.transportation_category) {
          case 'public': transportationCategory = 'ขนส่งสาธารณะ'; break;
          case 'private': transportationCategory = 'พาหนะส่วนตัว'; break;
          case 'walking': transportationCategory = 'เดินทางด้วยการเดิน'; break;
          default: transportationCategory = 'ไม่ระบุ';
        }
      }
      
      // Format gift received
      const giftReceived = r.gift_received ? 'รับได้' : 'ไม่ได้รับ';
      
      // Format date
      const registrationDate = r.registration_date ? new Date(r.registration_date).toLocaleString('th-TH') : '';
      const checkInTime = r.check_in_time ? new Date(r.check_in_time).toLocaleString('th-TH') : '';
      
      return {
        'รหัสลงทะเบียน': r.uuid,
        'ชื่อ': r.first_name,
        'นามสกุล': r.last_name,
        'อีเมล': r.email,
        'เบอร์โทรศัพท์': r.phone,
        'องค์กร': r.organization_name,
        'ประเภทองค์กร': r.organization_type || '',
        'ประเภทองค์กร (อื่นๆ)': r.organization_type_other || '',
        'จังหวัด': r.province || '',
        'เขต (กรุงเทพฯ)': r.bangkok_district || '',
        'ประเภทการเข้าร่วม': attendanceType,
        'ห้องสัมมนา': r.selected_room || '',
        'ประเภทการเดินทาง': transportationCategory,
        'ประเภทขนส่งสาธารณะ': r.public_transport_type || '',
        'ขนส่งสาธารณะ (อื่นๆ)': r.public_transport_other || '',
        'ประเภทพาหนะส่วนตัว': r.private_vehicle_type || '',
        'พาหนะส่วนตัว (อื่นๆ)': r.private_vehicle_other || '',
        'ประเภทเชื้อเพลิง': r.fuel_type || '',
        'เชื้อเพลิง (อื่นๆ)': r.fuel_type_other || '',
        'รูปแบบการเดินทาง': r.passenger_type || '',
        'สถานะเช็คอิน': r.check_in_status,
        'เวลาเช็คอิน': checkInTime,
        'รับของที่ระลึก': giftReceived,
        'หมายเหตุ': r.admin_notes || '',
        'วันที่ลงทะเบียน': registrationDate
      };
    });
    
    // Create workbook and worksheet
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Registrants');
    
    // Generate Excel file as Uint8Array for compatibility
    const excelArray = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    
    // Return Excel file as response
    return new Response(excelArray, {
      headers: {
        'Content-Disposition': 'attachment; filename="registrants.xlsx"',
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      }
    });
    
  } catch (error) {
    console.error('Error exporting registrants:', error?.message || error, error?.stack);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
