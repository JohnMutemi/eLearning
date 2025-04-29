import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const testimonials = [
  {
    quote:
      "Edu-LMS has transformed how I teach my courses. The platform is intuitive, and my students love the interactive features.",
    author: "Dr. Sarah Johnson",
    role: "Professor of Computer Science",
    avatar: "/placeholder.svg",
    initials: "SJ",
  },
  {
    quote:
      "As a student, I've tried many learning platforms, but Edu-LMS stands out with its user-friendly interface and comprehensive tools.",
    author: "Michael Chen",
    role: "Computer Science Student",
    avatar: "/placeholder.svg",
    initials: "MC",
  },
  {
    quote:
      "The discussion forums and collaborative features have made online learning feel much more engaging and interactive.",
    author: "Emily Rodriguez",
    role: "Online Learning Specialist",
    avatar: "/placeholder.svg",
    initials: "ER",
  },
]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="bg-muted/50 py-16 md:py-24">
      <div className="container">
        <div className="mx-auto mb-12 max-w-[800px] text-center md:mb-16">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">What Our Users Say</h2>
          <p className="text-muted-foreground md:text-lg">
            Discover how Edu-LMS is helping educators and learners achieve their goals.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-none shadow-md">
              <CardContent className="p-6">
                <div className="mb-4 text-lg font-medium leading-relaxed">"{testimonial.quote}"</div>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.author} />
                    <AvatarFallback>{testimonial.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
