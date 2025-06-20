'use server';

import { NextResponse } from 'next/server';
import { getParticipantByUuid } from '@/lib/db';
import { getOrganizationTypes, getTransportationTypes, getSeminarRooms } from '@/lib/data';

export async function GET(request, { params }) {
  try {
    // Await params before accessing properties as required by Next.js 15.3.3
    const unwrappedParams = await params;
    const id = unwrappedParams.id;
    
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
      // Transportation data with updated field names
      transport_type: registration.transport_type || registration.transportation_category,
      public_transport_id: registration.public_transport_id?.toString() || registration.public_transport_type?.toString(),
      public_transport_other: registration.public_transport_other,
      private_vehicle_id: registration.private_vehicle_id?.toString() || registration.car_type?.toString(),
      private_vehicle_other: registration.private_vehicle_other || registration.car_type_other,
      fuel_type: registration.fuel_type?.toString(),
      fuel_type_other: registration.fuel_type_other,
      passenger_type: registration.passenger_type?.toString() || registration.car_passenger_type?.toString(),
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
