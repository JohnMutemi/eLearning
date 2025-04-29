import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function TutorWelcomeBanner() {
  return (
    <Card className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
      <CardContent className="p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold md:text-3xl">Welcome back, Sarah!</h1>
            <p className="text-purple-100">You have 5 pending assignments to grade and 3 new student enrollments.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" className="bg-white text-indigo-600 hover:bg-purple-100">
              Create Course
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-purple-600">
              View Enrollments
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
