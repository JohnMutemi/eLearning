import { CourseList } from "@/components/course/course-list"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function CoursesPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 p-4 md:p-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold md:text-3xl">My Courses</h1>
          <p className="text-muted-foreground">Continue learning where you left off</p>
        </div>
        <CourseList />
      </div>
    </DashboardLayout>
  )
}
