import { DashboardLayout } from "@/components/dashboard-layout"
import { WelcomeBanner } from "@/components/welcome-banner"
import { CourseGrid } from "@/components/course-grid"
import { UpcomingAssignments } from "@/components/upcoming-assignments"
import { RecentDiscussions } from "@/components/recent-discussions"

export default function LearnerDashboardPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 p-4 md:p-6">
        <WelcomeBanner />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <CourseGrid />
          </div>
          <div className="space-y-6">
            <UpcomingAssignments />
            <RecentDiscussions />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
