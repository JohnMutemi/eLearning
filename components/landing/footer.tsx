import Link from "next/link"
import { BookOpen } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">Edu-LMS</span>
            </div>
            <p className="text-sm text-muted-foreground">
              A robust online learning environment for tutors and learners. Empowering education through technology.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Platform</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/#features" className="transition-colors hover:text-primary">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/#courses" className="transition-colors hover:text-primary">
                  Courses
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="transition-colors hover:text-primary">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/#testimonials" className="transition-colors hover:text-primary">
                  Testimonials
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="transition-colors hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="transition-colors hover:text-primary">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/blog" className="transition-colors hover:text-primary">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition-colors hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/terms" className="transition-colors hover:text-primary">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="transition-colors hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="transition-colors hover:text-primary">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Edu-LMS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
