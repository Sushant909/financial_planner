"use client"

import { useEffect, useState } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

export default function PortfolioChart({ riskLevel }) {
  const [data, setData] = useState([])

  useEffect(() => {
    // Generate portfolio allocation based on risk level
    if (riskLevel === "low") {
      setData([
        { name: "Bonds", value: 40 },
        { name: "Fixed Deposits", value: 25 },
        { name: "Blue-chip Stocks", value: 15 },
        { name: "Gold", value: 15 },
        { name: "Liquid Funds", value: 5 },
      ])
    } else if (riskLevel === "medium") {
      setData([
        { name: "Large-cap Equity", value: 35 },
        { name: "Corporate Bonds", value: 25 },
        { name: "Mid-cap Stocks", value: 15 },
        { name: "Gold", value: 10 },
        { name: "Govt. Securities", value: 10 },
        { name: "Crypto", value: 5 },
      ])
    } else {
      setData([
        { name: "Mid & Small-cap", value: 40 },
        { name: "Sectoral Funds", value: 20 },
        { name: "International Equity", value: 15 },
        { name: "Corporate Bonds", value: 10 },
        { name: "Gold", value: 5 },
        { name: "Crypto", value: 10 },
      ])
    }
  }, [riskLevel])

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"]

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `${value}%`} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

