"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { ChevronDown, ChevronRight, CheckCircle2, Circle, FileText, PlayCircle } from "lucide-react"
import type { Course, Module, Lesson } from "./course-detail"

interface CourseSidebarProps {
  course: Course
  activeModuleId: number
  activeLessonId: number
  setActiveModuleId: (id: number) => void
  setActiveLessonId: (id: number) => void
  progress: number
  isOpen: boolean
  onClose: () => void
}

export function CourseSidebar({
  course,
  activeModuleId,
  activeLessonId,
  setActiveModuleId,
  setActiveLessonId,
  progress,
  isOpen,
  onClose,
}: CourseSidebarProps) {
  const [expandedModules, setExpandedModules] = useState<Record<number, boolean>>(
    course.modules.reduce(
      (acc, module) => {
        acc[module.id] = module.id === activeModuleId
        return acc
      },
      {} as Record<number, boolean>,
    ),
  )

  const toggleModule = (moduleId: number) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }))
  }

  const handleLessonClick = (moduleId: number, lessonId: number) => {
    setActiveModuleId(moduleId)
    setActiveLessonId(lessonId)
    onClose()
  }

  const getLessonIcon = (lesson: Lesson) => {
    if (lesson.completed) {
      return <CheckCircle2 className="h-4 w-4 text-primary" />
    }

    switch (lesson.type) {
      case "video":
        return <PlayCircle className="h-4 w-4 text-muted-foreground" />
      case "quiz":
      case "assignment":
        return <FileText className="h-4 w-4 text-muted-foreground" />
      default:
        return <Circle className="h-4 w-4 text-muted-foreground" />
    }
  }

  const renderModules = (modules: Module[]) => {
    return modules.map((module) => (
      <div key={module.id} className="border-b last:border-b-0">
        <Button
          variant="ghost"
          className="flex w-full items-center justify-between rounded-none px-4 py-3 font-medium hover:bg-muted"
          onClick={() => toggleModule(module.id)}
        >
          <span className="truncate">{module.title}</span>
          {expandedModules[module.id] ? (
            <ChevronDown className="h-4 w-4 shrink-0" />
          ) : (
            <ChevronRight className="h-4 w-4 shrink-0" />
          )}
        </Button>

        {expandedModules[module.id] && (
          <div className="bg-muted/50 py-1">
            {module.lessons.map((lesson) => (
              <Button
                key={lesson.id}
                variant="ghost"
                className={`flex w-full items-center justify-start gap-3 rounded-none px-6 py-2 text-sm font-normal ${
                  lesson.id === activeLessonId ? "bg-muted font-medium" : ""
                }`}
                onClick={() => handleLessonClick(module.id, lesson.id)}
              >
                {getLessonIcon(lesson)}
                <span className="truncate">{lesson.title}</span>
                {lesson.duration && <span className="ml-auto text-xs text-muted-foreground">{lesson.duration}</span>}
              </Button>
            ))}
          </div>
        )}
      </div>
    ))
  }

  const sidebarContent = (
    <div className="flex h-full flex-col">
      <div className="border-b p-4">
        <h2 className="text-lg font-semibold">Course Content</h2>
        <div className="mt-2 flex items-center gap-2">
          <Progress value={progress} className="h-2" />
          <span className="text-sm font-medium">{progress}% complete</span>
        </div>
      </div>
      <ScrollArea className="flex-1">{renderModules(course.modules)}</ScrollArea>
    </div>
  )

  // Mobile view uses Sheet component
  return (
    <>
      {/* Mobile sidebar */}
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="left" className="w-[300px] p-0 sm:max-w-none">
          {sidebarContent}
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <div className="hidden w-[300px] border-r md:block">{sidebarContent}</div>
    </>
  )
}
