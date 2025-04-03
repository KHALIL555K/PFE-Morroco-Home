import React from 'react'
import DashbordStatsGrid from './DashbordStatsGrid'
import TransactionChart from './TransactionChart'
import BuyerProfileChart from './BuyerProfileChart'
import Reservation from './Reservation'

export default function Dashboard() {
    return (
        <div className='flex flex-col gap-4'>
            <DashbordStatsGrid />
            <div className='flex flex-row gap-4 w-full'>
                <TransactionChart />
                <BuyerProfileChart />
            </div>
            
        </div>
    )
}
