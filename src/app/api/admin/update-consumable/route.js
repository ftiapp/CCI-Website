import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';

// POST body: { uuid: 'CCI-XXXXXX', type: 'beverage' | 'food' }
export async function POST(request) {
  try {
    const data = await request.json();
    const { uuid, type } = data || {};

    if (!uuid || !/^CCI-[A-Z0-9]{6}$/i.test(uuid)) {
      return NextResponse.json(
        { success: false, error: 'Invalid or missing UUID (expected CCI-XXXXXX)' },
        { status: 400 }
      );
    }

    if (!['beverage', 'food'].includes(type)) {
      return NextResponse.json(
        { success: false, error: 'Invalid type. Must be "beverage" or "food"' },
        { status: 400 }
      );
    }

    const column = type === 'beverage' ? 'beverage_status' : 'food_status';

    // Ensure only set to 1 (received). Idempotent update.
    const result = await executeQuery(
      `UPDATE CCI_registrants SET ${column} = 1 WHERE UPPER(uuid) = UPPER(?)`,
      [uuid]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { success: false, error: 'Registrant not found' },
        { status: 404 }
      );
    }

    // Return updated participant minimal info
    const rows = await executeQuery(
      `SELECT id, uuid, first_name, last_name, ${column} AS status FROM CCI_registrants WHERE UPPER(uuid) = UPPER(?)`,
      [uuid]
    );

    return NextResponse.json({ success: true, participant: rows[0], updated: column });
  } catch (error) {
    console.error('Error updating consumable status:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
