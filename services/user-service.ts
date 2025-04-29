// User types
export interface User {
  id: number
  email: string
  firstName: string
  lastName: string
  role: "learner" | "tutor" | "admin"
  profileImage: string | null
  bio: string | null
  joined: string
  lastActive: string
  location: string | null
  socialLinks: {
    twitter?: string
    linkedin?: string
    website?: string
  }
  preferences: {
    emailNotifications: boolean
    smsNotifications: boolean
    marketingEmails: boolean
    twoFactorAuth: boolean
    darkMode: boolean
  }
}

// Learner-specific data
export interface LearnerProfile extends User {
  enrolledCourses: number
  completedCourses: number
  certificatesEarned: number
  averageGrade: number
  interests: string[]
  currentGoals: string[]
}

// Tutor-specific data
export interface TutorProfile extends User {
  coursesCreated: number
  studentsCount: number
  specializations: string[]
  ratings: {
    average: number
    count: number
  }
  education: string[]
  experience: string[]
}

// Admin-specific data
export interface AdminProfile extends User {
  department: string
  adminSince: string
  permissions: string[]
  managedAreas: string[]
}

// Mock user data
const mockUsers: Array<LearnerProfile | TutorProfile | AdminProfile> = [
  {
    id: 1,
    email: "john.doe@example.com",
    firstName: "John",
    lastName: "Doe",
    role: "learner",
    profileImage: "/placeholder.svg",
    bio: "Passionate learner focusing on web development and UI/UX design.",
    joined: "2023-09-15",
    lastActive: "2024-04-27",
    location: "New York, USA",
    socialLinks: {
      twitter: "johndoe",
      linkedin: "johndoe",
      website: "johndoe.com",
    },
    preferences: {
      emailNotifications: true,
      smsNotifications: false,
      marketingEmails: true,
      twoFactorAuth: false,
      darkMode: true,
    },
    enrolledCourses: 5,
    completedCourses: 2,
    certificatesEarned: 2,
    averageGrade: 92.5,
    interests: ["Web Development", "UI/UX Design", "Mobile Development"],
    currentGoals: ["Complete React Nanodegree", "Build portfolio website"],
  },
  {
    id: 2,
    email: "sarah.johnson@example.com",
    firstName: "Sarah",
    lastName: "Johnson",
    role: "tutor",
    profileImage: "/placeholder.svg",
    bio: "Senior Frontend Developer with 8+ years of experience. Passionate about teaching and mentoring.",
    joined: "2022-05-10",
    lastActive: "2024-04-28",
    location: "San Francisco, USA",
    socialLinks: {
      twitter: "sarahjohnson",
      linkedin: "sarahjohnson",
      website: "sarahjohnson.dev",
    },
    preferences: {
      emailNotifications: true,
      smsNotifications: true,
      marketingEmails: false,
      twoFactorAuth: true,
      darkMode: false,
    },
    coursesCreated: 4,
    studentsCount: 1243,
    specializations: ["React", "JavaScript", "Frontend Development"],
    ratings: {
      average: 4.8,
      count: 245,
    },
    education: ["M.S. Computer Science, Stanford University", "B.S. Software Engineering, MIT"],
    experience: ["Senior Frontend Developer at Google (2020-Present)", "Frontend Developer at Microsoft (2016-2020)"],
  },
  {
    id: 3,
    email: "michael.chen@example.com",
    firstName: "Michael",
    lastName: "Chen",
    role: "tutor",
    profileImage: "/placeholder.svg",
    bio: "Python expert with focus on data science and machine learning applications.",
    joined: "2022-08-20",
    lastActive: "2024-04-26",
    location: "Boston, USA",
    socialLinks: {
      twitter: "michaelchen",
      linkedin: "michaelchen",
    },
    preferences: {
      emailNotifications: true,
      smsNotifications: false,
      marketingEmails: false,
      twoFactorAuth: true,
      darkMode: true,
    },
    coursesCreated: 3,
    studentsCount: 876,
    specializations: ["Python", "Data Science", "Machine Learning"],
    ratings: {
      average: 4.7,
      count: 178,
    },
    education: ["Ph.D. Computer Science, Harvard University", "B.S. Mathematics, Caltech"],
    experience: ["Lead Data Scientist at Amazon (2019-Present)", "Data Scientist at IBM (2015-2019)"],
  },
  {
    id: 4,
    email: "emily.rodriguez@example.com",
    firstName: "Emily",
    lastName: "Rodriguez",
    role: "learner",
    profileImage: "/placeholder.svg",
    bio: "Marketing professional looking to expand digital skills.",
    joined: "2023-12-05",
    lastActive: "2024-04-25",
    location: "Miami, USA",
    socialLinks: {
      linkedin: "emilyrodriguez",
    },
    preferences: {
      emailNotifications: true,
      smsNotifications: true,
      marketingEmails: true,
      twoFactorAuth: false,
      darkMode: false,
    },
    enrolledCourses: 3,
    completedCourses: 1,
    certificatesEarned: 1,
    averageGrade: 88.0,
    interests: ["Digital Marketing", "SEO", "Content Strategy"],
    currentGoals: ["Complete Digital Marketing Certificate", "Learn SEO fundamentals"],
  },
  {
    id: 5,
    email: "admin@example.com",
    firstName: "Admin",
    lastName: "User",
    role: "admin",
    profileImage: "/placeholder.svg",
    bio: "Platform administrator responsible for user and content management.",
    joined: "2022-01-10",
    lastActive: "2024-04-28",
    location: "Chicago, USA",
    socialLinks: {},
    preferences: {
      emailNotifications: true,
      smsNotifications: true,
      marketingEmails: false,
      twoFactorAuth: true,
      darkMode: true,
    },
    department: "Platform Operations",
    adminSince: "2022-01-10",
    permissions: ["user_management", "content_moderation", "system_settings", "analytics"],
    managedAreas: ["Users", "Courses", "Reports", "System Configuration"],
  },
]

