import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get('host') || '';

  // Check if it's a subdomain request (e.g., test.localhost:3000)
  const subdomain = hostname.split('.')[0];

  // Skip if it's the main domain (localhost:3000 or localhost)
  if (subdomain === 'localhost' || subdomain === 'www' || !hostname.includes('.')) {
    return NextResponse.next();
  }

  // Handle subdomain routing - serve subdomain pages on same port
  if (hostname.includes('.localhost')) {
    // Serve subdomain requests on the same port (8003)
    url.pathname = `/organization/subdomain`;
    url.searchParams.set('subdomain', subdomain);
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
