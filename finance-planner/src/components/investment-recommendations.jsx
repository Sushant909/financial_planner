import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export default function InvestmentRecommendations({ fiCorpus, yearsToFI, annualReturnRate }) {
  // Determine investment strategy based on years to FI
  const getStrategy = () => {
    if (!yearsToFI || yearsToFI === null) {
      return "balanced"
    }

    if (yearsToFI <= 5) {
      return "conservative"
    } else if (yearsToFI <= 15) {
      return "balanced"
    } else {
      return "aggressive"
    }
  }

  const strategy = getStrategy()

  // Recommendations based on strategy
  const recommendations = {
    conservative: {
      title: "Conservative Strategy",
      description: "Focus on capital preservation with steady income",
      allocation: [
        { name: "Debt Mutual Funds", percentage: 40, type: "debt" },
        { name: "Government Bonds", percentage: 20, type: "debt" },
        { name: "Blue-chip Stocks", percentage: 20, type: "equity" },
        { name: "Gold ETFs", percentage: 10, type: "alternative" },
        { name: "Fixed Deposits", percentage: 10, type: "debt" },
      ],
    },
    balanced: {
      title: "Balanced Strategy",
      description: "Balance between growth and stability",
      allocation: [
        { name: "Index Funds", percentage: 30, type: "equity" },
        { name: "Corporate Bonds", percentage: 25, type: "debt" },
        { name: "Mid-cap Funds", percentage: 20, type: "equity" },
        { name: "REITs", percentage: 15, type: "alternative" },
        { name: "Gold", percentage: 10, type: "alternative" },
      ],
    },
    aggressive: {
      title: "Aggressive Growth Strategy",
      description: "Focus on long-term capital appreciation",
      allocation: [
        { name: "Equity Mutual Funds", percentage: 40, type: "equity" },
        { name: "Mid & Small-cap Stocks", percentage: 25, type: "equity" },
        { name: "International Equity", percentage: 15, type: "equity" },
        { name: "Corporate Bonds", percentage: 10, type: "debt" },
        { name: "Alternative Investments", percentage: 10, type: "alternative" },
      ],
    },
  }

  const selectedRecommendation = recommendations[strategy]

  // Calculate total allocation by type
  const totalByType = selectedRecommendation.allocation.reduce((acc, item) => {
    acc[item.type] = (acc[item.type] || 0) + item.percentage
    return acc
  }, {})

  // Get badge color based on investment type
  const getBadgeColor = (type) => {
    switch (type) {
      case "equity":
        return "bg-blue-500"
      case "debt":
        return "bg-green-500"
      case "alternative":
        return "bg-amber-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recommended Investment Strategy</CardTitle>
        <CardDescription>Based on your financial independence goals</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="font-medium">{selectedRecommendation.title}</h3>
          <p className="text-sm text-muted-foreground">{selectedRecommendation.description}</p>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span>Asset Allocation</span>
            <div className="flex gap-2">
              <Badge variant="outline" className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">
                Equity: {totalByType.equity || 0}%
              </Badge>
              <Badge variant="outline" className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
                Debt: {totalByType.debt || 0}%
              </Badge>
              <Badge variant="outline" className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20">
                Alt: {totalByType.alternative || 0}%
              </Badge>
            </div>
          </div>

          {selectedRecommendation.allocation.map((item, index) => (
            <div key={index} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{item.name}</span>
                <span className="font-medium">{item.percentage}%</span>
              </div>
              <Progress value={item.percentage} className={`h-2 ${getBadgeColor(item.type)}`} />
            </div>
          ))}
        </div>

        <div className="space-y-2 pt-2">
          <h3 className="text-sm font-medium">Key Investment Vehicles</h3>
          <ul className="text-xs space-y-1 list-disc pl-5">
            {strategy === "conservative" && (
              <>
                <li>Debt mutual funds like Aditya Birla Sun Life Corporate Bond Fund</li>
                <li>Government bonds through Bharat Bond ETF</li>
                <li>Blue-chip stocks via Nifty 50 Index funds</li>
                <li>Gold ETFs like SBI Gold ETF</li>
              </>
            )}
            {strategy === "balanced" && (
              <>
                <li>Index funds like UTI Nifty Index Fund</li>
                <li>Corporate bond funds like ICICI Prudential Corporate Bond Fund</li>
                <li>Mid-cap funds like Kotak Emerging Equity Scheme</li>
                <li>Embassy Office Parks REIT for real estate exposure</li>
              </>
            )}
            {strategy === "aggressive" && (
              <>
                <li>Equity funds like Mirae Asset Large Cap Fund</li>
                <li>Small-cap funds like Nippon India Small Cap Fund</li>
                <li>International exposure via Franklin India Feeder - Franklin U.S. Opportunities Fund</li>
                <li>Sectoral funds in technology and healthcare</li>
              </>
            )}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

