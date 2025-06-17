import { NextResponse } from 'next/server';
import { registerParticipant } from '@/lib/db';

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Validate required fields
    const requiredFields = [
      'firstName', 
      'lastName', 
      'email', 
      'phone', 
      'organizationName', 
      'organizationTypeId', 
      'transportation_category', 
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
    
    // Validate selectedRoomId for afternoon or full_day attendance
    if ((data.attendanceType === 'afternoon' || data.attendanceType === 'full_day') && !data.selectedRoomId) {
      return NextResponse.json(
        { error: 'Missing required field: selectedRoomId' },
        { status: 400 }
      );
    }
    
    // Additional validation for transportation fields
    if (data.transportation_category === 'public' && !data.public_transport_type) {
      return NextResponse.json(
        { error: 'Missing required field: public_transport_type' },
        { status: 400 }
      );
    }
    
    if (data.transportation_category === 'private') {
      if (!data.car_type) {
        return NextResponse.json(
          { error: 'Missing required field: car_type' },
          { status: 400 }
        );
      }
      
      if (!data.car_passenger_type) {
        return NextResponse.json(
          { error: 'Missing required field: car_passenger_type' },
          { status: 400 }
        );
      }
    }
    
    // Prepare registration data
    const registrationData = {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      phone: data.phone,
      organization_name: data.organizationName,
      organization_type_id: parseInt(data.organizationTypeId),
      transportation_type_id: parseInt(data.transportationTypeId) || null,
      transportation_category: data.transportation_category,
      public_transport_type: data.transportation_category === 'public' ? data.public_transport_type : null,
      public_transport_other: data.transportation_category === 'public' && data.public_transport_type === 'other' ? data.public_transport_other : null,
      car_type: data.transportation_category === 'private' ? data.car_type : null,
      car_type_other: data.transportation_category === 'private' && data.car_type === 'other' ? data.car_type_other : null,
      car_passenger_type: data.transportation_category === 'private' ? data.car_passenger_type : null,
      is_attending_morning: data.attendanceType === 'morning' || data.attendanceType === 'full_day',
      is_attending_afternoon: data.attendanceType === 'afternoon' || data.attendanceType === 'full_day',
      selected_room_id: data.selectedRoomId ? parseInt(data.selectedRoomId) : null
    };
    
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
