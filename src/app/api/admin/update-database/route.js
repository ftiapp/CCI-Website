import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';

export async function GET() {
  try {
    // Ensure required columns exist: check_in_status, beverage_status, food_status
    const columns = await executeQuery(`
      SELECT COLUMN_NAME 
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_NAME = 'CCI_registrants'
    `);

    const hasCheckIn = columns.some(c => c.COLUMN_NAME === 'check_in_status');
    const hasBeverage = columns.some(c => c.COLUMN_NAME === 'beverage_status');
    const hasFood = columns.some(c => c.COLUMN_NAME === 'food_status');

    const actions = [];

    if (!hasCheckIn) {
      actions.push(executeQuery(`
        ALTER TABLE CCI_registrants 
        ADD COLUMN check_in_status TINYINT DEFAULT 0 COMMENT '0=not checked in, 1=checked in, 2=cancelled'
      `));
    }
    if (!hasBeverage) {
      actions.push(executeQuery(`
        ALTER TABLE CCI_registrants 
        ADD COLUMN beverage_status TINYINT(1) DEFAULT 0 COMMENT '0=not received, 1=received'
      `));
    }
    if (!hasFood) {
      actions.push(executeQuery(`
        ALTER TABLE CCI_registrants 
        ADD COLUMN food_status TINYINT(1) DEFAULT 0 COMMENT '0=not received, 1=received'
      `));
    }

    if (actions.length > 0) {
      await Promise.all(actions);
      return NextResponse.json({
        success: true,
        message: 'Database updated successfully.',
        added: {
          check_in_status: !hasCheckIn,
          beverage_status: !hasBeverage,
          food_status: !hasFood
        }
      });
    }

    return NextResponse.json({ success: true, message: 'Database is already up to date.' });
  } catch (error) {
    console.error('Error updating database:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
