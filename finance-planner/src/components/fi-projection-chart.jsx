"use client"

import { useEffect, useState } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts"

export default function FIProjectionChart({
  currentSavings,
  monthlySavings,
  annualReturnRate,
  inflationRate,
  fiCorpus,
  yearsToFI,
}) {
  const [data, setData] = useState([])

  useEffect(() => {
    // Generate projection data
    const generateData = () => {
      const newData = []
      const realReturnRate = (annualReturnRate - inflationRate) / 100
      const annualSavings = monthlySavings * 12

      let accumulated = currentSavings
      const maxYears = yearsToFI ? Math.min(yearsToFI + 5, 40) : 30

      for (let year = 0; year <= maxYears; year++) {
        newData.push({
          year,
          savings: Math.round(accumulated),
          target: fiCorpus,
        })

        accumulated = accumulated * (1 + realReturnRate) + annualSavings
      }

      return newData
    }

    setData(generateData())
  }, [currentSavings, monthlySavings, annualReturnRate, inflationRate, fiCorpus, yearsToFI])

  const formatCurrency = (value) => {
    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(2)} Cr`
    } else if (value >= 100000) {
      return `₹${(value / 100000).toFixed(2)} L`
    } else {
      return `₹${value.toLocaleString("en-IN")}`
    }
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" label={{ value: "Years", position: "insideBottomRight", offset: -5 }} />
        <YAxis tickFormatter={formatCurrency} label={{ value: "Amount", angle: -90, position: "insideLeft" }} />
        <Tooltip formatter={(value) => formatCurrency(value)} />
        <Legend />
        <Line type="monotone" dataKey="savings" stroke="#8884d8" activeDot={{ r: 8 }} name="Projected Savings" />
        <Line type="monotone" dataKey="target" stroke="#82ca9d" strokeDasharray="5 5" name="FI Target" />
        {yearsToFI && yearsToFI > 0 && (
          <ReferenceLine
            x={yearsToFI}
            stroke="red"
            strokeDasharray="3 3"
            label={{ value: "Financial Independence", position: "top" }}
          />
        )}
      </LineChart>
    </ResponsiveContainer>
  )
}

