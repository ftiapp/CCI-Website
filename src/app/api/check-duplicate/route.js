import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';

export async function POST(request) {
  try {
    const data = await request.json();
    const { firstName, lastName } = data;
    
    if (!firstName || !lastName) {
      return NextResponse.json(
        { error: 'First name and last name are required' },
        { status: 400 }
      );
    }
    
    // Check if the name already exists
    const existingUser = await executeQuery(
      'SELECT * FROM CCI_registrants WHERE first_name = ? AND last_name = ?',
      [firstName, lastName]
    );
    
    return NextResponse.json({ 
      isDuplicate: existingUser.length > 0
    });
    
  } catch (error) {
    console.error('Check duplicate error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
