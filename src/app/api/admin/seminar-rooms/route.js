import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';

export async function GET() {
  try {
    const rooms = await executeQuery(
      'SELECT * FROM CCI_seminar_rooms ORDER BY name_th'
    );
    
    return NextResponse.json({
      success: true,
      rooms
    });
  } catch (error) {
    console.error('Error fetching seminar rooms:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'เกิดข้อผิดพลาดในการดึงข้อมูลห้องสัมมนา' 
      },
      { status: 500 }
    );
  }
}
