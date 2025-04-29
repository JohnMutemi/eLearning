import { API_URL } from "@/config"

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
    const response = await fetch(`${API_URL}/auth/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || "Failed to login")
    }

    const data = await response.json()

    // Store tokens in localStorage
    localStorage.setItem("accessToken", data.access)
    localStorage.setItem("refreshToken", data.refresh)

    return data
  }

  /**
   * Register a new user
   */
  async register(userData: RegisterData): Promise<{ message: string }> {
    const response = await fetch(`${API_URL}/auth/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
        first_name: userData.firstName,
        last_name: userData.lastName,
        role: userData.role,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || "Failed to register")
    }

    return await response.json()
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
    const response = await fetch(`${API_URL}/auth/token/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: refreshToken }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || "Failed to refresh token")
    }

    const data = await response.json()

    // Update access token in localStorage
    localStorage.setItem("accessToken", data.access)

    return data
  }

  /**
   * Logout user by removing tokens
   */
  logout(): void {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem("accessToken")
  }

  /**
   * Get current access token
   */
  getAccessToken(): string | null {
    return localStorage.getItem("accessToken")
  }
}

export const authService = new AuthService()
