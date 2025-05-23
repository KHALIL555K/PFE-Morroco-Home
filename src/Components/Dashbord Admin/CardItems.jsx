import React from 'react'

export default function CardItems({ item }) {
    return (
        <div className='flex w-full flex-col gap-4 rounded-xl bg-white p-5 dark:bg-slate-600 dark:text-slate-300 sm:flex-1 '>
            <div className='flex items-center gap-3'>
                {item.icon}
                <h3 className='font-medium'>{item.title}</h3>
            </div>
            <h1 className='text-2xl font-bold'>{item.value}</h1>

        </div>
    )
}
