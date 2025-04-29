import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"
import Link from "next/link"

const courses = [
  {
    id: 1,
    title: "Introduction to React",
    description: "Learn the fundamentals of React and build your first application",
    instructor: "Sarah Johnson",
    progress: 65,
    image: "/placeholder.svg?height=200&width=400",
    category: "Web Development",
  },
  {
    id: 2,
    title: "Advanced Python Programming",
    description: "Master Python with advanced concepts and real-world applications",
    instructor: "Michael Chen",
    progress: 32,
    image: "/placeholder.svg?height=200&width=400",
    category: "Programming",
  },
  {
    id: 3,
    title: "Data Science Fundamentals",
    description: "Introduction to data analysis, visualization, and machine learning",
    instructor: "Emily Rodriguez",
    progress: 78,
    image: "/placeholder.svg?height=200&width=400",
    category: "Data Science",
  },
  {
    id: 4,
    title: "UX/UI Design Principles",
    description: "Learn the core principles of user experience and interface design",
    instructor: "David Kim",
    progress: 15,
    image: "/placeholder.svg?height=200&width=400",
    category: "Design",
  },
]

export function CourseGrid() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold md:text-2xl">My Courses</h2>
        <Button variant="outline" size="sm" asChild>
          <Link href="/courses">View All</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {courses.map((course) => (
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
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button className="w-full" asChild>
                <Link href={`/courses/${course.id}`}>Continue Learning</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
