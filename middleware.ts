import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Define public paths that don't require authentication
  const isPublicPath = path.startsWith("/auth") || path === "/"

  // Check if user is authenticated
  const token = request.cookies.get("accessToken")?.value || ""

  // Redirect logic
  if (!isPublicPath && !token) {
    // Redirect to login if trying to access protected route without token
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  if (isPublicPath && token && path.startsWith("/auth")) {
    // Get user role from token or use a default
    // In a real app, you would decode the JWT to get the role
    const role = "learner" // Default role

    // Redirect to appropriate dashboard if already logged in
    return NextResponse.redirect(new URL(`/dashboard/${role}`, request.url))
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
