import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';

// Get all organization types
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
        error: 'เกิดข้อผิดพลาดในการดึงข้อมูลประเภทธุรกิจ' 
      },
      { status: 500 }
    );
  }
}

// Create a new organization type
export async function POST(request) {
  try {
    const { name_th, name_en } = await request.json();
    
    // Validate required fields
    if (!name_th || !name_en) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'กรุณาระบุชื่อประเภทธุรกิจทั้งภาษาไทยและภาษาอังกฤษ' 
        },
        { status: 400 }
      );
    }
    
    // Insert new organization type
    const result = await executeQuery(
      'INSERT INTO CCI_organization_types (name_th, name_en) VALUES (?, ?)',
      [name_th, name_en]
    );
    
    // Get the newly created organization type
    const newOrganizationType = await executeQuery(
      'SELECT * FROM CCI_organization_types WHERE id = ?',
      [result.insertId]
    );
    
    return NextResponse.json({
      success: true,
      organizationType: newOrganizationType[0]
    });
  } catch (error) {
    console.error('Error creating organization type:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'เกิดข้อผิดพลาดในการเพิ่มประเภทธุรกิจ' 
      },
      { status: 500 }
    );
  }
}
