import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';

// GET - Fetch all schedule items
export async function GET(request) {
  try {
    // Get filter parameters if needed
    const { searchParams } = new URL(request.url);
    const roomId = searchParams.get('roomId') || 'all';
    const isMorning = searchParams.get('isMorning');
    
    // Build query with filters
    let whereClause = '';
    const params = [];
    
    if (roomId !== 'all') {
      whereClause += ' AND s.room_id = ?';
      params.push(parseInt(roomId));
    }
    
    if (isMorning !== null) {
      whereClause += ' AND s.is_morning = ?';
      params.push(parseInt(isMorning));
    }
    
    // Get schedule items with room info
    const scheduleItems = await executeQuery(
      `SELECT s.*, r.name_th as room_name_th, r.name_en as room_name_en
       FROM CCI_schedule s
       LEFT JOIN CCI_seminar_rooms r ON s.room_id = r.id
       WHERE 1=1 ${whereClause}
       ORDER BY s.event_date, s.time_start`,
      params
    );
    
    // Get all rooms for the dropdown
    const rooms = await executeQuery(
      'SELECT id, name_th, name_en FROM CCI_seminar_rooms ORDER BY id'
    );
    
    return NextResponse.json({
      success: true,
      scheduleItems,
      rooms
    });
    
  } catch (error) {
    console.error('Error fetching schedule data:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create a new schedule item
export async function POST(request) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.event_date || !data.time_start || !data.time_end || !data.title_th || !data.room_id) {
      return NextResponse.json(
        { success: false, error: 'กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน' },
        { status: 400 }
      );
    }
    
    // Insert new schedule item
    const result = await executeQuery(
      `INSERT INTO CCI_schedule 
       (event_date, time_start, time_end, title_th, title_en, 
        description_th, description_en, speaker_th, speaker_en, room_id, is_morning)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
        data.is_morning || 0
      ]
    );
    
    // Get the newly created item
    const newItem = await executeQuery(
      `SELECT s.*, r.name_th as room_name_th, r.name_en as room_name_en
       FROM CCI_schedule s
       LEFT JOIN CCI_seminar_rooms r ON s.room_id = r.id
       WHERE s.id = ?`,
      [result.insertId]
    );
    
    return NextResponse.json({
      success: true,
      message: 'เพิ่มกิจกรรมสำเร็จ',
      scheduleItem: newItem[0]
    });
    
  } catch (error) {
    console.error('Error creating schedule item:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
