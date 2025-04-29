import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="bg-primary py-16 text-primary-foreground md:py-24">
      <div className="container">
        <div className="mx-auto max-w-[800px] text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Ready to Transform Your Learning Experience?</h2>
          <p className="mb-8 md:text-lg">
            Join thousands of educators and learners who are already using Edu-LMS to achieve their educational goals.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/auth/register">Get Started for Free</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground" asChild>
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
