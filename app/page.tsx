import { LandingLayout } from "@/components/landing/landing-layout"
import { HeroSection } from "@/components/landing/hero-section"
import { FeaturesSection } from "@/components/landing/features-section"
import { TestimonialsSection } from "@/components/landing/testimonials-section"
import { CoursesPreview } from "@/components/landing/courses-preview"
import { PricingSection } from "@/components/landing/pricing-section"
import { CTASection } from "@/components/landing/cta-section"
import { AboutSection } from "@/components/landing/about-section"

export default function HomePage() {
  return (
    <LandingLayout>
      <HeroSection />
      <FeaturesSection />
      <CoursesPreview />
      <TestimonialsSection />
      <PricingSection />
      <AboutSection />
      <CTASection />
    </LandingLayout>
  )
}
