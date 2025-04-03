import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { BarChart3, LineChart, PieChart, Shield, TrendingUp, Calculator, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function FeatureSection() {
  const features = [
    {
      icon: <PieChart className="h-6 w-6 text-primary" />,
      title: "AI-Powered Portfolio Allocation",
      description: "Smart asset allocation based on your risk profile and market conditions",
      content:
        "Our advanced algorithms analyze thousands of data points to create a personalized investment strategy that aligns with your financial goals and risk tolerance.",
      action: {
        text: "Create your portfolio",
        href: "/planner",
      },
    },
    {
      icon: <LineChart className="h-6 w-6 text-primary" />,
      title: "Real-Time Market Data",
      description: "Stay updated with live market trends and insights",
      content:
        "Access real-time data on stock indices, commodities, and bonds to make informed investment decisions. Our platform integrates with leading financial data providers.",
      action: {
        text: "View market insights",
        href: "/planner",
      },
    },
    {
      icon: <Calculator className="h-6 w-6 text-primary" />,
      title: "Financial Independence Calculator",
      description: "Plan your journey to financial freedom",
      content:
        "Calculate how much you need to achieve financial independence and how long it will take to get there based on your current savings, expenses, and investment strategy.",
      action: {
        text: "Calculate your FI number",
        href: "/fi-calculator",
      },
      highlight: true,
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-primary" />,
      title: "Interactive Visualization",
      description: "Visualize your portfolio and track performance",
      content:
        "Dynamic charts and graphs help you understand your asset allocation, expected returns, and risk assessment at a glance. Drill down into specific investments for detailed analysis.",
      action: {
        text: "Explore visualizations",
        href: "/planner",
      },
    },
    {
      icon: <Shield className="h-6 w-6 text-primary" />,
      title: "Risk Assessment",
      description: "Understand and manage investment risks",
      content:
        "Our comprehensive risk analysis tools help you understand potential downside scenarios and ensure your portfolio aligns with your risk tolerance and financial goals.",
      action: {
        text: "Assess your risk profile",
        href: "/planner",
      },
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-primary" />,
      title: "Investment Reports",
      description: "Detailed analysis and performance tracking",
      content:
        "Generate comprehensive investment reports with expected returns, risk assessment, and diversification benefits. Download and share reports for future reference.",
      action: {
        text: "Generate a report",
        href: "/planner",
      },
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32" id="features">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Powerful Features</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Everything you need to make informed investment decisions and grow your wealth.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-6xl gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={`h-full transition-all duration-200 ${feature.highlight ? "shadow-lg hover:shadow-xl border-primary/20" : "hover:shadow-md"}`}
            >
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  {feature.icon}
                </div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{feature.content}</p>
              </CardContent>
              <CardFooter>
                <Button asChild variant={feature.highlight ? "default" : "outline"} className="w-full mt-2">
                  <Link href={feature.action.href}>
                    {feature.action.text}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

