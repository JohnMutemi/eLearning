import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-b from-muted/50 to-background py-16 md:py-24">
      <div className="container relative z-10">
        <div className="grid gap-12 md:grid-cols-2 md:gap-8 lg:gap-16">
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Transform Your Learning Experience
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Edu-LMS provides a comprehensive platform for online education, connecting tutors and learners in an
                engaging, interactive environment.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/auth/register">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#features">Learn More</Link>
              </Button>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span>14-day free trial</span>
              </div>
            </div>
          </div>
          <div className="relative flex items-center justify-center">
            <div className="relative h-[400px] w-full overflow-hidden rounded-lg shadow-xl md:h-[500px]">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent z-10 rounded-lg"></div>
              <Image
                src="/placeholder.svg?height=500&width=800&text=Interactive+Learning+Platform"
                alt="Edu-LMS Platform"
                fill
                className="object-cover"
                priority
              />

              {/* Floating elements for visual interest */}
              <div className="absolute top-10 left-10 bg-white p-4 rounded-lg shadow-lg z-20 rotate-3 hidden md:block">
                <div className="w-16 h-2 bg-primary mb-2 rounded"></div>
                <div className="w-24 h-2 bg-muted mb-2 rounded"></div>
                <div className="w-20 h-2 bg-muted rounded"></div>
              </div>

              <div className="absolute bottom-10 right-10 bg-white p-4 rounded-lg shadow-lg z-20 -rotate-3 hidden md:block">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-primary rounded-full"></div>
                </div>
              </div>

              <div className="absolute top-1/2 right-5 transform -translate-y-1/2 bg-white p-3 rounded-lg shadow-lg z-20 hidden md:block">
                <div className="w-4 h-4 bg-green-500 rounded-full mb-2"></div>
                <div className="w-4 h-4 bg-yellow-500 rounded-full mb-2"></div>
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Abstract shapes in background */}
      <div className="absolute top-1/3 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
    </section>
  )
}
