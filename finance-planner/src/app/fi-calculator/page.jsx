"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Info, Calculator } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import FIProjectionChart from "@/components/fi-projection-chart"
import FIBreakdownChart from "@/components/fi-breakdown-chart"
import MarketInsights from "@/components/market-insights"
import InvestmentRecommendations from "@/components/investment-recommendations"
import Navbar from "@/components/Navbar"

export default function FICalculatorPage() {
  const [monthlyExpenses, setMonthlyExpenses] = useState(50000)
  const [annualReturnRate, setAnnualReturnRate] = useState(10)
  const [inflationRate, setInflationRate] = useState(6)
  const [withdrawalRate, setWithdrawalRate] = useState(4)
  const [fiCorpus, setFiCorpus] = useState(0)
  const [yearsToFI, setYearsToFI] = useState(0)
  const [currentSavings, setCurrentSavings] = useState(1000000)
  const [monthlySavings, setMonthlySavings] = useState(20000)

  // Calculate FI corpus and years to FI
  useEffect(() => {
    // Calculate annual expenses
    const annualExpenses = monthlyExpenses * 12

    // Calculate real return rate
    const realReturnRate = (annualReturnRate - inflationRate) / 100

    // Calculate FI corpus
    const corpus = Math.round(annualExpenses / (withdrawalRate / 100))
    setFiCorpus(corpus)

    // Calculate years to FI
    if (currentSavings < corpus && monthlySavings > 0 && realReturnRate > 0) {
      // Using the formula: n = log(FV/PV) / log(1+r)
      // Where FV = future value (corpus), PV = present value (current savings)
      // r = real return rate, n = number of years

      // First, calculate how much we need to save monthly
      const annualSavings = monthlySavings * 12

      // Calculate years to FI using compound interest formula
      // This is a simplified calculation
      let years = 0
      let accumulated = currentSavings

      while (accumulated < corpus) {
        accumulated = accumulated * (1 + realReturnRate) + annualSavings
        years++

        // Safety check to prevent infinite loops
        if (years > 100) break
      }

      setYearsToFI(years)
    } else if (currentSavings >= corpus) {
      setYearsToFI(0) // Already achieved FI
    } else {
      setYearsToFI(null) // Cannot achieve FI with current inputs
    }
  }, [monthlyExpenses, annualReturnRate, inflationRate, withdrawalRate, currentSavings, monthlySavings])

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 container py-8">
        <div className="grid gap-8 md:grid-cols-[1fr_400px]">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Financial Independence Calculator</h1>
              <p className="text-muted-foreground mt-2">
                Calculate how much you need to achieve financial independence and how long it will take to get there.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Your Financial Inputs</CardTitle>
                <CardDescription>
                  Enter your financial details to calculate your path to financial independence.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="monthlyExpenses">Monthly Expenses (₹)</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">
                            Your total monthly expenses including all necessities, lifestyle costs, and discretionary
                            spending.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Input
                    id="monthlyExpenses"
                    type="number"
                    value={monthlyExpenses}
                    onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="currentSavings">Current Savings/Investments (₹)</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">
                            Your total current investments and savings that will grow over time.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Input
                    id="currentSavings"
                    type="number"
                    value={currentSavings}
                    onChange={(e) => setCurrentSavings(Number(e.target.value))}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="monthlySavings">Monthly Savings (₹)</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">How much you can save and invest each month.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Input
                    id="monthlySavings"
                    type="number"
                    value={monthlySavings}
                    onChange={(e) => setMonthlySavings(Number(e.target.value))}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="annualReturnRate">Expected Annual Return Rate (%)</Label>
                    <span className="text-sm font-medium">{annualReturnRate}%</span>
                  </div>
                  <Slider
                    id="annualReturnRate"
                    min={4}
                    max={16}
                    step={0.5}
                    value={[annualReturnRate]}
                    onValueChange={(value) => setAnnualReturnRate(value[0])}
                    className="py-4"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Conservative (4%)</span>
                    <span>Moderate (10%)</span>
                    <span>Aggressive (16%)</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="inflationRate">Expected Inflation Rate (%)</Label>
                    <span className="text-sm font-medium">{inflationRate}%</span>
                  </div>
                  <Slider
                    id="inflationRate"
                    min={3}
                    max={9}
                    step={0.5}
                    value={[inflationRate]}
                    onValueChange={(value) => setInflationRate(value[0])}
                    className="py-4"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Low (3%)</span>
                    <span>Average (6%)</span>
                    <span>High (9%)</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="withdrawalRate">Safe Withdrawal Rate (%)</Label>
                    <span className="text-sm font-medium">{withdrawalRate}%</span>
                  </div>
                  <Slider
                    id="withdrawalRate"
                    min={2}
                    max={6}
                    step={0.25}
                    value={[withdrawalRate]}
                    onValueChange={(value) => setWithdrawalRate(value[0])}
                    className="py-4"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Conservative (2%)</span>
                    <span>Standard (4%)</span>
                    <span>Aggressive (6%)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Financial Independence Plan</CardTitle>
                <CardDescription>Based on your inputs, here's your path to financial independence.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card className="bg-muted/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Required Corpus</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-primary">₹{fiCorpus.toLocaleString("en-IN")}</div>
                      <p className="text-sm text-muted-foreground mt-1">
                        This is the total amount you need to achieve financial independence.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-muted/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Time to FI</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-primary">
                        {yearsToFI === 0
                          ? "Already achieved!"
                          : yearsToFI === null
                            ? "Not achievable"
                            : `${yearsToFI} years`}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {yearsToFI === 0
                          ? "Congratulations! You've already reached financial independence."
                          : yearsToFI === null
                            ? "Increase savings or adjust parameters to achieve FI."
                            : "Estimated time to reach your FI goal with current savings rate."}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <Tabs defaultValue="projection">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="projection">Projection Chart</TabsTrigger>
                    <TabsTrigger value="breakdown">Corpus Breakdown</TabsTrigger>
                  </TabsList>
                  <TabsContent value="projection" className="pt-4">
                    <div className="h-[300px]">
                      <FIProjectionChart
                        currentSavings={currentSavings}
                        monthlySavings={monthlySavings}
                        annualReturnRate={annualReturnRate}
                        inflationRate={inflationRate}
                        fiCorpus={fiCorpus}
                        yearsToFI={yearsToFI}
                      />
                    </div>
                  </TabsContent>
                  <TabsContent value="breakdown" className="pt-4">
                    <div className="h-[300px]">
                      <FIBreakdownChart monthlyExpenses={monthlyExpenses} withdrawalRate={withdrawalRate} />
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="space-y-2 bg-muted/50 p-4 rounded-lg">
                  <h3 className="font-medium">Key Assumptions</h3>
                  <ul className="text-sm space-y-1 list-disc pl-5">
                    <li>Annual expenses: ₹{(monthlyExpenses * 12).toLocaleString("en-IN")}</li>
                    <li>Real return rate (after inflation): {(annualReturnRate - inflationRate).toFixed(1)}%</li>
                    <li>Safe withdrawal rate: {withdrawalRate}% of your corpus annually</li>
                    <li>Inflation remains constant at {inflationRate}% over time</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => window.print()}>
                  <Download className="mr-2 h-4 w-4" />
                  Save Report
                </Button>
                <Button asChild>
                  <Link href="/planner">Create Investment Plan</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="space-y-8">
            <MarketInsights compact={true} />

            <InvestmentRecommendations fiCorpus={fiCorpus} yearsToFI={yearsToFI} annualReturnRate={annualReturnRate} />

            <Card>
              <CardHeader>
                <CardTitle>Financial Independence Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-2">
                  <div className="rounded-full bg-primary/10 p-1">
                    <Calculator className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">The 50-30-20 Rule</h3>
                    <p className="text-xs text-muted-foreground">
                      Allocate 50% of income to needs, 30% to wants, and 20% to savings and investments.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="rounded-full bg-primary/10 p-1">
                    <Calculator className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">The 4% Rule</h3>
                    <p className="text-xs text-muted-foreground">
                      You can safely withdraw 4% of your corpus annually without depleting your principal over time.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="rounded-full bg-primary/10 p-1">
                    <Calculator className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">The 25X Rule</h3>
                    <p className="text-xs text-muted-foreground">
                      Aim to save 25 times your annual expenses to achieve financial independence.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="rounded-full bg-primary/10 p-1">
                    <Calculator className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">The Power of Compounding</h3>
                    <p className="text-xs text-muted-foreground">
                      Start early and let compound interest work its magic. Time in the market beats timing the market.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

