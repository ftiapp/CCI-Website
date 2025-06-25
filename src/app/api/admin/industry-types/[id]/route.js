import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';

// Get a specific industry type by ID
export async function GET(request, { params }) {
  const { id } = params;
  
  try {
    const industryType = await executeQuery(
      'SELECT * FROM CCI_industry_types WHERE id = ?',
      [id]
    );
    
    if (industryType.length === 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'ไม่พบประเภทอุตสาหกรรมที่ต้องการ' 
        },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      industryType: industryType[0]
    });
  } catch (error) {
    console.error('Error fetching industry type:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'เกิดข้อผิดพลาดในการดึงข้อมูลประเภทอุตสาหกรรม' 
      },
      { status: 500 }
    );
  }
}

// Update a specific industry type
export async function PUT(request, { params }) {
  const { id } = params;
  
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
      'UPDATE CCI_industry_types SET name_th = ?, name_en = ? WHERE id = ?',
      [name_th, name_en, id]
    );
    
    if (result.affectedRows === 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'ไม่พบประเภทอุตสาหกรรมที่ต้องการแก้ไข' 
        },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'แก้ไขประเภทอุตสาหกรรมเรียบร้อยแล้ว'
    });
  } catch (error) {
    console.error('Error updating industry type:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'เกิดข้อผิดพลาดในการแก้ไขประเภทอุตสาหกรรม' 
      },
      { status: 500 }
    );
  }
}

// Delete a specific industry type
export async function DELETE(request, { params }) {
  const { id } = params;
  
  try {
    // Check if this industry type is being used
    const usageCheck = await executeQuery(
      'SELECT COUNT(*) as count FROM CCI_registrants WHERE industry_type_id = ?',
      [id]
    );
    
    if (usageCheck[0].count > 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'ไม่สามารถลบประเภทอุตสาหกรรมนี้ได้เนื่องจากมีผู้ลงทะเบียนใช้งานอยู่' 
        },
        { status: 400 }
      );
    }
    
    const result = await executeQuery(
      'DELETE FROM CCI_industry_types WHERE id = ?',
      [id]
    );
    
    if (result.affectedRows === 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'ไม่พบประเภทอุตสาหกรรมที่ต้องการลบ' 
        },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'ลบประเภทอุตสาหกรรมเรียบร้อยแล้ว'
    });
  } catch (error) {
    console.error('Error deleting industry type:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'เกิดข้อผิดพลาดในการลบประเภทอุตสาหกรรม' 
      },
      { status: 500 }
    );
  }
}
