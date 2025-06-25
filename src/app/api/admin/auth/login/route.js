import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// Secret key for JWT signing - in production, use an environment variable
const JWT_SECRET = 'your_jwt_secret_key_should_be_longer_and_more_complex';

export async function POST(request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Hard-coded credentials as specified
    const validUsername = 'cciadmin';
    const validPassword = 'AAbb123**';

    if (username === validUsername && password === validPassword) {
      // Create a simple token with expiration
      // In a production environment, you should use a proper JWT library compatible with Edge runtime
      // For now, we'll use a simple encoded token
      const payload = {
        username,
        role: 'admin',
        exp: Date.now() + 60 * 60 * 8 * 1000, // 8 hours in milliseconds
      };
      
      // Simple encoding (not secure for production, but works for demo)
      const token = Buffer.from(JSON.stringify(payload)).toString('base64');

      // Set the token in a cookie
      // In Next.js 15.3.3, we need to use a different approach
      const response = NextResponse.json({ success: true });
      
      // Set the cookie in the response
      response.cookies.set({
        name: 'cci_admin_token',
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 8, // 8 hours
        path: '/',
      });
      
      return response;
    } else {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
