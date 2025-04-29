import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const recentActivity = [
  {
    id: 1,
    user: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg",
      initials: "SJ",
      role: "tutor",
    },
    action: "created a new course",
    item: "Advanced React Patterns",
    time: "2 hours ago",
    status: "pending",
  },
  {
    id: 2,
    user: {
      name: "Michael Chen",
      avatar: "/placeholder.svg",
      initials: "MC",
      role: "tutor",
    },
    action: "updated course content",
    item: "Python for Data Science",
    time: "5 hours ago",
    status: "approved",
  },
  {
    id: 3,
    user: {
      name: "Admin User",
      avatar: "/placeholder.svg",
      initials: "AU",
      role: "admin",
    },
    action: "modified system settings",
    item: "Payment Gateway Configuration",
    time: "1 day ago",
    status: "completed",
  },
  {
    id: 4,
    user: {
      name: "Emily Rodriguez",
      avatar: "/placeholder.svg",
      initials: "ER",
      role: "learner",
    },
    action: "reported content",
    item: "Discussion Forum Post #1234",
    time: "1 day ago",
    status: "pending",
  },
  {
    id: 5,
    user: {
      name: "John Doe",
      avatar: "/placeholder.svg",
      initials: "JD",
      role: "learner",
    },
    action: "requested refund",
    item: "Introduction to React",
    time: "2 days ago",
    status: "pending",
  },
]

export function AdminRecentActivity() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Platform Activity</CardTitle>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentActivity.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.name} />
                      <AvatarFallback>{activity.user.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{activity.user.name}</div>
                      <div className="text-xs text-muted-foreground capitalize">{activity.user.role}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">{activity.action}</div>
                  <div className="text-xs text-muted-foreground">{activity.item}</div>
                </TableCell>
                <TableCell>{activity.time}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      activity.status === "pending"
                        ? "border-yellow-500 bg-yellow-50 text-yellow-700"
                        : activity.status === "approved"
                          ? "border-green-500 bg-green-50 text-green-700"
                          : "border-blue-500 bg-blue-50 text-blue-700"
                    }
                  >
                    {activity.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
