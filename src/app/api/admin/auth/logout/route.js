import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Delete the authentication cookie using the response cookies API
    const response = NextResponse.json({ success: true });
    
    // Delete the cookie from the response
    response.cookies.delete('cci_admin_token');
    
    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
