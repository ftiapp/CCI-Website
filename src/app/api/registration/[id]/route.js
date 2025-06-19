'use server';

import { NextResponse } from 'next/server';
import { getParticipantByUuid } from '@/lib/db';
import { getOrganizationTypes, getTransportationTypes, getSeminarRooms } from '@/lib/data';

export async function GET(request, { params }) {
  try {
    const { id } = params;
    
    if (!id) {
      return NextResponse.json(
        { error: 'Registration ID is required' },
        { status: 400 }
      );
    }
    
    // Get registration data from database using UUID
    const registration = await getParticipantByUuid(id);
    
    if (!registration) {
      return NextResponse.json(
        { error: 'Registration not found' },
        { status: 404 }
      );
    }
    
    // Get reference data
    const organizationTypes = await getOrganizationTypes();
    const transportationTypes = await getTransportationTypes();
    const seminarRooms = await getSeminarRooms();
    
    // Format the data to match what the frontend expects
    const formattedData = {
      firstName: registration.first_name,
      lastName: registration.last_name,
      email: registration.email,
      phone: registration.phone,
      organizationName: registration.organization_name,
      organizationTypeId: registration.organization_type_id?.toString(),
      position: registration.position,
      attendanceType: registration.attendance_type,
      selectedRoomId: registration.selected_room_id?.toString(),
      transportation_category: registration.transportation_category,
      public_transport_type: registration.public_transport_type,
      public_transport_other: registration.public_transport_other,
      car_type: registration.car_type,
      car_type_other: registration.car_type_other,
      car_passenger_type: registration.car_passenger_type,
      district: registration.district,
      province: registration.province
    };
    
    return NextResponse.json({
      formData: formattedData,
      organizationTypes,
      transportationTypes,
      seminarRooms
    });
    
  } catch (error) {
    console.error('Error fetching registration:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
