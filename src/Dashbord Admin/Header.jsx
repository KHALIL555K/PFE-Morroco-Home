import React from 'react'
import { FaMoon, FaSun, FaUser } from 'react-icons/fa'

export default function Header({ toggleDarkMode, darkMode }) {
    return (
        <div className='flex items-center justify-between bg-white px-7 
        py-3 dark:bg-slate-700 dark:text-gray-300 '>
            <h1 className='font-bold'>Dashbord</h1>
            <div className='flex items-center gap-4'>
                <button className="rounded-md bg-slate-200 dark:bg-slate-600 dark:text-slate-300 duration-300" onClick={toggleDarkMode}>
                    {darkMode ? <FaSun className='p-2 text-4xl' /> : <FaMoon className='p-2 text-4xl' />}
                </button>

                <div className='flex items-center gap-3 '>
                    <FaUser className='rounded-md bg-slate-200 p-2 text-4xl dark:bg-slate-600 dark:text-slate-300 ' />
                    <h2 className='font-medium'>John Doe</h2>
                </div>
            </div>
        </div>
    )
}
