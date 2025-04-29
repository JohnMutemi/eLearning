import { DashboardLayout } from "@/components/dashboard-layout"
import { TutorWelcomeBanner } from "@/components/tutor/tutor-welcome-banner"
import { TutorCourseGrid } from "@/components/tutor/tutor-course-grid"
import { TutorStats } from "@/components/tutor/tutor-stats"
import { TutorStudentActivity } from "@/components/tutor/tutor-student-activity"

export default function TutorDashboardPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 p-4 md:p-6">
        <TutorWelcomeBanner />
        <TutorStats />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <TutorCourseGrid />
          </div>
          <div>
            <TutorStudentActivity />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
