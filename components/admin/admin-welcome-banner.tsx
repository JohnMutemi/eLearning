import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function AdminWelcomeBanner() {
  return (
    <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
      <CardContent className="p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold md:text-3xl">Welcome back, Admin!</h1>
            <p className="text-blue-100">
              You have 3 pending course approvals, 5 user reports, and 2 system alerts to review.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" className="bg-white text-indigo-600 hover:bg-blue-100">
              System Status
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-blue-600">
              View Reports
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
