import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function WelcomeBanner() {
  return (
    <Card className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white">
      <CardContent className="p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold md:text-3xl">Welcome back, John!</h1>
            <p className="text-teal-100">You have 3 assignments due this week and 2 new course updates.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" className="bg-white text-emerald-600 hover:bg-teal-100">
              View Assignments
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-teal-600">
              Course Updates
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
