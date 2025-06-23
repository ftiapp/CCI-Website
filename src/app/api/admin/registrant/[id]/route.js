import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';

// GET - Fetch a single registrant by ID
export async function GET(request, { params }) {
  const { id } = await params;
  
  try {
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID is required' },
        { status: 400 }
      );
    }
    
    const registrants = await executeQuery(
      `SELECT r.*, 
        r.admin_notes,
        ot.name_th as organization_type_th, ot.name_en as organization_type_en,
        t.transport_type,
        t.public_transport_id,
        t.public_transport_other,
        t.private_vehicle_id,
        t.private_vehicle_other,
        t.passenger_type,
        t.fuel_type_id,
        t.fuel_type_other,
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
      [id]
    );
    
    if (registrants.length === 0) {
      return NextResponse.json(
        { success: false, error: 'ไม่พบข้อมูลผู้ลงทะเบียนที่ต้องการ' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      registrant: registrants[0]
    });
    
  } catch (error) {
    console.error('Error fetching registrant:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT - Update a registrant
export async function PUT(request, { params }) {
  const { id } = await params;
  
  try {
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID is required' },
        { status: 400 }
      );
    }
    
    const data = await request.json();
    
    // Validate required fields
    if (!data.first_name || !data.last_name || !data.email || !data.phone || !data.organization_name || !data.organization_type_id || !data.attendance_type) {
      return NextResponse.json(
        { success: false, error: 'กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน' },
        { status: 400 }
      );
    }
    
    // Check if the updated name would cause a duplicate
    if (data.first_name && data.last_name) {
      const existingRegistrants = await executeQuery(
        'SELECT id FROM CCI_registrants WHERE first_name = ? AND last_name = ? AND id != ?',
        [data.first_name, data.last_name, id]
      );
      
      if (existingRegistrants.length > 0) {
        return NextResponse.json(
          { success: false, error: 'มีผู้ลงทะเบียนชื่อนี้ในระบบแล้ว กรุณาใช้ชื่อ-นามสกุลอื่น' },
          { status: 400 }
        );
      }
    }
    
    // ตั้งค่า gift_received = 1 โดยอัตโนมัติเมื่อผู้ลงทะเบียนเลือกเดินทางด้วยขนส่งมวลชนหรือเดิน
    let giftReceived = 0;
    if (data.transport_type === 'public' || data.transport_type === 'walk') {
      giftReceived = 1;
    }
    
    // Update the registrant data
    await executeQuery(
      `UPDATE CCI_registrants SET
        first_name = ?,
        last_name = ?,
        email = ?,
        phone = ?,
        organization_name = ?,
        organization_type_id = ?,
        organization_type_other = ?,
        attendance_type = ?,
        selected_room_id = ?,
        location_type = ?,
        bangkok_district_id = ?,
        province_id = ?,
        admin_notes = ?,
        gift_received = ?
      WHERE id = ?`,
      [
        data.first_name,
        data.last_name,
        data.email,
        data.phone,
        data.organization_name,
        data.organization_type_id,
        data.organization_type_other || null,
        data.attendance_type,
        data.selected_room_id || null,
        data.location_type || null,
        data.bangkok_district_id || null,
        data.province_id || null,
        data.admin_notes || null,
        giftReceived,
        id
      ]
    );
    
    // Check if transportation data exists for this registrant
    const existingTransportation = await executeQuery(
      'SELECT id FROM CCI_transportation WHERE registrant_id = ?',
      [id]
    );
    
    // Update or insert transportation data
    if (existingTransportation.length > 0) {
      // Update existing transportation data
      await executeQuery(
        `UPDATE CCI_transportation SET
          transport_type = ?,
          public_transport_id = ?,
          public_transport_other = ?,
          private_vehicle_id = ?,
          private_vehicle_other = ?,
          passenger_type = ?,
          fuel_type_id = ?,
          fuel_type_other = ?
        WHERE registrant_id = ?`,
        [
          data.transport_type || null,
          data.public_transport_id || null,
          data.public_transport_other || null,
          data.private_vehicle_id || null,
          data.private_vehicle_other || null,
          data.passenger_type || null,
          // Convert fuel_type_id to integer or null if it's a string
          (data.fuel_type_id && !isNaN(parseInt(data.fuel_type_id))) ? parseInt(data.fuel_type_id) : null,
          data.fuel_type_other || null,
          id
        ]
      );
    } else if (data.transport_type) {
      // Insert new transportation data if transport_type is provided
      await executeQuery(
        `INSERT INTO CCI_transportation (
          registrant_id,
          transport_type,
          public_transport_id,
          public_transport_other,
          private_vehicle_id,
          private_vehicle_other,
          passenger_type,
          fuel_type_id,
          fuel_type_other
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          id,
          data.transport_type || null,
          data.public_transport_id || null,
          data.public_transport_other || null,
          data.private_vehicle_id || null,
          data.private_vehicle_other || null,
          data.passenger_type || null,
          // Convert fuel_type_id to integer or null if it's a string
          (data.fuel_type_id && !isNaN(parseInt(data.fuel_type_id))) ? parseInt(data.fuel_type_id) : null,
          data.fuel_type_other || null
        ]
      );
    }
    
    // Get the updated registrant
    const updatedRegistrant = await executeQuery(
      `SELECT r.*, 
        ot.name_th as organization_type_th, ot.name_en as organization_type_en,
        t.transport_type,
        t.public_transport_id,
        t.public_transport_other,
        t.private_vehicle_id,
        t.private_vehicle_other,
        t.passenger_type,
        t.fuel_type_id,
        t.fuel_type_other,
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
      [id]
    );
    
    if (updatedRegistrant.length === 0) {
      return NextResponse.json(
        { success: false, error: 'ไม่พบข้อมูลผู้ลงทะเบียนที่ต้องการอัปเดต' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'อัปเดตข้อมูลผู้ลงทะเบียนสำเร็จ',
      registrant: updatedRegistrant[0],
      shouldSendNotification: data.sendNotification || false
    });
    
  } catch (error) {
    console.error('Error updating registrant:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a registrant
export async function DELETE(request, { params }) {
  const { id } = await params;
  
  try {
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID is required' },
        { status: 400 }
      );
    }
    
    // Get registrant data before deletion for notification purposes
    const registrantData = await executeQuery(
      'SELECT * FROM CCI_registrants WHERE id = ?',
      [id]
    );
    
    if (registrantData.length === 0) {
      return NextResponse.json(
        { success: false, error: 'ไม่พบข้อมูลผู้ลงทะเบียนที่ต้องการลบ' },
        { status: 404 }
      );
    }
    
    // Delete the registrant
    await executeQuery(
      'DELETE FROM CCI_registrants WHERE id = ?',
      [id]
    );
    
    return NextResponse.json({
      success: true,
      message: 'ลบข้อมูลผู้ลงทะเบียนสำเร็จ',
      deletedId: id,
      registrantData: registrantData[0]
    });
    
  } catch (error) {
    console.error('Error deleting registrant:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
