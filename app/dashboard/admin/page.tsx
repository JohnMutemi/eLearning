import { DashboardLayout } from "@/components/dashboard-layout"
import { AdminWelcomeBanner } from "@/components/admin/admin-welcome-banner"
import { AdminStats } from "@/components/admin/admin-stats"
import { AdminRecentActivity } from "@/components/admin/admin-recent-activity"
import { AdminPendingApprovals } from "@/components/admin/admin-pending-approvals"

export default function AdminDashboardPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 p-4 md:p-6">
        <AdminWelcomeBanner />
        <AdminStats />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <AdminRecentActivity />
          </div>
          <div>
            <AdminPendingApprovals />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
