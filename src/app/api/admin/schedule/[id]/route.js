import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';

// GET - Fetch a single schedule item by ID
export async function GET(request, { params }) {
  const { id } = await params;
  try {
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID is required' },
        { status: 400 }
      );
    }
    
    const scheduleItems = await executeQuery(
      `SELECT s.*, r.name_th as room_name_th, r.name_en as room_name_en
       FROM CCI_schedule s
       LEFT JOIN CCI_seminar_rooms r ON s.room_id = r.id
       WHERE s.id = ?`,
      [id]
    );
    
    if (scheduleItems.length === 0) {
      return NextResponse.json(
        { success: false, error: 'ไม่พบกิจกรรมที่ต้องการ' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      scheduleItem: scheduleItems[0]
    });
    
  } catch (error) {
    console.error('Error fetching schedule item:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT - Update a schedule item
export async function PUT(request, { params }) {
  const { id } = await params;
  try {
    const data = await request.json();
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID is required' },
        { status: 400 }
      );
    }
    
    // Validate required fields
    if (!data.event_date || !data.time_start || !data.time_end || !data.title_th || !data.room_id) {
      return NextResponse.json(
        { success: false, error: 'กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน' },
        { status: 400 }
      );
    }
    
    // Update schedule item
    await executeQuery(
      `UPDATE CCI_schedule SET
       event_date = ?, time_start = ?, time_end = ?, 
       title_th = ?, title_en = ?, description_th = ?, description_en = ?,
       speaker_th = ?, speaker_en = ?, room_id = ?, is_morning = ?
       WHERE id = ?`,
      [
        data.event_date,
        data.time_start,
        data.time_end,
        data.title_th,
        data.title_en || '',
        data.description_th || '',
        data.description_en || '',
        data.speaker_th || '',
        data.speaker_en || '',
        data.room_id,
        data.is_morning || 0,
        id
      ]
    );
    
    // Get the updated item
    const updatedItem = await executeQuery(
      `SELECT s.*, r.name_th as room_name_th, r.name_en as room_name_en
       FROM CCI_schedule s
       LEFT JOIN CCI_seminar_rooms r ON s.room_id = r.id
       WHERE s.id = ?`,
      [id]
    );
    
    if (updatedItem.length === 0) {
      return NextResponse.json(
        { success: false, error: 'ไม่พบกิจกรรมที่ต้องการอัปเดต' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'อัปเดตกิจกรรมสำเร็จ',
      scheduleItem: updatedItem[0]
    });
    
  } catch (error) {
    console.error('Error updating schedule item:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a schedule item
export async function DELETE(request, { params }) {
  const { id } = await params;
  try {
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID is required' },
        { status: 400 }
      );
    }
    
    // Check if item exists
    const existingItems = await executeQuery(
      'SELECT id FROM CCI_schedule WHERE id = ?',
      [id]
    );
    
    if (existingItems.length === 0) {
      return NextResponse.json(
        { success: false, error: 'ไม่พบกิจกรรมที่ต้องการลบ' },
        { status: 404 }
      );
    }
    
    // Delete the item
    await executeQuery(
      'DELETE FROM CCI_schedule WHERE id = ?',
      [id]
    );
    
    return NextResponse.json({
      success: true,
      message: 'ลบกิจกรรมสำเร็จ',
      deletedId: id
    });
    
  } catch (error) {
    console.error('Error deleting schedule item:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
