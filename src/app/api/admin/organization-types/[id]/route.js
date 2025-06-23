import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';

// Update an organization type
export async function PUT(request, { params }) {
  try {
    const { id } = params;
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
    
    // Check if organization type exists
    const existingType = await executeQuery(
      'SELECT * FROM CCI_organization_types WHERE id = ?',
      [id]
    );
    
    if (existingType.length === 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'ไม่พบประเภทธุรกิจที่ต้องการแก้ไข' 
        },
        { status: 404 }
      );
    }
    
    // Update organization type
    await executeQuery(
      'UPDATE CCI_organization_types SET name_th = ?, name_en = ? WHERE id = ?',
      [name_th, name_en, id]
    );
    
    // Get the updated organization type
    const updatedType = await executeQuery(
      'SELECT * FROM CCI_organization_types WHERE id = ?',
      [id]
    );
    
    return NextResponse.json({
      success: true,
      organizationType: updatedType[0]
    });
  } catch (error) {
    console.error('Error updating organization type:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'เกิดข้อผิดพลาดในการแก้ไขประเภทธุรกิจ' 
      },
      { status: 500 }
    );
  }
}

// Delete an organization type
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    
    // Check if organization type exists
    const existingType = await executeQuery(
      'SELECT * FROM CCI_organization_types WHERE id = ?',
      [id]
    );
    
    if (existingType.length === 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'ไม่พบประเภทธุรกิจที่ต้องการลบ' 
        },
        { status: 404 }
      );
    }
    
    // Check if the organization type is being used by any registrant
    const usageCheck = await executeQuery(
      'SELECT COUNT(*) as count FROM CCI_registrants WHERE organization_type_id = ?',
      [id]
    );
    
    if (usageCheck[0].count > 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'ไม่สามารถลบประเภทธุรกิจนี้ได้ เนื่องจากมีผู้ลงทะเบียนใช้งานอยู่' 
        },
        { status: 400 }
      );
    }
    
    // Delete organization type
    await executeQuery(
      'DELETE FROM CCI_organization_types WHERE id = ?',
      [id]
    );
    
    return NextResponse.json({
      success: true,
      message: 'ลบประเภทธุรกิจสำเร็จ'
    });
  } catch (error) {
    console.error('Error deleting organization type:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'เกิดข้อผิดพลาดในการลบประเภทธุรกิจ' 
      },
      { status: 500 }
    );
  }
}
