import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';

// GET - Fetch all schedule items
export async function GET(request) {
  try {
    console.log('Schedule API: Request received');
    
    // Get filter parameters if needed
    const { searchParams } = new URL(request.url);
    const roomId = searchParams.get('roomId') || 'all';
    const isMorning = searchParams.get('isMorning');
    
    console.log('Schedule API: Filters', { roomId, isMorning });
    
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
    
    // Construct the full query for logging
    const scheduleQuery = `SELECT s.*, r.name_th as room_name_th, r.name_en as room_name_en
       FROM CCI_schedule s
       LEFT JOIN CCI_seminar_rooms r ON s.room_id = r.id
       WHERE 1=1 ${whereClause}
       ORDER BY s.event_date, s.time_start`;
       
    console.log('Schedule API: Executing query', { query: scheduleQuery, params });
    
    // Get schedule items with room info
    const scheduleItems = await executeQuery(scheduleQuery, params);
    
    console.log('Schedule API: Query result', { count: scheduleItems.length, sample: scheduleItems.slice(0, 2) });
    
    // Get all rooms for the dropdown
    const rooms = await executeQuery(
      'SELECT id, name_th, name_en FROM CCI_seminar_rooms ORDER BY id'
    );
    
    console.log('Schedule API: Rooms fetched', { count: rooms.length });
    
    // Check if scheduleItems is empty but should have data
    if (scheduleItems.length === 0) {
      console.log('Schedule API: No schedule items found, checking if table exists');
      
      // Check if the table exists and has data
      try {
        const tableCheck = await executeQuery('SELECT COUNT(*) as count FROM CCI_schedule');
        console.log('Schedule API: Table check result', tableCheck);
      } catch (tableError) {
        console.error('Schedule API: Error checking table', tableError);
      }
    }
    
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
