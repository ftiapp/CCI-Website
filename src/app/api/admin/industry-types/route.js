import { NextResponse } from 'next/server';
import { executeQuery, getIndustryTypes } from '@/lib/db';

// Get all industry types
export async function GET() {
  try {
    const industryTypes = await getIndustryTypes();
    
    return NextResponse.json({
      success: true,
      industryTypes
    });
  } catch (error) {
    console.error('Error fetching industry types:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'เกิดข้อผิดพลาดในการดึงข้อมูลประเภทอุตสาหกรรม' 
      },
      { status: 500 }
    );
  }
}

// Create a new industry type
export async function POST(request) {
  try {
    const { name_th, name_en } = await request.json();

    if (!name_th || !name_en) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'กรุณากรอกชื่อประเภทอุตสาหกรรมทั้งภาษาไทยและภาษาอังกฤษ' 
        },
        { status: 400 }
      );
    }

    const result = await executeQuery(
      'INSERT INTO CCI_industry_types (name_th, name_en) VALUES (?, ?)',
      [name_th, name_en]
    );

    return NextResponse.json({
      success: true,
      id: result.insertId,
      message: 'เพิ่มประเภทอุตสาหกรรมเรียบร้อยแล้ว'
    });
  } catch (error) {
    console.error('Error creating industry type:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'เกิดข้อผิดพลาดในการเพิ่มประเภทอุตสาหกรรม' 
      },
      { status: 500 }
    );
  }
}