class UserService {
  /**
   * Get the current user profile
   */
  async getCurrentUser(): Promise<User> {
    // In a real implementation, this would make an API call
    // Mock implementation for demo
    return mockUsers[0] as User
  }

  /**
   * Get a user profile by ID
   */
  async getUserById(userId: number): Promise<User | null> {
    // In a real implementation, this would make an API call
    // Mock implementation for demo
    const user = mockUsers.find((u) => u.id === userId)
    return user || null
  }

  /**
   * Update user profile
   */
  async updateProfile(userId: number, profileData: Partial<User>): Promise<User> {
    // In a real implementation, this would make an API call
    // Mock implementation for demo
    const userIndex = mockUsers.findIndex((u) => u.id === userId)

    if (userIndex === -1) {
      throw new Error("User not found")
    }

    // Update the user data
    mockUsers[userIndex] = {
      ...mockUsers[userIndex],
      ...profileData,
    }

    return mockUsers[userIndex] as User
  }

  /**
   * Update user preferences
   */
  async updatePreferences(userId: number, preferences: Partial<User["preferences"]>): Promise<User["preferences"]> {
    // In a real implementation, this would make an API call
    // Mock implementation for demo
    const userIndex = mockUsers.findIndex((u) => u.id === userId)

    if (userIndex === -1) {
      throw new Error("User not found")
    }

    // Update the user preferences
    mockUsers[userIndex].preferences = {
      ...mockUsers[userIndex].preferences,
      ...preferences,
    }

    return mockUsers[userIndex].preferences
  }

  /**
   * Get all users (admin only)
   */
  async getAllUsers(): Promise<User[]> {
    // In a real implementation, this would make an API call
    // Mock implementation for demo
    return mockUsers as User[]
  }

  /**
   * Get learner-specific profile
   */
  async getLearnerProfile(userId: number): Promise<LearnerProfile | null> {
    // In a real implementation, this would make an API call
    // Mock implementation for demo
    const user = mockUsers.find((u) => u.id === userId && u.role === "learner")
    return (user as LearnerProfile) || null
  }

  /**
   * Get tutor-specific profile
   */
  async getTutorProfile(userId: number): Promise<TutorProfile | null> {
    // In a real implementation, this would make an API call
    // Mock implementation for demo
    const user = mockUsers.find((u) => u.id === userId && u.role === "tutor")
    return (user as TutorProfile) || null
  }
}

export const userService = new UserService()
