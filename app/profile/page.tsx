"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { UserProfile } from "@/components/user/user-profile"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserCourses } from "@/components/user/user-courses"
import { UserAchievements } from "@/components/user/user-achievements"
import { UserSettings } from "@/components/user/user-settings"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile")

  // In a real application, we would fetch the user data from the API
  // For this example, let's use a placeholder user
  const userId = 1 // This would come from authentication context

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 p-4 md:p-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold md:text-3xl">My Profile</h1>
          <p className="text-muted-foreground">Manage your profile information and account settings</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="courses">My Courses</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <UserProfile userId={userId} />
          </TabsContent>

          <TabsContent value="courses">
            <UserCourses userId={userId} />
          </TabsContent>

          <TabsContent value="achievements">
            <UserAchievements userId={userId} />
          </TabsContent>

          <TabsContent value="settings">
            <UserSettings userId={userId} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
