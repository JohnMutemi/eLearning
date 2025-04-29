import { BookOpen, Calendar, FileText, LayoutDashboard, MessageSquare, MonitorPlay, Users, Zap } from "lucide-react"

const features = [
  {
    icon: LayoutDashboard,
    title: "Intuitive Dashboard",
    description: "Access all your courses, assignments, and progress from a single, user-friendly dashboard.",
  },
  {
    icon: MonitorPlay,
    title: "Interactive Content",
    description: "Engage with video lectures, quizzes, and interactive exercises designed for effective learning.",
  },
  {
    icon: MessageSquare,
    title: "Discussion Forums",
    description: "Collaborate with peers and instructors through threaded discussions and real-time messaging.",
  },
  {
    icon: FileText,
    title: "Assignment Management",
    description: "Submit assignments, receive feedback, and track your grades all in one place.",
  },
  {
    icon: Calendar,
    title: "Course Calendar",
    description: "Stay organized with a comprehensive calendar showing all your course deadlines and events.",
  },
  {
    icon: Users,
    title: "Collaborative Learning",
    description: "Work together on group projects and peer reviews to enhance your learning experience.",
  },
  {
    icon: BookOpen,
    title: "Comprehensive Library",
    description: "Access a vast library of courses across various subjects and disciplines.",
  },
  {
    icon: Zap,
    title: "Progress Tracking",
    description: "Monitor your learning progress with detailed analytics and achievement badges.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-16 md:py-24">
      <div className="container">
        <div className="mx-auto mb-12 max-w-[800px] text-center md:mb-16">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Powerful Features for Modern Learning</h2>
          <p className="text-muted-foreground md:text-lg">
            Edu-LMS combines cutting-edge technology with pedagogical best practices to deliver an exceptional learning
            experience.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div key={index} className="rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3 text-primary">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-medium">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
