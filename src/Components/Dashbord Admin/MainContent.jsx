import React from 'react'
import Header from './Header'
import Cards from './Cards'
import CustomBarChart from './CustomBarChart'
import Table from './Table'
import { Outlet } from 'react-router-dom'

export default function MainContent({ isOpen, darkMode, toggleDarkMode }) {
    return (
        <div className={`flex-1 bg-slate-200 ${isOpen ? "md:ml-44" : "ml-16"} transition-all duration-300 dark:bg-slate-800 `}>
            <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            <div className='m-5 min-h-screen'>
                <Outlet />
            </div>
        </div>
    )
}
