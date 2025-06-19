'use server';

import { NextResponse } from 'next/server';
import { getRegistrationById } from '@/lib/db';
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
    
    // Get registration data from database
    const registration = await getRegistrationById(id);
    
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
    
    return NextResponse.json({
      formData: registration,
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
