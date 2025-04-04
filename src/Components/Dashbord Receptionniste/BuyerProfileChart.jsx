import React from 'react'
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from 'recharts'

export default function BuyerProfileChart() {
  const data = [
    { name: 'Male', value: 540 },
    { name: 'Female', value: 550 },
    { name: 'Other', value: 240 },
  ]

  const RADIAN = Math.PI / 180
  const COLORS = ['#00c49f', '#FF8828', '#FFFFF'] // Correction de la couleur

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  return (
    <div className='h-[22rem] bg-white p-4 rounded-lg border border-gray-200 flex flex-col flex-1 shadow-xl'>
      <strong className='text-gray-700 font-medium'>Buyer Profile</strong>
      <div className='w-full mt-3 flex-1 text-xs'>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={105}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}