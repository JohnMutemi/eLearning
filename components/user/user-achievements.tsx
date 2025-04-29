"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  BookOpen,
  Check,
  CheckCircle2,
  Code,
  FileText,
  GraduationCap,
  Medal,
  Target,
  Trophy,
  Users,
} from "lucide-react"
import { userService, type User } from "@/services/user-service"

// Define achievement types
type AchievementType = "course" | "assignment" | "social" | "milestone"

interface Achievement {
  id: string
  title: string
  description: string
  type: AchievementType
  icon: JSX.Element
  unlocked: boolean
  progress?: number
  unlockedDate?: string
  requirement: string
}

// Mock achievements data
const achievements: Achievement[] = [
  {
    id: "course-1",
    title: "First Steps",
    description: "Complete your first course",
    type: "course",
    icon: <BookOpen className="h-8 w-8" />,
    unlocked: true,
    unlockedDate: "January 15, 2024",
    requirement: "Complete 1 course",
  },
  {
    id: "course-2",
    title: "Knowledge Seeker",
    description: "Complete 5 courses",
    type: "course",
    icon: <GraduationCap className="h-8 w-8" />,
    unlocked: false,
    progress: 40, // 2/5 = 40%
    requirement: "Complete 5 courses",
  },
  {
    id: "course-3",
    title: "Master Learner",
    description: "Complete 10 courses with an average grade of A",
    type: "course",
    icon: <Trophy className="h-8 w-8" />,
    unlocked: false,
    progress: 20, // 2/10 = 20%
    requirement: "Complete 10 courses with A grade",
  },
  {
    id: "assignment-1",
    title: "Assignment Ace",
    description: "Submit 20 assignments on time",
    type: "assignment",
    icon: <FileText className="h-8 w-8" />,
    unlocked: false,
    progress: 60, // 12/20 = 60%
    requirement: "Submit 20 assignments on time",
  },
  {
    id: "assignment-2",
    title: "Perfect Submission",
    description: "Get a perfect score on 5 assignments",
    type: "assignment",
    icon: <CheckCircle2 className="h-8 w-8" />,
    unlocked: true,
    unlockedDate: "March 05, 2024",
    requirement: "Get 100% on 5 assignments",
  },
  {
    id: "social-1",
    title: "Helpful Peer",
    description: "Assist other students by answering 10 questions in the discussion forums",
    type: "social",
    icon: <Users className="h-8 w-8" />,
    unlocked: false,
    progress: 30, // 3/10 = 30%
    requirement: "Answer 10 questions in forums",
  },
  {
    id: "milestone-1",
    title: "30-Day Streak",
    description: "Log in and engage with course content for 30 consecutive days",
    type: "milestone",
    icon: <Target className="h-8 w-8" />,
    unlocked: false,
    progress: 70, // 21/30 = 70%
    requirement: "30 day login streak",
  },
  {
    id: "milestone-2",
    title: "Code Master",
    description: "Complete all programming challenges in the Web Development track",
    type: "milestone",
    icon: <Code className="h-8 w-8" />,
    unlocked: false,
    progress: 45, // 45%
    requirement: "Complete all programming challenges",
  },
]

interface UserAchievementsProps {
  userId: number
}

