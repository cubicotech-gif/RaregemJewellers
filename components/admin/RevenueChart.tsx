'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { RevenueData } from '@/lib/admin-types'

interface RevenueChartProps {
  data: RevenueData[]
}

export default function RevenueChart({ data }: RevenueChartProps) {
  const formattedData = data.map(item => ({
    ...item,
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }))

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
      <h3 className="text-lg font-semibold text-neutral-900 mb-4">Revenue Overview (Last 30 Days)</h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="date"
            stroke="#6b7280"
            fontSize={12}
          />
          <YAxis
            stroke="#6b7280"
            fontSize={12}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px'
            }}
            formatter={(value: number) => [`$${value.toFixed(2)}`, 'Revenue']}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#9333ea"
            strokeWidth={2}
            dot={{ fill: '#9333ea', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
