import { API_URL } from "@/config"
import { mockAuthService } from "./mock-auth-service"

export interface LoginResponse {
  access: string
  refresh: string
  user: {
    id: number
    email: string
    first_name: string
    last_name: string
    role: "learner" | "tutor" | "admin"
  }
}

export interface RegisterData {
  firstName: string
  lastName: string
  email: string
  password: string
  role: "learner" | "tutor"
}

class AuthService {
  /**
   * Login user and get JWT tokens
   */
  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      // Use mock service for testing
      const response = await mockAuthService.login(email, password)

      // Store tokens and user role in cookies with SameSite and Secure attributes
      const cookieOptions = "path=/; max-age=3600; SameSite=Lax"
      document.cookie = `accessToken=${response.access}; ${cookieOptions}` // 1 hour
      document.cookie = `refreshToken=${response.refresh}; ${cookieOptions}; max-age=2592000` // 30 days
      document.cookie = `userRole=${response.user.role}; ${cookieOptions}; max-age=2592000` // 30 days

      return response
    } catch (error) {
      console.error('Login error:', error)
      throw new Error("Invalid credentials")
    }
  }

  /**
   * Register a new user
   */
  async register(userData: RegisterData): Promise<{ message: string }> {
    try {
      // Use mock service for testing
      return await mockAuthService.register(userData)
    } catch (error) {
      throw new Error("Registration failed")
    }
  }

  /**
   * Request password reset
   */
  async resetPassword(email: string): Promise<{ message: string }> {
    const response = await fetch(`${API_URL}/auth/reset-password/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || "Failed to request password reset")
    }

    return await response.json()
  }

  /**
   * Confirm password reset with token
   */
  async confirmResetPassword(token: string, password: string): Promise<{ message: string }> {
    const response = await fetch(`${API_URL}/auth/reset-password/confirm/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, password }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || "Failed to reset password")
    }

    return await response.json()
  }

  /**
   * Refresh access token using refresh token
   */
  async refreshToken(refreshToken: string): Promise<{ access: string }> {
    try {
      // Use mock service for testing
      const response = await mockAuthService.refreshToken(refreshToken)

      // Update access token in cookies
      const cookieOptions = "path=/; max-age=3600; SameSite=Lax"
      document.cookie = `accessToken=${response.access}; ${cookieOptions}` // 1 hour

      return response
    } catch (error) {
      throw new Error("Failed to refresh token")
    }
  }

  /**
   * Logout user by removing tokens and role
   */
  logout(): void {
    // Remove all auth-related cookies with proper path and SameSite attributes
    const cookieOptions = "path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax"
    document.cookie = `accessToken=; ${cookieOptions}`
    document.cookie = `refreshToken=; ${cookieOptions}`
    document.cookie = `userRole=; ${cookieOptions}`
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.getAccessToken()
  }

  /**
   * Get current access token
   */
  getAccessToken(): string | null {
    const cookies = document.cookie.split(";")
    const tokenCookie = cookies.find(cookie => cookie.trim().startsWith("accessToken="))
    return tokenCookie ? tokenCookie.split("=")[1] : null
  }

  /**
   * Get current user role
   */
  getUserRole(): string | null {
    const cookies = document.cookie.split(";")
    const roleCookie = cookies.find(cookie => cookie.trim().startsWith("userRole="))
    return roleCookie ? roleCookie.split("=")[1] : null
  }
}

export const authService = new AuthService()
