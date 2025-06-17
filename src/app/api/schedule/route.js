import { NextResponse } from 'next/server';
import { getSchedule } from '@/lib/db';

export async function GET() {
  try {
    const scheduleData = await getSchedule();
    
    return NextResponse.json({ 
      success: true,
      data: scheduleData
    });
    
  } catch (error) {
    console.error('Error fetching schedule:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
