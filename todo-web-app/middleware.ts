import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const isAuthPage = request.nextUrl.pathname.startsWith('/auth')

  // If trying to access auth pages while logged in, redirect to home
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // If trying to access protected pages while not logged in, redirect to login
  if (!isAuthPage && !token) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  return NextResponse.next()
}

// Configure which routes to run middleware on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}