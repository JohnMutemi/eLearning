"use client"
import { DashboardLayout } from "@/components/dashboard-layout"
import { UserManagement } from "@/components/admin/user-management"

export default function AdminUsersPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 p-4 md:p-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold md:text-3xl">User Management</h1>
          <p className="text-muted-foreground">Manage user accounts and permissions</p>
        </div>

        <UserManagement />
      </div>
    </DashboardLayout>
  )
}
