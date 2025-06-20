import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';
import * as XLSX from 'xlsx';

export async function GET(request) {
  try {
    // Get filter parameters
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const provinceFilter = searchParams.get('province') || 'all';
    const statusFilter = searchParams.get('status') || 'all';
    
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
    
    // Get all registrants with their related data
    const registrants = await executeQuery(
      `SELECT r.id, r.uuid, r.first_name, r.last_name, r.email, r.phone, 
        r.organization_name, 
        ot.name_th as organization_type,
        r.organization_type_other,
        tt.name_th as transportation_type,
        r.transportation_category,
        r.public_transport_type,
        r.public_transport_other,
        r.car_type,
        r.car_type_other,
        r.car_passenger_type,
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
      LEFT JOIN CCI_transportation_types tt ON r.transportation_type_id = tt.id
      LEFT JOIN CCI_seminar_rooms sr ON r.selected_room_id = sr.id
      LEFT JOIN CCI_bangkok_districts bd ON r.bangkok_district_id = bd.id
      LEFT JOIN CCI_provinces p ON r.province_id = p.id
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
      
      // Format transportation category
      let transportationCategory = '';
      switch(r.transportation_category) {
        case 'public': transportationCategory = 'ขนส่งสาธารณะ'; break;
        case 'private': transportationCategory = 'รถยนต์ส่วนตัว'; break;
        default: transportationCategory = '';
      }
      
      // Format gift received
      const giftReceived = r.gift_received ? 'รับแล้ว' : 'ยังไม่ได้รับ';
      
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
        'วิธีการเดินทาง': r.transportation_type || '',
        'ประเภทการเดินทาง': transportationCategory,
        'ประเภทขนส่งสาธารณะ': r.public_transport_type || '',
        'ขนส่งสาธารณะ (อื่นๆ)': r.public_transport_other || '',
        'ประเภทรถยนต์': r.car_type || '',
        'ประเภทรถยนต์ (อื่นๆ)': r.car_type_other || '',
        'ประเภทผู้โดยสาร': r.car_passenger_type || '',
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
    
    // Generate Excel file
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    
    // Return Excel file as response
    return new NextResponse(excelBuffer, {
      headers: {
        'Content-Disposition': 'attachment; filename="registrants.xlsx"',
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      }
    });
    
  } catch (error) {
    console.error('Error exporting registrants:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
