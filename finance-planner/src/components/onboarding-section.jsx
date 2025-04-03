import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { ClipboardList, PieChart, TrendingUp, User, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function OnboardingSection() {
  const steps = [
    {
      icon: <User className="h-6 w-6 text-primary" />,
      title: "1. Define Your Profile",
      description: "Tell us about your investment amount, risk appetite, and time horizon.",
      action: {
        text: "Create your profile",
        href: "/signup",
      },
    },
    {
      icon: <ClipboardList className="h-6 w-6 text-primary" />,
      title: "2. Set Preferences",
      description: "Choose your preferred asset classes and investment vehicles.",
      action: {
        text: "Set preferences",
        href: "/planner",
      },
    },
    {
      icon: <PieChart className="h-6 w-6 text-primary" />,
      title: "3. Get Recommendations",
      description: "Our AI analyzes your inputs and market data to create an optimized portfolio.",
      action: {
        text: "View recommendations",
        href: "/planner",
      },
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-primary" />,
      title: "4. Track & Optimize",
      description: "Monitor performance and receive rebalancing suggestions as markets change.",
      action: {
        text: "Track performance",
        href: "/planner",
      },
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted" id="how-it-works">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">How It Works</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our AI-powered platform makes investment planning simple and personalized in just a few steps.
            </p>
          </div>
          <div className="pt-4 pb-8">
            <Button size="lg" asChild>
              <Link href="/signup">
                Get Started Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <Card key={index} className="h-full transition-all duration-200 hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  {step.icon}
                </div>
                <CardTitle className="text-lg">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" asChild className="w-full mt-2 text-primary hover:text-primary/80">
                  <Link href={step.action.href}>
                    {step.action.text}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <div className="max-w-3xl bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-center">Your Journey to Financial Success</h3>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">5 min</div>
                <p className="text-sm text-muted-foreground">to create your personalized investment plan</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                <p className="text-sm text-muted-foreground">real-time monitoring and updates</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">100%</div>
                <p className="text-sm text-muted-foreground">tailored to your financial goals</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

