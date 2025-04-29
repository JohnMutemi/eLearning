"use client"

import { useState } from "react"
import { CourseHeader } from "./course-header"
import { CourseSidebar } from "./course-sidebar"
import { CourseContent } from "./course-content"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

export interface Lesson {
  id: number
  title: string
  duration?: string
  type: "video" | "quiz" | "assignment" | "text"
  completed: boolean
  content: any
}

export interface Module {
  id: number
  title: string
  lessons: Lesson[]
}

export interface Instructor {
  name: string
  title: string
  bio: string
  avatar: string
}

export interface Course {
  id: number
  title: string
  description: string
  instructor: Instructor
  coverImage: string
  duration: string
  level: string
  rating: number
  reviewCount: number
  enrolledCount: number
  lastUpdated: string
  modules: Module[]
}

interface CourseDetailProps {
  course: Course
}

export function CourseDetail({ course }: CourseDetailProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeModuleId, setActiveModuleId] = useState(course.modules[0].id)
  const [activeLessonId, setActiveLessonId] = useState(course.modules[0].lessons[0].id)

  // Find the active lesson
  const activeLesson = course.modules.flatMap((module) => module.lessons).find((lesson) => lesson.id === activeLessonId)

  // Calculate course progress
  const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0)
  const completedLessons = course.modules.reduce(
    (acc, module) => acc + module.lessons.filter((lesson) => lesson.completed).length,
    0,
  )
  const progress = Math.round((completedLessons / totalLessons) * 100)

  return (
    <div className="flex h-screen flex-col md:flex-row">
      {/* Mobile sidebar toggle */}
      <div className="flex items-center border-b bg-background p-4 md:hidden">
        <Button variant="outline" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>
        <h1 className="ml-4 truncate text-lg font-semibold">{course.title}</h1>
      </div>

      {/* Course sidebar */}
      <CourseSidebar
        course={course}
        activeModuleId={activeModuleId}
        activeLessonId={activeLessonId}
        setActiveModuleId={setActiveModuleId}
        setActiveLessonId={setActiveLessonId}
        progress={progress}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main content area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <CourseHeader course={course} progress={progress} />
        <CourseContent lesson={activeLesson} />
      </div>
    </div>
  )
}
