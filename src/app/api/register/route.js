import { NextResponse } from 'next/server';
import { registerParticipant } from '@/lib/db';

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Debug log
    console.log('Registration data received:', data);
    console.log('private_vehicle_other from form:', data.private_vehicle_other);
    
    // Validate required fields
    const requiredFields = [
      'firstName', 
      'lastName', 
      'email', 
      'phone', 
      'organizationName', 
      'organizationTypeId', 
      'transport_type', 
      'location_type',
      'attendanceType'
    ];
    
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }
    
    // Validate selectedRoomId for afternoon attendance only
    if (data.attendanceType === 'afternoon' && !data.selectedRoomId) {
      return NextResponse.json(
        { error: 'Missing required field: selectedRoomId' },
        { status: 400 }
      );
    }
    
    // Validate location fields
    if (data.location_type === 'bangkok' && !data.bangkok_district_id) {
      return NextResponse.json(
        { error: 'Missing required field: bangkok_district_id' },
        { status: 400 }
      );
    }
    
    if (data.location_type === 'province' && !data.province_id) {
      return NextResponse.json(
        { error: 'Missing required field: province_id' },
        { status: 400 }
      );
    }
    
    // Additional validation for transportation fields
    if (data.transport_type === 'public' && !data.public_transport_id) {
      return NextResponse.json(
        { error: 'Missing required field: public_transport_id' },
        { status: 400 }
      );
    }
    
    if (data.transport_type === 'private') {
      if (!data.fuel_type) {
        return NextResponse.json(
          { error: 'Missing required field: fuel_type' },
          { status: 400 }
        );
      }
      
      if (!data.passenger_type) {
        return NextResponse.json(
          { error: 'Missing required field: passenger_type' },
          { status: 400 }
        );
      }
    }
    
    // Walking is valid without additional fields
    
    // Prepare registration data
    const registrationData = {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      phone: data.phone,
      organization_name: data.organizationName,
      // Handle "Other" organization type (99)
      organization_type_id: parseInt(data.organizationTypeId) || null,
      // ตรวจสอบค่า organization_type_other เมื่อเลือก "อื่นๆ" (ID 99)
      // แก้ไขปัญหาโดยตรวจสอบค่าที่ส่งมาในทุกรูปแบบและใช้ค่าที่ไม่ใช่ null
      organization_type_other: parseInt(data.organizationTypeId) === 99 ? 
        // ตรวจสอบทุกรูปแบบของข้อมูลที่อาจส่งมา
        (data.organization_type_other || data.organizationTypeOther || "อื่นๆ") : 
        null,
      // For walking, use a default transportation_type_id of 1 (assuming 1 is a valid ID for public transportation)
      transportation_type_id: data.transport_type === 'walking' ? 1 : (data.private_vehicle_id ? parseInt(data.private_vehicle_id) : (data.public_transport_id ? parseInt(data.public_transport_id) : 1)),
      transportation_category: data.transport_type, // ใช้ค่า transport_type ที่ส่งมาโดยตรง ไม่แปลงค่า
      public_transport_type: data.transport_type === 'public' ? data.public_transport_id : (data.transport_type === 'walking' ? 'walking' : null),
      public_transport_other: data.transport_type === 'public' && (data.public_transport_id == 999 || data.public_transport_id == 99) ? data.public_transport_other : null,
      car_type: data.transport_type === 'private' ? data.private_vehicle_id : null,
      car_type_other: data.transport_type === 'private' && data.private_vehicle_id == 99 ? data.private_vehicle_other : null,
      private_vehicle_other: data.transport_type === 'private' && data.private_vehicle_id == 99 ? data.private_vehicle_other : null,
      fuel_type: data.transport_type === 'private' ? data.fuel_type : null,
      fuel_type_other: data.transport_type === 'private' && data.fuel_type == 99 ? data.fuel_type_other : null,
      car_passenger_type: data.transport_type === 'private' ? data.passenger_type : null,
      location_type: data.location_type,
      bangkok_district_id: data.location_type === 'bangkok' ? parseInt(data.bangkok_district_id) : null,
      province_id: data.location_type === 'province' ? parseInt(data.province_id) : null,
      attendance_type: data.attendanceType,
      selected_room_id: data.selectedRoomId ? parseInt(data.selectedRoomId) : null
    };
    
    // Debug registrationData
    console.log('Registration data being sent to registerParticipant:', registrationData);
    console.log('private_vehicle_other being sent:', registrationData.private_vehicle_other);
    console.log('public_transport_other being sent:', registrationData.public_transport_other);
    
    // ตรวจสอบและแก้ไขข้อมูล private_vehicle_other
    if (data.transport_type === 'private' && data.private_vehicle_id == 99) {
      console.log('DEBUG - Found private vehicle other:', data.private_vehicle_other);
    }
    
    // ตรวจสอบและแก้ไขข้อมูล public_transport_other
    if (data.transport_type === 'public' && (data.public_transport_id == 999 || data.public_transport_id == 99)) {
      console.log('DEBUG - Found public transport other:', data.public_transport_other);
    }
    
    // Register participant
    const result = await registerParticipant(registrationData);
    
    // Check for duplicate name error
    if (result.error === 'duplicate_name') {
      return NextResponse.json(
        { error: 'duplicate_name' },
        { status: 409 }
      );
    }
    
    // Return success with UUID
    return NextResponse.json({ 
      success: true,
      uuid: result.uuid
    });
    
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
