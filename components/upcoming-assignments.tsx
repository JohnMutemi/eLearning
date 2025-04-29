import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock } from "lucide-react"

const assignments = [
  {
    id: 1,
    title: "React Component Architecture",
    course: "Introduction to React",
    dueDate: "May 5, 2025",
    daysLeft: 6,
    status: "pending",
  },
  {
    id: 2,
    title: "Python Data Structures",
    course: "Advanced Python Programming",
    dueDate: "May 3, 2025",
    daysLeft: 4,
    status: "pending",
  },
  {
    id: 3,
    title: "Data Visualization Project",
    course: "Data Science Fundamentals",
    dueDate: "May 10, 2025",
    daysLeft: 11,
    status: "pending",
  },
]

export function UpcomingAssignments() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Upcoming Assignments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {assignments.map((assignment) => (
            <div key={assignment.id} className="flex flex-col space-y-2 rounded-lg border p-3">
              <div className="flex items-start justify-between">
                <h3 className="font-medium">{assignment.title}</h3>
                <Badge variant={assignment.daysLeft <= 5 ? "destructive" : "outline"}>
                  {assignment.daysLeft} days left
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{assignment.course}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{assignment.dueDate}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>Due in {assignment.daysLeft} days</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
