import { LoginResponse, RegisterData } from "./auth-service"

// Mock user database
const mockUsers = [
  {
    id: 1,
    email: "admin@example.com",
    password: "admin123", // In a real app, this would be hashed
    first_name: "Admin",
    last_name: "User",
    role: "admin" as const,
  },
  {
    id: 2,
    email: "tutor@example.com",
    password: "tutor123",
    first_name: "John",
    last_name: "Doe",
    role: "tutor" as const,
  },
  {
    id: 3,
    email: "learner@example.com",
    password: "learner123",
    first_name: "Jane",
    last_name: "Smith",
    role: "learner" as const,
  },
]

class MockAuthService {
  private users = [...mockUsers]

  async login(email: string, password: string): Promise<LoginResponse> {
    const user = this.users.find(u => u.email === email && u.password === password)
    
    if (!user) {
      throw new Error("Invalid credentials")
    }

    // Generate mock tokens
    const accessToken = `mock-access-token-${user.id}`
    const refreshToken = `mock-refresh-token-${user.id}`

    return {
      access: accessToken,
      refresh: refreshToken,
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role,
      },
    }
  }

  async register(userData: RegisterData): Promise<{ message: string }> {
    // Check if user already exists
    if (this.users.some(u => u.email === userData.email)) {
      throw new Error("User already exists")
    }

    // Create new user
    const newUser = {
      id: this.users.length + 1,
      email: userData.email,
      password: userData.password, // In a real app, this would be hashed
      first_name: userData.firstName,
      last_name: userData.lastName,
      role: userData.role,
    }

    this.users.push(newUser)

    return {
      message: "Registration successful",
    }
  }

  async refreshToken(refreshToken: string): Promise<{ access: string }> {
    // Extract user ID from refresh token
    const userId = parseInt(refreshToken.split("-").pop() || "0")
    const user = this.users.find(u => u.id === userId)

    if (!user) {
      throw new Error("Invalid refresh token")
    }

    return {
      access: `mock-access-token-${user.id}`,
    }
  }
}

export const mockAuthService = new MockAuthService() 