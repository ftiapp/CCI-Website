import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';

export async function GET() {
  try {
    const districts = await executeQuery(
      'SELECT * FROM CCI_bangkok_districts ORDER BY name_th'
    );
    
    return NextResponse.json({
      success: true,
      districts
    });
  } catch (error) {
    console.error('Error fetching Bangkok districts:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'เกิดข้อผิดพลาดในการดึงข้อมูลเขตในกรุงเทพฯ' 
      },
      { status: 500 }
    );
  }
}
