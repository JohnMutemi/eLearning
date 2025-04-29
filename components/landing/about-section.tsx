import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export function AboutSection() {
  return (
    <section id="about" className="py-16 bg-muted/30 md:py-24">
      <div className="container">
        <div className="mx-auto mb-12 max-w-[800px] text-center md:mb-16">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">About Edu-LMS</h2>
          <p className="text-muted-foreground md:text-lg">
            We're on a mission to make education accessible, engaging, and effective for everyone.
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-2 items-center">
          <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/placeholder.svg?height=400&width=600&text=Our+Story"
              alt="About Edu-LMS"
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Our Story</h3>
            <p className="text-muted-foreground">
              Edu-LMS was founded in 2023 by a team of educators and technologists who saw the need for a better online
              learning experience. We believe that education should be accessible to everyone, regardless of location or
              background.
            </p>
            <p className="text-muted-foreground">
              Our platform combines cutting-edge technology with pedagogical best practices to create an engaging,
              interactive learning environment that helps students achieve their goals and educators deliver their best
              content.
            </p>
            <h3 className="text-2xl font-bold pt-4">Our Mission</h3>
            <p className="text-muted-foreground">
              We're committed to transforming online education by providing tools that foster collaboration, engagement,
              and measurable outcomes. Our goal is to empower both educators and learners with technology that enhances
              the teaching and learning experience.
            </p>
            <div className="pt-4">
              <Button asChild>
                <Link href="/auth/register">Join Our Community</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
