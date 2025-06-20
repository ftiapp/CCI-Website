import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';

export async function GET() {
  try {
    const organizationTypes = await executeQuery(
      'SELECT * FROM CCI_organization_types ORDER BY name_th'
    );
    
    return NextResponse.json({
      success: true,
      organizationTypes
    });
  } catch (error) {
    console.error('Error fetching organization types:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'เกิดข้อผิดพลาดในการดึงข้อมูลประเภทองค์กร' 
      },
      { status: 500 }
    );
  }
}
