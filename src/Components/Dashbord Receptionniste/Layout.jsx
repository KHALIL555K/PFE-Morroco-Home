import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

export default function Layout() {
    return (
        <div className='flex flex-row bg-neutral-100 h-screen overflow-hidden'>
            <Sidebar />
            <div className='flex-1 flex flex-col min-h-0'> {/* Ajout de flex-col et min-h-0 */}
                <Header />
                <div className='p-4 overflow-y-auto flex-1'> {/* Ajout de overflow-y-auto et flex-1 */}
                    <Outlet />
                </div>
            </div>
        </div>
    )
}