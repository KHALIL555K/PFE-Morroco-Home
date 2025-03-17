import React from 'react'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import Title from './Title'
import { Tooltip } from 'flowbite-react'
import { monthData } from '../constants/index'

export default function CustomBarChart() {
    return (
        <div className='h-[450px] w-full rounded-xl bg-white p-5 pb-20 dark:bg-slate-600 dark:text-slate-300 xl:flex-1'>
            <Title>Sales and Revenue</Title>
            <ResponsiveContainer>
                <BarChart data={monthData} >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="sales" fill="#14b8a6" />
                    <Bar dataKey="revenue" fill="#0f766e" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
