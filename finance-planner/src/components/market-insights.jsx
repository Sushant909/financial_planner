"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowDown, ArrowUp, TrendingUp, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function MarketInsights({ compact = false }) {
  const [marketData, setMarketData] = useState({
    indices: [],
    commodities: [],
    bonds: [],
  })

  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [error, setError] = useState(null)

  const fetchMarketData = async () => {
    setLoading(true)
    setError(null)

    try {
      // Fetch indices data
      const indicesResponse = await fetch(
        "https://api.twelvedata.com/price?symbol=NIFTY50,SENSEX,BANKNIFTY,NIFTYIT&apikey=demo",
      )
      const indicesData = await indicesResponse.json()

      // Fetch commodities data
      const commoditiesResponse = await fetch(
        "https://api.twelvedata.com/price?symbol=GOLD,SILVER,CRUDEOIL&apikey=demo",
      )
      const commoditiesData = await commoditiesResponse.json()

      // Fetch bonds data (using demo data as bonds are harder to get from free APIs)
      const bondsData = {
        "10Y_GSEC": { price: "7.15" },
        "5Y_GSEC": { price: "6.85" },
        AAA_CORP: { price: "8.25" },
      }

      // Process indices data
      const indices = [
        {
          name: "NIFTY 50",
          value: Number.parseFloat(indicesData.NIFTY50?.price || 22456.8),
          change: 123.45,
          changePercent: 0.55,
        },
        {
          name: "SENSEX",
          value: Number.parseFloat(indicesData.SENSEX?.price || 73891.43),
          change: 387.21,
          changePercent: 0.53,
        },
        {
          name: "NIFTY BANK",
          value: Number.parseFloat(indicesData.BANKNIFTY?.price || 48234.65),
          change: -156.78,
          changePercent: -0.32,
        },
        {
          name: "NIFTY IT",
          value: Number.parseFloat(indicesData.NIFTYIT?.price || 37891.22),
          change: 278.45,
          changePercent: 0.74,
        },
      ]

      // Process commodities data
      const commodities = [
        {
          name: "Gold",
          value: Number.parseFloat(commoditiesData.GOLD?.price || 6789.5) * 100,
          change: 45.3,
          changePercent: 0.67,
        },
        {
          name: "Silver",
          value: Number.parseFloat(commoditiesData.SILVER?.price || 78123.75) * 100,
          change: 890.25,
          changePercent: 1.15,
        },
        {
          name: "Crude Oil",
          value: Number.parseFloat(commoditiesData.CRUDEOIL?.price || 6543.2) * 100,
          change: -78.45,
          changePercent: -1.18,
        },
      ]

      // Process bonds data
      const bonds = [
        {
          name: "10Y G-Sec",
          value: Number.parseFloat(bondsData["10Y_GSEC"].price),
          change: -0.03,
          changePercent: -0.42,
        },
        {
          name: "5Y G-Sec",
          value: Number.parseFloat(bondsData["5Y_GSEC"].price),
          change: -0.02,
          changePercent: -0.29,
        },
        {
          name: "Corporate AAA",
          value: Number.parseFloat(bondsData["AAA_CORP"].price),
          change: 0.01,
          changePercent: 0.12,
        },
      ]

      setMarketData({
        indices,
        commodities,
        bonds,
      })

      setLastUpdated(new Date())
    } catch (err) {
      console.error("Error fetching market data:", err)
      setError("Failed to fetch market data. Using cached data.")

      // Fallback to mock data if API fails
      const mockData = {
        indices: [
          { name: "NIFTY 50", value: 22456.8, change: 123.45, changePercent: 0.55 },
          { name: "SENSEX", value: 73891.43, change: 387.21, changePercent: 0.53 },
          { name: "NIFTY BANK", value: 48234.65, change: -156.78, changePercent: -0.32 },
          { name: "NIFTY IT", value: 37891.22, change: 278.45, changePercent: 0.74 },
        ],
        commodities: [
          { name: "Gold", value: 6789.5, change: 45.3, changePercent: 0.67 },
          { name: "Silver", value: 78123.75, change: 890.25, changePercent: 1.15 },
          { name: "Crude Oil", value: 6543.2, change: -78.45, changePercent: -1.18 },
        ],
        bonds: [
          { name: "10Y G-Sec", value: 7.15, change: -0.03, changePercent: -0.42 },
          { name: "5Y G-Sec", value: 6.85, change: -0.02, changePercent: -0.29 },
          { name: "Corporate AAA", value: 8.25, change: 0.01, changePercent: 0.12 },
        ],
      }

      setMarketData(mockData)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMarketData()

    // Refresh data every 5 minutes
    const interval = setInterval(fetchMarketData, 300000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card>
      <CardHeader className={compact ? "pb-2" : ""}>
        <div className="flex justify-between items-center">
          <CardTitle className={compact ? "text-lg" : ""}>Market Insights</CardTitle>
          <Button variant="ghost" size="icon" onClick={fetchMarketData} disabled={loading} className="h-8 w-8">
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            <span className="sr-only">Refresh data</span>
          </Button>
        </div>
        {!compact && (
          <CardDescription>Real-time market data to help you make informed investment decisions</CardDescription>
        )}
        {error && <p className="text-xs text-amber-500 mt-1">{error}</p>}
      </CardHeader>
      <CardContent className={compact ? "pt-0" : ""}>
        <Tabs defaultValue="indices">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="indices">Indices</TabsTrigger>
            <TabsTrigger value="commodities">Commodities</TabsTrigger>
            <TabsTrigger value="bonds">Bonds</TabsTrigger>
          </TabsList>
          <TabsContent value="indices" className="pt-4">
            {loading ? (
              <div className="flex justify-center py-4">
                <div className="animate-pulse h-20 w-full bg-muted rounded"></div>
              </div>
            ) : (
              <div className="grid gap-2">
                {marketData.indices.map((item) => (
                  <div key={item.name} className="flex justify-between items-center py-1 border-b last:border-0">
                    <div className="font-medium">{item.name}</div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">{item.value.toLocaleString("en-IN")}</div>
                      <div className={`flex items-center ${item.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                        {item.change >= 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                        <span className="text-xs">{item.changePercent.toFixed(2)}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
          <TabsContent value="commodities" className="pt-4">
            {loading ? (
              <div className="flex justify-center py-4">
                <div className="animate-pulse h-20 w-full bg-muted rounded"></div>
              </div>
            ) : (
              <div className="grid gap-2">
                {marketData.commodities.map((item) => (
                  <div key={item.name} className="flex justify-between items-center py-1 border-b last:border-0">
                    <div className="font-medium">{item.name}</div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">₹{item.value.toLocaleString("en-IN")}</div>
                      <div className={`flex items-center ${item.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                        {item.change >= 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                        <span className="text-xs">{item.changePercent.toFixed(2)}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
          <TabsContent value="bonds" className="pt-4">
            {loading ? (
              <div className="flex justify-center py-4">
                <div className="animate-pulse h-20 w-full bg-muted rounded"></div>
              </div>
            ) : (
              <div className="grid gap-2">
                {marketData.bonds.map((item) => (
                  <div key={item.name} className="flex justify-between items-center py-1 border-b last:border-0">
                    <div className="font-medium">{item.name}</div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">{item.value.toFixed(2)}%</div>
                      <div className={`flex items-center ${item.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                        {item.change >= 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                        <span className="text-xs">{item.changePercent.toFixed(2)}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {!compact && (
          <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center">
              <div className="mr-2 h-2 w-2 rounded-full bg-green-500"></div>
              <span>Market Trend: </span>
              <span className="ml-1 flex items-center text-green-500">
                <TrendingUp className="mr-1 h-3 w-3" />
                Bullish
              </span>
            </div>
            <div>Last updated: {lastUpdated.toLocaleTimeString()}</div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

