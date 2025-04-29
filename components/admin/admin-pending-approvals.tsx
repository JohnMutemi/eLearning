import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle } from "lucide-react"

const pendingApprovals = [
  {
    id: 1,
    type: "Course",
    title: "Advanced React Patterns",
    submitter: "Sarah Johnson",
    submittedDate: "May 1, 2024",
  },
  {
    id: 2,
    type: "Course",
    title: "Machine Learning Fundamentals",
    submitter: "Michael Chen",
    submittedDate: "April 30, 2024",
  },
  {
    id: 3,
    type: "Tutor Application",
    title: "David Wilson",
    submitter: "System",
    submittedDate: "April 29, 2024",
  },
  {
    id: 4,
    type: "Payout Request",
    title: "$1,250.00 to Sarah Johnson",
    submitter: "Finance System",
    submittedDate: "April 28, 2024",
  },
]

export function AdminPendingApprovals() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pending Approvals</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pendingApprovals.map((item) => (
            <div key={item.id} className="rounded-lg border p-4">
              <div className="mb-2 flex items-center justify-between">
                <div className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">{item.type}</div>
                <div className="text-xs text-muted-foreground">Submitted: {item.submittedDate}</div>
              </div>
              <h3 className="font-medium">{item.title}</h3>
              <p className="text-sm text-muted-foreground">Submitted by: {item.submitter}</p>
              <div className="mt-4 flex justify-end gap-2">
                <Button variant="outline" size="sm" className="gap-1 text-red-600 hover:bg-red-50 hover:text-red-700">
                  <XCircle className="h-4 w-4" />
                  Reject
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1 text-green-600 hover:bg-green-50 hover:text-green-700"
                >
                  <CheckCircle className="h-4 w-4" />
                  Approve
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
