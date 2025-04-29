import { authService } from "./auth-service"
import { API_URL } from "@/config"

/**
 * Base API client with authentication and refresh token handling
 */
class ApiClient {
  /**
   * Make an authenticated API request
   */
  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_URL}${endpoint}`

    // Get the access token
    const token = authService.getAccessToken()

    // Set up headers with authentication
    const headers = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    }

    // Make the request
    const response = await fetch(url, {
      ...options,
      headers,
    })

    // Handle unauthorized errors (401) by trying to refresh the token
    if (response.status === 401) {
      const refreshToken = localStorage.getItem("refreshToken")

      // If we have a refresh token, try to get a new access token
      if (refreshToken) {
        try {
          await authService.refreshToken(refreshToken)

          // Retry the request with the new token
          return this.request(endpoint, options)
        } catch (error) {
          // If refresh fails, log the user out
          authService.logout()
          window.location.href = "/auth/login"
          throw new Error("Session expired. Please login again.")
        }
      } else {
        // No refresh token available
        authService.logout()
        window.location.href = "/auth/login"
        throw new Error("Authentication required. Please login.")
      }
    }

    // Handle other error responses
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.detail || `API request failed with status ${response.status}`)
    }

    // Parse and return the response data
    return await response.json()
  }

  // Convenience methods for common HTTP verbs
  async get<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "GET" })
  }

  async post<T>(endpoint: string, data?: any, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async put<T>(endpoint: string, data?: any, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  async patch<T>(endpoint: string, data?: any, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: JSON.stringify(data),
    })
  }

  async delete<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "DELETE" })
  }
}

export const apiClient = new ApiClient()
