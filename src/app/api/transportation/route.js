import { executeQuery } from '@/lib/db';
import { NextResponse } from 'next/server';

// API สำหรับดึงข้อมูลประเภทการเดินทางทั้งหมด
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    
    let data = {};
    
    // ดึงข้อมูลประเภทการเดินทางหลัก
    if (!type || type === 'transport-types') {
      const transportTypes = await executeQuery('SELECT * FROM CCI_transport_types');
      data.transportTypes = transportTypes;
    }
    
    // ดึงข้อมูลประเภทขนส่งมวลชน
    if (!type || type === 'public-transport') {
      const publicTransportTypes = await executeQuery('SELECT * FROM CCI_public_transport_types');
      data.publicTransportTypes = publicTransportTypes;
    }
    
    // ดึงข้อมูลประเภทยานพาหนะส่วนตัว
    if (!type || type === 'private-vehicles') {
      const privateVehicleTypes = await executeQuery('SELECT * FROM CCI_private_vehicle_types');
      data.privateVehicleTypes = privateVehicleTypes;
    }
    
    // ดึงข้อมูลประเภทเชื้อเพลิง
    if (!type || type === 'fuel-types') {
      const fuelTypes = await executeQuery('SELECT * FROM CCI_fuel_types');
      data.fuelTypes = fuelTypes;
    }
    
    // ดึงข้อมูลประเภทผู้โดยสาร
    if (!type || type === 'passenger-types') {
      const passengerTypes = await executeQuery('SELECT * FROM CCI_passenger_types');
      data.passengerTypes = passengerTypes;
    }
    
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching transportation data:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
