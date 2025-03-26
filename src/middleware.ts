import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from './lib/jwt';
import { cookies } from 'next/headers';

export async function middleware(request : NextRequest) {
  const { pathname } = request.nextUrl; // Get the requested path
  const method = request.method; // Get the HTTP method (GET, POST, etc.)

  if ((pathname === '/api/layout' && method === 'POST') || (pathname.startsWith('/api/layout/') && method === 'DELETE') || (pathname.startsWith('/api/seat') && method === 'POST') || (pathname === '/api/user' && method === 'GET') || (pathname === '/api/counselling' && method === 'POST') ||  (pathname.startsWith('/api/counselling/') && method === 'DELETE') || (pathname.startsWith('/api/counselling/session') && method === 'PATCH') || (pathname == '/api/counselling/session'  && method === 'GET') || (pathname == '/api/seat/allotment'  && method === 'PATCH') || (pathname == '/api/seat/block'  && method === 'PATCH') ) {
    

    const cookieStore = await cookies();
    const token = cookieStore.get('authtoken')?.value

    

    if (!token) {
      // If no token, return a 401 Unauthorized response
      return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    try {
      // Verify the token (replace 'your-secret-key' with your actual secret key)
      const {payload}  = await verifyToken(token)

      console.log(payload)
      // Check user role if necessary
      if (payload.role !== 'Admin') {
        return new NextResponse(JSON.stringify({ error: 'Forbidden: Admins only' }), { status: 403 });
      }

      // If verification is successful, allow the request to continue
      return NextResponse.next();

    } catch (err) {
      console.error('JWT verification failed:', err);
      // If verification fails, return a 401 Unauthorized response
      return new NextResponse(JSON.stringify({ error: 'Invalid token' }), { status: 401 });
    }
  }

  // Allow the request to proceed for other routes or methods
  return NextResponse.next();
}

// // Apply middleware only to `/api/layout` route
// export const config = {
//   matcher: ['/api/layout'], // Match only `/api/layout`
// };
