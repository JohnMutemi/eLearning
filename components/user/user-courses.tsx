"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Calendar, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { userService, type User } from "@/services/user-service"

// Mock course data
const enrolledCourses = [
  {
    id: 1,
    title: "Introduction to React",
    description: "Learn the fundamentals of React and build your first application",
    instructor: "Sarah Johnson",
    progress: 65,
    image: "/placeholder.svg?height=200&width=400",
    category: "Web Development",
    lastAccessed: "2 days ago",
    dueDate: "June 15, 2024",
    nextLesson: "Component Lifecycle",
  },
  {
    id: 2,
    title: "Advanced Python Programming",
    description: "Master Python with advanced concepts and real-world applications",
    instructor: "Michael Chen",
    progress: 32,
    image: "/placeholder.svg?height=200&width=400",
    category: "Programming",
    lastAccessed: "1 week ago",
    dueDate: "May 30, 2024",
    nextLesson: "Decorators and Metaclasses",
  },
  {
    id: 3,
    title: "Data Science Fundamentals",
    description: "Introduction to data analysis, visualization, and machine learning",
    instructor: "Emily Rodriguez",
    progress: 78,
    image: "/placeholder.svg?height=200&width=400",
    category: "Data Science",
    lastAccessed: "3 days ago",
    dueDate: "July 10, 2024",
    nextLesson: "Classification Algorithms",
  },
]

const completedCourses = [
  {
    id: 4,
    title: "HTML & CSS Basics",
    description: "Learn the building blocks of the web",
    instructor: "David Kim",
    completedDate: "March 15, 2024",
    image: "/placeholder.svg?height=200&width=400",
    category: "Web Development",
    grade: "A",
    certificateId: "CERT-12345",
  },
  {
    id: 5,
    title: "JavaScript Fundamentals",
    description: "Master the core concepts of JavaScript programming",
    instructor: "Jennifer Lee",
    completedDate: "January 10, 2024",
    image: "/placeholder.svg?height=200&width=400",
    category: "Programming",
    grade: "A-",
    certificateId: "CERT-67890",
  },
]

const recommendedCourses = [
  {
    id: 6,
    title: "Node.js Backend Development",
    description: "Build scalable backend applications with Node.js",
    instructor: "Marcus Allen",
    image: "/placeholder.svg?height=200&width=400",
    category: "Web Development",
    price: "$49.99",
    rating: 4.8,
    students: 1245,
    level: "Intermediate",
  },
  {
    id: 7,
    title: "React Native Mobile Apps",
    description: "Create cross-platform mobile applications with React Native",
    instructor: "Sarah Johnson",
    image: "/placeholder.svg?height=200&width=400",
    category: "Mobile Development",
    price: "$59.99",
    rating: 4.9,
    students: 2341,
    level: "Intermediate",
  },
  {
    id: 8,
    title: "Advanced React Patterns",
    description: "Master advanced React patterns and optimization techniques",
    instructor: "James Wilson",
    image: "/placeholder.svg?height=200&width=400",
    category: "Web Development",
    price: "$69.99",
    rating: 4.7,
    students: 876,
    level: "Advanced",
  },
]

interface UserCoursesProps {
  userId: number
}

export function UserCourses({ userId }: UserCoursesProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true)
        const userData = await userService.getUserById(userId)
        setUser(userData)
      } catch (error) {
        console.error("Failed to fetch user data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [userId])

  if (isLoading) {
    return (
      <Card className="animate-pulse">
        <CardHeader>
          <div className="h-7 w-1/3 bg-muted rounded"></div>
          <div className="h-5 w-1/2 bg-muted rounded"></div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="h-10 w-1/4 bg-muted rounded"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-64 bg-muted rounded"></div>
            <div className="h-64 bg-muted rounded"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Learning Journey</CardTitle>
        <CardDescription>Track your progress and explore new courses to enhance your skills</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="enrolled" className="space-y-6">
          <TabsList>
            <TabsTrigger value="enrolled">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="recommended">Recommended</TabsTrigger>
          </TabsList>

          <TabsContent value="enrolled" className="space-y-6">
            {enrolledCourses.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                <h3 className="mt-4 text-lg font-medium">No courses in progress</h3>
                <p className="mt-2 text-muted-foreground">
                  You haven't enrolled in any courses yet. Browse our catalog to get started.
                </p>
                <Button className="mt-4" asChild>
                  <Link href="/courses">Browse Courses</Link>
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {enrolledCourses.map((course) => (
                  <div key={course.id} className="overflow-hidden rounded-lg border">
                    <div className="relative h-48">
                      <Image
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        fill
                        className="object-cover"
                      />
                      <Badge className="absolute right-2 top-2">{course.category}</Badge>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold">{course.title}</h3>
                      <p className="text-sm text-muted-foreground">{course.instructor}</p>

                      <div className="mt-4 space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>

                      <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>Last accessed: {course.lastAccessed}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>Next due date: {course.dueDate}</span>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-sm font-medium">Next: {course.nextLesson}</span>
                        <Button size="sm" asChild>
                          <Link href={`/courses/${course.id}`}>Continue</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            {completedCourses.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                <h3 className="mt-4 text-lg font-medium">No completed courses yet</h3>
                <p className="mt-2 text-muted-foreground">You haven't completed any courses yet. Keep learning!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {completedCourses.map((course) => (
                  <div key={course.id} className="overflow-hidden rounded-lg border">
                    <div className="relative h-48">
                      <Image
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        fill
                        className="object-cover"
                      />
                      <Badge className="absolute right-2 top-2">{course.category}</Badge>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold">{course.title}</h3>
                      <p className="text-sm text-muted-foreground">{course.instructor}</p>

                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Completed: {course.completedDate}</span>
                        <Badge variant="outline">Grade: {course.grade}</Badge>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Certificate: {course.certificateId}</span>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            View Certificate
                          </Button>
                          <Button size="sm" variant="outline" asChild>
                            <Link href={`/courses/${course.id}`}>Review</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="recommended" className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {recommendedCourses.map((course) => (
                <div key={course.id} className="overflow-hidden rounded-lg border">
                  <div className="relative h-48">
                    <Image src={course.image || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
                    <Badge className="absolute right-2 top-2">{course.category}</Badge>
                  </div>
                  <div className="p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <Badge variant="outline">{course.level}</Badge>
                    </div>
                    <h3 className="text-lg font-bold">{course.title}</h3>
                    <p className="text-sm text-muted-foreground truncate">{course.description}</p>
                    <p className="mt-2 text-sm">Instructor: {course.instructor}</p>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="font-bold">{course.price}</div>
                      <div className="flex items-center gap-1 text-sm">
                        <span className="text-yellow-500">★</span>
                        <span>{course.rating}</span>
                        <span className="text-muted-foreground">({course.students})</span>
                      </div>
                    </div>

                    <Button className="mt-4 w-full" asChild>
                      <Link href={`/courses/${course.id}`}>View Course</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
