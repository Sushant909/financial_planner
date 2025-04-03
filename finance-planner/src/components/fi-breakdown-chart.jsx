"use client"

import { useEffect, useState } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

export default function FIBreakdownChart({ monthlyExpenses, withdrawalRate }) {
  const [data, setData] = useState([])

  useEffect(() => {
    // Calculate annual expenses
    const annualExpenses = monthlyExpenses * 12

    // Generate breakdown data
    const generateData = () => {
      return [
        { name: "Housing", value: Math.round(annualExpenses * 0.35) },
        { name: "Food", value: Math.round(annualExpenses * 0.2) },
        { name: "Transportation", value: Math.round(annualExpenses * 0.15) },
        { name: "Healthcare", value: Math.round(annualExpenses * 0.1) },
        { name: "Entertainment", value: Math.round(annualExpenses * 0.1) },
        { name: "Others", value: Math.round(annualExpenses * 0.1) },
      ]
    }

    setData(generateData())
  }, [monthlyExpenses])

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"]

  const formatCurrency = (value) => {
    return `₹${value.toLocaleString("en-IN")}`
  }

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
        <Tooltip formatter={(value) => formatCurrency(value)} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

