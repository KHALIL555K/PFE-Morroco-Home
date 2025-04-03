import React from 'react'
import { IoBagHandle } from 'react-icons/io5'

export default function DashbordStatsGrid() {
    return (
        <div className='flex gap-4 w-full'>
            <BoxWrapper>
                <div className='rounded-full h-12 w-12 flex items-center justify-center bg-blue-500'>
                    <IoBagHandle className='text-2xl text-white ' />
                </div>
                <div className='pl-4'>
                    <span className='text-sm text-gray-500 font-light'>Total Sales</span>
                    <div className='flex items-center'>
                        <strong className='text-xl text-gray-700 font-semibold'>$23133</strong>
                        <span className='text-xm text-green-500 pl-2'>+234</span>
                    </div>
                </div>
            </BoxWrapper>

            <BoxWrapper>
                <div className='rounded-full h-12 w-12 flex items-center justify-center bg-blue-500'>
                    <IoBagHandle className='text-2xl text-white ' />
                </div>
                <div className='pl-4'>
                    <span className='text-sm text-gray-500 font-light'>Total Sales</span>
                    <div className='flex items-center'>
                        <strong className='text-xl text-gray-700 font-semibold'>$23133</strong>
                        <span className='text-xm text-green-500 pl-2'>+234</span>
                    </div>
                </div>
            </BoxWrapper>

            <BoxWrapper>
                <div className='rounded-full h-12 w-12 flex items-center justify-center bg-blue-500'>
                    <IoBagHandle className='text-2xl text-white ' />
                </div>
                <div className='pl-4'>
                    <span className='text-sm text-gray-500 font-light'>Total Sales</span>
                    <div className='flex items-center'>
                        <strong className='text-xl text-gray-700 font-semibold'>$23133</strong>
                        <span className='text-xm text-green-500 pl-2'>+234</span>
                    </div>
                </div>
            </BoxWrapper>

            <BoxWrapper>
                <div className='rounded-full h-12 w-12 flex items-center justify-center bg-blue-500 '>
                    <IoBagHandle className='text-2xl text-white ' />
                </div>
                <div className='pl-4'>
                    <span className='text-sm text-gray-500 font-light'>Total Sales</span>
                    <div className='flex items-center'>
                        <strong className='text-xl text-gray-700 font-semibold'>$23133</strong>
                        <span className='text-xm text-green-500 pl-2'>+234</span>
                    </div>
                </div>
            </BoxWrapper>
        </div>
    )
}


function BoxWrapper({ children }) {
    return <div className='bg-white rounded-lg p-4 flex-1 border border-gray-200  flex items-center shadow-xl'>{children}</div>
}