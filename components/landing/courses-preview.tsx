import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

const featuredCourses = [
  {
    id: 1,
    title: "Introduction to React",
    description: "Learn the fundamentals of React and build your first application",
    instructor: "Sarah Johnson",
    image: "/placeholder.svg?height=200&width=400",
    category: "Web Development",
    price: "$49.99",
    rating: 4.8,
    students: 1245,
  },
  {
    id: 2,
    title: "Advanced Python Programming",
    description: "Master Python with advanced concepts and real-world applications",
    instructor: "Michael Chen",
    image: "/placeholder.svg?height=200&width=400",
    category: "Programming",
    price: "$59.99",
    rating: 4.9,
    students: 2341,
  },
  {
    id: 3,
    title: "Data Science Fundamentals",
    description: "Introduction to data analysis, visualization, and machine learning",
    instructor: "Emily Rodriguez",
    image: "/placeholder.svg?height=200&width=400",
    category: "Data Science",
    price: "$54.99",
    rating: 4.7,
    students: 1876,
  },
]

export function CoursesPreview() {
  return (
    <section id="courses" className="py-16 md:py-24">
      <div className="container">
        <div className="mx-auto mb-12 max-w-[800px] text-center md:mb-16">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Featured Courses</h2>
          <p className="text-muted-foreground md:text-lg">
            Explore our most popular courses taught by industry-leading experts.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {featuredCourses.map((course) => (
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
                <Button className="w-full" asChild>
                  <Link href="/auth/register">Enroll Now</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" size="lg" asChild>
            <Link href="/courses">View All Courses</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
