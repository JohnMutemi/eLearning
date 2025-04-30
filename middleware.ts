import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Define role-based access control
const roleAccess = {
  admin: ["/dashboard/admin", "/dashboard/admin/*"],
  tutor: ["/dashboard/tutor", "/dashboard/tutor/*"],
  learner: ["/dashboard/learner", "/dashboard/learner/*"],
}

// Public paths that don't require authentication
const publicPaths = ["/", "/auth/login", "/auth/register", "/auth/reset-password"]

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const token = request.cookies.get("accessToken")?.value
  const userRole = request.cookies.get("userRole")?.value

  // Check if path is public
  const isPublicPath = publicPaths.some(publicPath => 
    path === publicPath || path.startsWith(publicPath)
  )

  // Handle unauthenticated access
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  // Handle authenticated access to public paths
  if (isPublicPath && token && path.startsWith("/auth")) {
    // Redirect to appropriate dashboard based on role
    const dashboardPath = userRole ? `/dashboard/${userRole}` : "/dashboard/learner"
    return NextResponse.redirect(new URL(dashboardPath, request.url))
  }

  // Handle role-based access control
  if (token && userRole) {
    const allowedPaths = roleAccess[userRole as keyof typeof roleAccess] || []
    const hasAccess = allowedPaths.some(allowedPath => 
      path === allowedPath || path.startsWith(allowedPath.replace("/*", ""))
    )

    if (!hasAccess) {
      // Redirect to appropriate dashboard if trying to access unauthorized route
      return NextResponse.redirect(new URL(`/dashboard/${userRole}`, request.url))
    }
  }

  return NextResponse.next()
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/auth/:path*",
    "/",
  ],
}
