import React from 'react'
import Header from './Header'
import Cards from './Cards'
import CustomBarChart from './CustomBarChart'
import Table from './Table'

export default function MainContent({ isOpen, darkMode, toggleDarkMode }) {
    return (
        <div className={`flex-1 bg-slate-200 ${isOpen ? "md:ml-44" : "ml-16"} transition-all duration-300 dark:bg-slate-800 `}>
            <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

            <Cards />

            <div className='translate-all flex flex-col gap-4 p-4 duration-300
             sm:px-7 sm:py-1 xl:flex-row '>
                <CustomBarChart />
            </div>
            <div className='translate-all flex flex-col gap-4 p-4 duration-300
             sm:px-7 sm:py-1 xl:flex-row '>
                <Table />
            </div>

        </div>
    )
}
