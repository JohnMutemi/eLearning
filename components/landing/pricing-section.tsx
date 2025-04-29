import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"
import Link from "next/link"

const pricingPlans = [
  {
    name: "Basic",
    description: "Perfect for individual learners",
    price: "$0",
    billing: "Free forever",
    features: [
      "Access to free courses",
      "Basic progress tracking",
      "Discussion forum participation",
      "Mobile access",
      "Certificate of completion",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    description: "Ideal for dedicated students",
    price: "$19",
    billing: "per month",
    features: [
      "Everything in Basic",
      "Unlimited access to all courses",
      "Advanced progress analytics",
      "Priority support",
      "Downloadable resources",
      "Ad-free experience",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "For organizations and institutions",
    price: "Custom",
    billing: "Contact for pricing",
    features: [
      "Everything in Pro",
      "Custom learning paths",
      "Dedicated account manager",
      "API access",
      "SSO integration",
      "Advanced reporting",
      "Custom branding",
    ],
    cta: "Contact Sales",
    popular: false,
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="py-16 md:py-24">
      <div className="container">
        <div className="mx-auto mb-12 max-w-[800px] text-center md:mb-16">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Simple, Transparent Pricing</h2>
          <p className="text-muted-foreground md:text-lg">
            Choose the plan that's right for you and start your learning journey today.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <Card
              key={index}
              className={`flex flex-col ${plan.popular ? "border-primary shadow-lg" : "border-border shadow-sm"}`}
            >
              {plan.popular && (
                <div className="rounded-t-lg bg-primary px-4 py-1 text-center text-sm font-medium text-primary-foreground">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground"> {plan.billing}</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant={plan.popular ? "default" : "outline"} asChild>
                  <Link href={plan.name === "Enterprise" ? "/contact" : "/auth/register"}>{plan.cta}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
