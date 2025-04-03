import { Tooltip } from 'flowbite-react'
import React from 'react'
import { DiVim } from 'react-icons/di'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from 'recharts'

export default function TransactionChart() {
    const data = [
        {
            name: 'jan',
            Expense: 4000,
            Income: 2500
        },
        {
            name: 'feb',
            Expense: 4900,
            Income: 2500
        },
        {
            name: 'mar',
            Expense: 4200,
            Income: 2500
        },
        {
            name: 'Apr',
            Expense: 4300,
            Income: 2500
        }
    ]


    return (
        <div className='h-[22rem] bg-white p-4 rounded-lg border border-gray-200 flex flex-col flex-1 shadow-xl'>
            <strong className='text-gray-700 font-medium'>Transations</strong>
            <div className='w-full mt-3 flex-1 text-xs'>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 20,
                            right: 10,
                            left: -10,
                            bottom: 0
                        }}>
                        <CartesianGrid strokeDasharray="3 3 0 0" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Income" fill='#0ea5e9' />
                        <Bar dataKey="Expense" fill='#ea580c' />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
