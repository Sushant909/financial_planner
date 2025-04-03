"use client"

import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export default function ReturnsChart({ duration, riskLevel }) {
  const [data, setData] = useState([])

  useEffect(() => {
    // Generate expected returns data based on risk level and duration
    const years = duration === "short" ? 3 : duration === "medium" ? 7 : 15
    const riskMultiplier = riskLevel === "low" ? 0.7 : riskLevel === "medium" ? 1 : 1.3

    const generateData = () => {
      const newData = []
      let cumulativeReturns = 100
      let cumulativeBenchmark = 100

      for (let i = 0; i <= years; i++) {
        // Add some randomness to make the chart look more realistic
        const yearlyReturn = (7 + Math.random() * 3) * riskMultiplier
        const benchmarkReturn = 8 + Math.random() * 2

        if (i > 0) {
          cumulativeReturns = cumulativeReturns * (1 + yearlyReturn / 100)
          cumulativeBenchmark = cumulativeBenchmark * (1 + benchmarkReturn / 100)
        }

        newData.push({
          name: `Year ${i}`,
          returns: Math.round(cumulativeReturns),
          benchmark: Math.round(cumulativeBenchmark),
        })
      }

      return newData
    }

    setData(generateData())
  }, [duration, riskLevel])

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
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip formatter={(value) => `₹${value}`} />
        <Legend />
        <Line type="monotone" dataKey="returns" stroke="#8884d8" activeDot={{ r: 8 }} name="Your Portfolio" />
        <Line type="monotone" dataKey="benchmark" stroke="#82ca9d" name="Market Benchmark" />
      </LineChart>
    </ResponsiveContainer>
  )
}

