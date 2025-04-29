import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import Link from "next/link"

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
  },
  {
    id: 4,
    title: "UX/UI Design Principles",
    description: "Learn the core principles of user experience and interface design",
    instructor: "David Kim",
    progress: 15,
    image: "/placeholder.svg?height=200&width=400",
    category: "Design",
    lastAccessed: "5 days ago",
  },
]

const availableCourses = [
  {
    id: 5,
    title: "Machine Learning with TensorFlow",
    description: "Build intelligent applications with TensorFlow and Keras",
    instructor: "Alex Johnson",
    image: "/placeholder.svg?height=200&width=400",
    category: "Data Science",
    price: "$49.99",
    rating: 4.8,
    students: 1245,
  },
  {
    id: 6,
    title: "Full-Stack Web Development",
    description: "Learn to build complete web applications from front to back",
    instructor: "Jessica Williams",
    image: "/placeholder.svg?height=200&width=400",
    category: "Web Development",
    price: "$59.99",
    rating: 4.9,
    students: 2341,
  },
  {
    id: 7,
    title: "Mobile App Development with React Native",
    description: "Create cross-platform mobile apps with React Native",
    instructor: "Robert Chen",
    image: "/placeholder.svg?height=200&width=400",
    category: "Mobile Development",
    price: "$54.99",
    rating: 4.7,
    students: 1876,
  },
  {
    id: 8,
    title: "Graphic Design Masterclass",
    description: "Master graphic design principles and tools",
    instructor: "Sophia Garcia",
    image: "/placeholder.svg?height=200&width=400",
    category: "Design",
    price: "$44.99",
    rating: 4.6,
    students: 1532,
  },
]

export function CourseList() {
  return (
    <Tabs defaultValue="enrolled" className="space-y-6">
      <TabsList>
        <TabsTrigger value="enrolled">Enrolled Courses</TabsTrigger>
        <TabsTrigger value="available">Available Courses</TabsTrigger>
      </TabsList>

      <TabsContent value="enrolled" className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {enrolledCourses.map((course) => (
            <Card key={course.id} className="overflow-hidden">
              <div className="relative h-48">
                <Image src={course.image || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
                <Badge className="absolute right-2 top-2">{course.category}</Badge>
              </div>
              <CardHeader className="p-4">
                <CardTitle className="line-clamp-1">{course.title}</CardTitle>
                <CardDescription className="line-clamp-2">{course.description}</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="mb-2 text-sm text-muted-foreground">Instructor: {course.instructor}</div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>
                <div className="mt-2 text-xs text-muted-foreground">Last accessed: {course.lastAccessed}</div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full" asChild>
                  <Link href={`/courses/${course.id}`}>Continue Learning</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="available" className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {availableCourses.map((course) => (
            <Card key={course.id} className="overflow-hidden">
              <div className="relative h-48">
                <Image src={course.image || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
                <Badge className="absolute right-2 top-2">{course.category}</Badge>
              </div>
              <CardHeader className="p-4">
                <CardTitle className="line-clamp-1">{course.title}</CardTitle>
                <CardDescription className="line-clamp-2">{course.description}</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="mb-2 text-sm text-muted-foreground">Instructor: {course.instructor}</div>
                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold">{course.price}</div>
                  <div className="flex items-center gap-1 text-sm">
                    <span className="text-yellow-500">★</span>
                    <span>{course.rating}</span>
                    <span className="text-muted-foreground">({course.students} students)</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full">Enroll Now</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  )
}
