import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';

export async function GET() {
  try {
    const transportationTypes = await executeQuery(
      'SELECT * FROM CCI_transportation_types ORDER BY name_th'
    );
    
    return NextResponse.json({
      success: true,
      transportationTypes
    });
  } catch (error) {
    console.error('Error fetching transportation types:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'เกิดข้อผิดพลาดในการดึงข้อมูลประเภทการเดินทาง' 
      },
      { status: 500 }
    );
  }
}
