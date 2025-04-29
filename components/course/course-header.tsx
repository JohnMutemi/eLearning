import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { ChevronLeft, MessageSquare, Share2 } from "lucide-react"
import Link from "next/link"
import type { Course } from "./course-detail"

interface CourseHeaderProps {
  course: Course
  progress: number
}

export function CourseHeader({ course, progress }: CourseHeaderProps) {
  return (
    <div className="border-b bg-background p-4 md:p-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/courses">
                <ChevronLeft className="h-5 w-5" />
                <span className="sr-only">Back to courses</span>
              </Link>
            </Button>
            <h1 className="text-xl font-bold md:text-2xl">{course.title}</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <MessageSquare className="h-4 w-4" />
              <span className="sr-only">Discussions</span>
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
              <span className="sr-only">Share</span>
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Progress value={progress} className="h-2" />
          <span className="text-sm font-medium">{progress}%</span>
        </div>
      </div>
    </div>
  )
}
