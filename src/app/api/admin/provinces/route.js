import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';

export async function GET() {
  try {
    const provinces = await executeQuery(
      'SELECT * FROM CCI_provinces ORDER BY name_th'
    );
    
    return NextResponse.json({
      success: true,
      provinces
    });
  } catch (error) {
    console.error('Error fetching provinces:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'เกิดข้อผิดพลาดในการดึงข้อมูลจังหวัด' 
      },
      { status: 500 }
    );
  }
}
