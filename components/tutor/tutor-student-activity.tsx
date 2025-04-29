import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const recentActivity = [
  {
    id: 1,
    student: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg",
      initials: "AJ",
    },
    action: "completed",
    item: "Introduction to React",
    time: "2 hours ago",
  },
  {
    id: 2,
    student: {
      name: "Maria Garcia",
      avatar: "/placeholder.svg",
      initials: "MG",
    },
    action: "submitted",
    item: "React Component Assignment",
    time: "5 hours ago",
  },
  {
    id: 3,
    student: {
      name: "James Wilson",
      avatar: "/placeholder.svg",
      initials: "JW",
    },
    action: "enrolled",
    item: "Advanced React Patterns",
    time: "1 day ago",
  },
  {
    id: 4,
    student: {
      name: "Sophia Lee",
      avatar: "/placeholder.svg",
      initials: "SL",
    },
    action: "asked",
    item: "Question about React Hooks",
    time: "1 day ago",
  },
  {
    id: 5,
    student: {
      name: "David Kim",
      avatar: "/placeholder.svg",
      initials: "DK",
    },
    action: "reviewed",
    item: "Introduction to React",
    time: "2 days ago",
  },
]

export function TutorStudentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Student Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4">
              <Avatar className="h-8 w-8">
                <AvatarImage src={activity.student.avatar || "/placeholder.svg"} alt={activity.student.name} />
                <AvatarFallback>{activity.student.initials}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <p className="text-sm">
                  <span className="font-medium">{activity.student.name}</span>{" "}
                  <span className="text-muted-foreground">{activity.action}</span>{" "}
                  <span className="font-medium">{activity.item}</span>
                </p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
