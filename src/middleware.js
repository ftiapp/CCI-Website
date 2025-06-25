import { NextResponse } from 'next/server';

// Secret key for JWT verification - should match the one used for signing
const JWT_SECRET = 'your_jwt_secret_key_should_be_longer_and_more_complex';

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  // Get the token from cookies
  const token = request.cookies.get('cci_admin_token')?.value;

  // Skip middleware for login page and API routes
  if (request.nextUrl.pathname === '/cciAdmin/login' || 
      request.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // If no token exists, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL('/cciAdmin/login', request.url));
  }

  // For Edge runtime compatibility, we'll use a simpler approach to check if the token exists
  // The actual verification will happen in the protected routes
  if (token) {
    return NextResponse.next();
  } else {
    // If no token exists, redirect to login
    return NextResponse.redirect(new URL('/cciAdmin/login', request.url));
  }
}

export const config = {
  matcher: ['/cciAdmin/:path*']
};
