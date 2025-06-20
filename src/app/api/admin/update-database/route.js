import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';

export async function GET() {
  try {
    // Check if check_in_status column exists
    const checkColumnExists = await executeQuery(`
      SELECT COLUMN_NAME 
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_NAME = 'CCI_registrants' 
      AND COLUMN_NAME = 'check_in_status'
    `);
    
    // If column doesn't exist, add it
    if (checkColumnExists.length === 0) {
      await executeQuery(`
        ALTER TABLE CCI_registrants 
        ADD COLUMN check_in_status TINYINT DEFAULT 0 COMMENT '0=not checked in, 1=checked in, 2=cancelled'
      `);
      
      return NextResponse.json({
        success: true,
        message: 'Database updated successfully. Added check_in_status column.'
      });
    }
    
    return NextResponse.json({
      success: true,
      message: 'Database is already up to date.'
    });
    
  } catch (error) {
    console.error('Error updating database:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
