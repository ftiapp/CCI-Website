import { NextResponse } from 'next/server';
import { saveAdminNotes, getAdminNotes, getAdminNotesHistory } from '@/lib/admin-notes';

/**
 * GET /api/admin/notes?uuid=xxx
 * ดึงข้อมูลหมายเหตุของผู้ลงทะเบียน
 */
export async function GET(request) {
  try {
    
    // ดึง UUID จาก query parameters
    const { searchParams } = new URL(request.url);
    const uuid = searchParams.get('uuid');
    
    if (!uuid) {
      return NextResponse.json({ error: 'UUID is required' }, { status: 400 });
    }
    
    // ดึงข้อมูลหมายเหตุ
    const result = await getAdminNotes(uuid);
    
    if (result.success) {
      return NextResponse.json(result);
    } else {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }
  } catch (error) {
    console.error('Error in GET /api/admin/notes:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * POST /api/admin/notes
 * บันทึกหมายเหตุสำหรับผู้ลงทะเบียน
 */
export async function POST(request) {
  try {
    
    // รับข้อมูลจาก request body
    const body = await request.json();
    const { uuid, admin_notes } = body;
    
    if (!uuid || admin_notes === undefined) {
      return NextResponse.json({ error: 'UUID and admin_notes are required' }, { status: 400 });
    }
    
    // บันทึกหมายเหตุ
    const adminUser = 'system'; // ไม่มีการตรวจสอบสิทธิ์แล้ว
    const result = await saveAdminNotes(uuid, admin_notes, adminUser);
    
    if (result.success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }
  } catch (error) {
    console.error('Error in POST /api/admin/notes:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * GET /api/admin/notes/history?uuid=xxx
 * ดึงประวัติหมายเหตุของผู้ลงทะเบียน
 */
export async function getAdminNotesHistoryHandler(request) {
  try {
    
    // ดึง UUID จาก query parameters
    const { searchParams } = new URL(request.url);
    const uuid = searchParams.get('uuid');
    
    if (!uuid) {
      return NextResponse.json({ error: 'UUID is required' }, { status: 400 });
    }
    
    // ดึงประวัติหมายเหตุ
    const result = await getAdminNotesHistory(uuid);
    
    if (result.success) {
      return NextResponse.json(result);
    } else {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }
  } catch (error) {
    console.error('Error in GET /api/admin/notes/history:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