export function UserAchievements({ userId }: UserAchievementsProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<AchievementType | "all">("all")

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true)
        const userData = await userService.getUserById(userId)
        setUser(userData)
      } catch (error) {
        console.error("Failed to fetch user data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [userId])

  // Filter achievements based on the selected type or show all
  const filteredAchievements =
    filter === "all" ? achievements : achievements.filter((achievement) => achievement.type === filter)

  // Separate unlocked and in-progress achievements
  const unlockedAchievements = filteredAchievements.filter((a) => a.unlocked)
  const inProgressAchievements = filteredAchievements.filter((a) => !a.unlocked)

  // Calculate achievement statistics
  const totalAchievements = achievements.length
  const unlockedCount = achievements.filter((a) => a.unlocked).length
  const completionPercentage = Math.round((unlockedCount / totalAchievements) * 100)

  // Get achievement counts by type
  const courseAchievements = achievements.filter((a) => a.type === "course")
  const assignmentAchievements = achievements.filter((a) => a.type === "assignment")
  const socialAchievements = achievements.filter((a) => a.type === "social")
  const milestoneAchievements = achievements.filter((a) => a.type === "milestone")

  if (isLoading) {
    return (
      <Card className="animate-pulse">
        <CardHeader>
          <div className="h-7 w-1/3 bg-muted rounded"></div>
          <div className="h-5 w-1/2 bg-muted rounded"></div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="h-10 bg-muted rounded"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="h-20 bg-muted rounded"></div>
            <div className="h-20 bg-muted rounded"></div>
            <div className="h-20 bg-muted rounded"></div>
            <div className="h-20 bg-muted rounded"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Achievements & Badges</CardTitle>
        <CardDescription>Track your learning milestones and achievements</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall progress */}
        <div className="rounded-lg border p-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="font-medium">Achievement Progress</h3>
              <p className="text-sm text-muted-foreground">
                You've unlocked {unlockedCount} out of {totalAchievements} achievements
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Trophy className="h-5 w-5 text-primary" />
              <span className="font-bold">{completionPercentage}%</span>
            </div>
          </div>
          <Progress value={completionPercentage} className="h-2 mt-4" />
        </div>

        {/* Achievement categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            className={`rounded-lg border p-3 text-center transition-colors hover:bg-muted/50 ${filter === "all" ? "bg-muted/50 border-primary" : ""}`}
            onClick={() => setFilter("all")}
          >
            <Medal className="h-6 w-6 mx-auto mb-2 text-primary" />
            <div className="font-medium">All</div>
            <div className="text-sm text-muted-foreground">{totalAchievements} total</div>
          </button>

          <button
            className={`rounded-lg border p-3 text-center transition-colors hover:bg-muted/50 ${filter === "course" ? "bg-muted/50 border-primary" : ""}`}
            onClick={() => setFilter("course")}
          >
            <BookOpen className="h-6 w-6 mx-auto mb-2 text-primary" />
            <div className="font-medium">Courses</div>
            <div className="text-sm text-muted-foreground">{courseAchievements.length} total</div>
          </button>

          <button
            className={`rounded-lg border p-3 text-center transition-colors hover:bg-muted/50 ${filter === "assignment" ? "bg-muted/50 border-primary" : ""}`}
            onClick={() => setFilter("assignment")}
          >
            <FileText className="h-6 w-6 mx-auto mb-2 text-primary" />
            <div className="font-medium">Assignments</div>
            <div className="text-sm text-muted-foreground">{assignmentAchievements.length} total</div>
          </button>

          <button
            className={`rounded-lg border p-3 text-center transition-colors hover:bg-muted/50 ${filter === "social" || filter === "milestone" ? "bg-muted/50 border-primary" : ""}`}
            onClick={() => setFilter(filter === "social" ? "milestone" : "social")}
          >
            {filter === "social" ? (
              <>
                <Target className="h-6 w-6 mx-auto mb-2 text-primary" />
                <div className="font-medium">Milestones</div>
                <div className="text-sm text-muted-foreground">{milestoneAchievements.length} total</div>
              </>
            ) : (
              <>
                <Users className="h-6 w-6 mx-auto mb-2 text-primary" />
                <div className="font-medium">Social</div>
                <div className="text-sm text-muted-foreground">{socialAchievements.length} total</div>
              </>
            )}
          </button>
        </div>

        {/* Unlocked achievements */}
        {unlockedAchievements.length > 0 && (
          <>
            <h3 className="text-lg font-medium pt-2">Unlocked Achievements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {unlockedAchievements.map((achievement) => (
                <div key={achievement.id} className="flex items-center gap-4 rounded-lg border bg-muted/20 p-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{achievement.title}</h4>
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    <p className="mt-1 text-xs text-muted-foreground">Unlocked on {achievement.unlockedDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* In progress achievements */}
        {inProgressAchievements.length > 0 && (
          <>
            <h3 className="text-lg font-medium pt-2">In Progress</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {inProgressAchievements.map((achievement) => (
                <div key={achievement.id} className="flex items-center gap-4 rounded-lg border p-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{achievement.title}</h4>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    {achievement.progress !== undefined && (
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span>{achievement.requirement}</span>
                          <span>{achievement.progress}%</span>
                        </div>
                        <Progress value={achievement.progress} className="h-1" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
