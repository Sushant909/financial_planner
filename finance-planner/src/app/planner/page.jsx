"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Download, RefreshCw, Shield, BarChart3, TrendingUp } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import PortfolioChart from "@/components/portfolio-chart"
import ReturnsChart from "@/components/returns-chart"
import MarketInsights from "@/components/market-insights"
import Navbar from "@/components/Navbar"

export default function PlannerPage() {
  const [investmentAmount, setInvestmentAmount] = useState(100000)
  const [riskLevel, setRiskLevel] = useState("medium")
  const [duration, setDuration] = useState("medium")
  const [preferences, setPreferences] = useState({
    stocks: true,
    bonds: true,
    gold: true,
    fd: true,
    crypto: false,
  })
  const [showResults, setShowResults] = useState(false)

  const handlePreferenceChange = (id) => {
    setPreferences({
      ...preferences,
      [id]: !preferences[id],
    })
  }

  const handleCreatePlan = () => {
    setShowResults(true)
  }

  const handleReset = () => {
    setShowResults(false)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 container py-8">
        <div className="grid gap-8 md:grid-cols-[1fr_400px]">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Investment Planner</h1>
              <p className="text-muted-foreground mt-2">
                Create a personalized investment portfolio based on your financial goals and risk appetite.
              </p>
            </div>

            {!showResults ? (
              <Card>
                <CardHeader>
                  <CardTitle>Your Investment Preferences</CardTitle>
                  <CardDescription>
                    Tell us about your investment goals and preferences to get personalized recommendations.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Investment Amount (₹)</Label>
                    <Input
                      id="amount"
                      type="number"
                      value={investmentAmount}
                      onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                    />
                    <p className="text-xs text-muted-foreground">Enter the total amount you plan to invest</p>
                  </div>

                  <div className="space-y-2">
                    <Label>Risk Appetite</Label>
                    <RadioGroup value={riskLevel} onValueChange={setRiskLevel} className="flex gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="low" id="risk-low" />
                        <Label htmlFor="risk-low">Low</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="medium" id="risk-medium" />
                        <Label htmlFor="risk-medium">Medium</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="high" id="risk-high" />
                        <Label htmlFor="risk-high">High</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label>Investment Duration</Label>
                    <RadioGroup value={duration} onValueChange={setDuration} className="flex gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="short" id="duration-short" />
                        <Label htmlFor="duration-short">Short-Term (1-3 years)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="medium" id="duration-medium" />
                        <Label htmlFor="duration-medium">Medium-Term (3-7 years)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="long" id="duration-long" />
                        <Label htmlFor="duration-long">Long-Term (7+ years)</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label>Investment Preferences</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="stocks"
                          checked={preferences.stocks}
                          onCheckedChange={() => handlePreferenceChange("stocks")}
                        />
                        <Label htmlFor="stocks">Stocks</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="bonds"
                          checked={preferences.bonds}
                          onCheckedChange={() => handlePreferenceChange("bonds")}
                        />
                        <Label htmlFor="bonds">Bonds</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="gold"
                          checked={preferences.gold}
                          onCheckedChange={() => handlePreferenceChange("gold")}
                        />
                        <Label htmlFor="gold">Gold</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="fd"
                          checked={preferences.fd}
                          onCheckedChange={() => handlePreferenceChange("fd")}
                        />
                        <Label htmlFor="fd">Fixed Deposits</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="crypto"
                          checked={preferences.crypto}
                          onCheckedChange={() => handlePreferenceChange("crypto")}
                        />
                        <Label htmlFor="crypto">Cryptocurrency</Label>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleCreatePlan} className="w-full">
                    Create My Investment Plan
                  </Button>
                </CardFooter>
              </Card>
            ) : (
              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Personalized Investment Portfolio</CardTitle>
                    <CardDescription>
                      Based on your {riskLevel} risk profile and {duration}-term investment horizon
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="allocation">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="allocation">Portfolio Allocation</TabsTrigger>
                        <TabsTrigger value="returns">Expected Returns</TabsTrigger>
                      </TabsList>
                      <TabsContent value="allocation" className="pt-4">
                        <div className="h-[300px]">
                          <PortfolioChart riskLevel={riskLevel} />
                        </div>
                      </TabsContent>
                      <TabsContent value="returns" className="pt-4">
                        <div className="h-[300px]">
                          <ReturnsChart duration={duration} riskLevel={riskLevel} />
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={handleReset}>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Reset
                    </Button>
                    <Button>
                      <Download className="mr-2 h-4 w-4" />
                      Download Report
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Investment Recommendations</CardTitle>
                    <CardDescription>Smart suggestions based on your preferences and market conditions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-medium">Recommended Asset Allocation</h3>
                      <p className="text-sm text-muted-foreground">
                        {riskLevel === "low" &&
                          "Your low-risk profile suggests a conservative approach with focus on stability and income."}
                        {riskLevel === "medium" &&
                          "Your medium-risk profile suggests a balanced approach with moderate growth potential."}
                        {riskLevel === "high" &&
                          "Your high-risk profile suggests an aggressive approach with focus on growth and capital appreciation."}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-medium">Key Investment Vehicles</h3>
                      <ul className="list-disc pl-5 text-sm space-y-1">
                        {riskLevel === "low" && (
                          <>
                            <li>Government Bonds (30-40%)</li>
                            <li>Corporate Fixed Deposits (20-25%)</li>
                            <li>Blue-chip Dividend Stocks (15-20%)</li>
                            <li>Gold ETFs (10-15%)</li>
                            <li>Liquid Funds (5-10%)</li>
                          </>
                        )}
                        {riskLevel === "medium" && (
                          <>
                            <li>Large-cap Equity Mutual Funds (30-35%)</li>
                            <li>Corporate Bonds (20-25%)</li>
                            <li>Mid-cap Stocks (15-20%)</li>
                            <li>Gold (10%)</li>
                            <li>Government Securities (10%)</li>
                            {preferences.crypto && <li>Established Cryptocurrencies (5%)</li>}
                          </>
                        )}
                        {riskLevel === "high" && (
                          <>
                            <li>Mid & Small-cap Stocks (35-40%)</li>
                            <li>Sectoral/Thematic Funds (20-25%)</li>
                            <li>International Equity (15%)</li>
                            <li>Corporate Bonds (10%)</li>
                            <li>Gold (5%)</li>
                            {preferences.crypto && <li>Cryptocurrency Portfolio (10-15%)</li>}
                          </>
                        )}
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-medium">Market Insights</h3>
                      <p className="text-sm text-muted-foreground">
                        Current market conditions favor{" "}
                        {riskLevel === "low"
                          ? "defensive sectors like FMCG and Pharma"
                          : riskLevel === "medium"
                            ? "a balanced approach with selective exposure to IT and Banking"
                            : "growth sectors like Technology and Renewable Energy"}
                        . Consider regular portfolio rebalancing every{" "}
                        {duration === "short" ? "3-6 months" : duration === "medium" ? "6-12 months" : "12-18 months"}.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          <div className="space-y-8">
            <MarketInsights compact={true} />

            <Card>
              <CardHeader>
                <CardTitle>Investment Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-2">
                  <div className="rounded-full bg-primary/10 p-1">
                    <Shield className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Diversify Your Portfolio</h3>
                    <p className="text-xs text-muted-foreground">
                      Spread investments across different asset classes to reduce risk.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="rounded-full bg-primary/10 p-1">
                    <LineChart className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Invest Regularly</h3>
                    <p className="text-xs text-muted-foreground">
                      Consider SIPs for disciplined investing and to average out market volatility.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="rounded-full bg-primary/10 p-1">
                    <BarChart3 className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Monitor & Rebalance</h3>
                    <p className="text-xs text-muted-foreground">
                      Review your portfolio periodically and adjust according to market conditions.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="rounded-full bg-primary/10 p-1">
                    <TrendingUp className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Stay Informed</h3>
                    <p className="text-xs text-muted-foreground">
                      Keep up with market trends and economic indicators that may affect your investments.
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

