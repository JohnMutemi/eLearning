import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

const tutorCourses = [
  {
    id: 1,
    title: "Introduction to React",
    description: "Learn the fundamentals of React and build your first application",
    students: 543,
    image: "/placeholder.svg?height=200&width=400",
    category: "Web Development",
    lastUpdated: "2 days ago",
    status: "published",
    rating: 4.8,
    reviewCount: 245,
  },
  {
    id: 2,
    title: "Advanced React Patterns",
    description: "Master advanced React patterns and optimization techniques",
    students: 321,
    image: "/placeholder.svg?height=200&width=400",
    category: "Web Development",
    lastUpdated: "1 week ago",
    status: "published",
    rating: 4.9,
    reviewCount: 132,
  },
  {
    id: 3,
    title: "React Native for Beginners",
    description: "Build cross-platform mobile apps with React Native",
    students: 210,
    image: "/placeholder.svg?height=200&width=400",
    category: "Mobile Development",
    lastUpdated: "3 days ago",
    status: "published",
    rating: 4.7,
    reviewCount: 98,
  },
  {
    id: 4,
    title: "State Management with Redux",
    description: "Learn how to manage application state with Redux",
    students: 169,
    image: "/placeholder.svg?height=200&width=400",
    category: "Web Development",
    lastUpdated: "Draft saved 5 hours ago",
    status: "draft",
    rating: 0,
    reviewCount: 0,
  },
]

export function TutorCourseGrid() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold md:text-2xl">My Courses</h2>
        <Button variant="outline" size="sm" asChild>
          <Link href="/courses/create">Create New Course</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {tutorCourses.map((course) => (
          <Card key={course.id} className="overflow-hidden">
            <div className="relative h-48">
              <Image src={course.image || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
              <Badge className="absolute right-2 top-2">{course.category}</Badge>
              {course.status === "draft" && (
                <Badge variant="outline" className="absolute left-2 top-2 bg-background">
                  Draft
                </Badge>
              )}
            </div>
            <CardHeader className="p-4">
              <CardTitle className="line-clamp-1">{course.title}</CardTitle>
              <CardDescription className="line-clamp-2">{course.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="mb-2 flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium">{course.students}</span> students enrolled
                </div>
                {course.status === "published" && (
                  <div className="flex items-center gap-1 text-sm">
                    <span className="text-yellow-500">★</span>
                    <span>{course.rating}</span>
                    <span className="text-muted-foreground">({course.reviewCount})</span>
                  </div>
                )}
              </div>
              <div className="text-sm text-muted-foreground">Last updated: {course.lastUpdated}</div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <div className="flex w-full gap-2">
                <Button className="flex-1" asChild>
                  <Link href={`/courses/${course.id}/manage`}>
                    {course.status === "draft" ? "Continue Editing" : "Manage Course"}
                  </Link>
                </Button>
                {course.status === "published" && (
                  <Button variant="outline" asChild>
                    <Link href={`/courses/${course.id}`}>View</Link>
                  </Button>
                )}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
