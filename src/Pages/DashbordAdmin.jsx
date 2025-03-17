import React, { useState } from 'react'
import Sidebar from '../Dashbord Admin/Sidebar'
import MainContent from '../Dashbord Admin/MainContent';

export default function DashbordAdmin() {
    const [darkMode, setDarkMode] = useState(true);

    const [isOpen, setIsOpen] = useState(false);

    const toggleDarkMode = () => setDarkMode(!darkMode);
    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <div className={`flex font-Monteserrat bg-slate-700 ${darkMode && "dark"}`}>
            <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
            <MainContent isOpen={isOpen} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        </div>
    )
}
