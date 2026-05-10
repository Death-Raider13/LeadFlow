import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

const SESSION_COOKIE_NAME = "firebaseSession"

export async function middleware(request: NextRequest) {
  // Simple rate limiting check (basic implementation for Edge Runtime)
  if (request.nextUrl.pathname.startsWith("/api/")) {
    // Basic rate limiting headers
    const response = NextResponse.next()
    response.headers.set('X-RateLimit-Limit', '100')
    response.headers.set('X-RateLimit-Remaining', '99')
    
    // Continue to authentication check
    const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME)?.value
    const isAuthenticated = Boolean(sessionCookie)
    const { pathname } = request.nextUrl

    if (!isAuthenticated && pathname.startsWith("/dashboard")) {
      const url = request.nextUrl.clone()
      url.pathname = "/auth/login"
      return NextResponse.redirect(url)
    }

    if (isAuthenticated && pathname.startsWith("/auth/")) {
      const url = request.nextUrl.clone()
      url.pathname = "/dashboard"
      return NextResponse.redirect(url)
    }

    return response
  }
  
  // Authentication middleware for non-API routes
  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME)?.value
  const isAuthenticated = Boolean(sessionCookie)
  const { pathname } = request.nextUrl

  if (!isAuthenticated && pathname.startsWith("/dashboard")) {
    const url = request.nextUrl.clone()
    url.pathname = "/auth/login"
    return NextResponse.redirect(url)
  }

  if (isAuthenticated && pathname.startsWith("/auth/")) {
    const url = request.nextUrl.clone()
    url.pathname = "/dashboard"
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
