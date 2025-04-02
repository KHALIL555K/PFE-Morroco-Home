import React from 'react';
import { LuLayoutDashboard } from 'react-icons/lu';
import MenuItem from './MenuItem';
// import { menuItems } from "../../constants/index";
import { RiArrowLeftWideFill, RiArrowRightWideFill } from 'react-icons/ri';
import { FaCog, FaHome } from 'react-icons/fa';
import { FaChartLine, FaUser } from 'react-icons/fa6';
import { Link } from 'react-router-dom';



export default function Sidebar({ isOpen, toggleSidebar }) {
    return (
        <div className={`fixed left-0 top-0 h-full bg-slate-800 text-white transition-all
         z-50 flex flex-col duration-300 dark:bg-slate-700  ${isOpen ? "w-44" : "w-16 items-center"}`}>
            {/* Sidebar Logo */}
            <div className='flex items-center justify-center py-4'>
                <LuLayoutDashboard className={`text-2xl text-teal-700 transition-all ${isOpen ? "w-12" : 'w-8'}`} />
            </div>


            <div className="mt-6 flex-1">
                <Link to={'/Dashbord/Admin'}>
                    <div className='m-2 flex m-2 flex cursor-pointer items-center space-x-4 rounded px-4 py-3 text-gray-400  hover:bg-brandPrimary hover:text-white'>
                        <FaHome className="text-xl" />
                        {isOpen && <span className='text-[14px] overflow-hidden'>home</span>}
                    </div>
                </Link>

                <Link to={'Recpetionniste'}>
                    <div className='m-2 flex m-2 flex cursor-pointer items-center space-x-4 rounded px-4 py-3 text-gray-400  hover:bg-brandPrimary hover:text-white'>
                        <FaUser className="text-xl" />
                        {isOpen && <span className='text-[14px] overflow-hidden'>Les Receptionniste</span>}
                    </div>
                </Link>

                <Link to={'Profile'}>
                    <div className='m-2 flex m-2 flex cursor-pointer items-center space-x-4 rounded px-4 py-3 text-gray-400  hover:bg-brandPrimary hover:text-white'>
                        <FaCog className="text-xl" />
                        {isOpen && <span className='text-[14px] overflow-hidden'>Votre Profile</span>}
                    </div>
                </Link>

                <Link to={'Statistique/Details'}>
                    <div className='m-2 flex m-2 flex cursor-pointer items-center space-x-4 rounded px-4 py-3 text-gray-400  hover:bg-brandPrimary hover:text-white'>
                        <FaChartLine className="text-xl" />
                        {isOpen && <span className='text-[14px] overflow-hidden'>Statistique Details</span>}
                    </div>
                </Link>

            </div>



            {/* Toggle Button */}
            <button onClick={toggleSidebar} className='m-2 flex items-center justify-center
             rounded-md bg-gray-700 p-3 text-2xl font-bold hover:bg-brandPrimary duration-200'>
                {isOpen ? <RiArrowLeftWideFill /> : <RiArrowRightWideFill />}
            </button>
        </div>
    );
}


{/* menu List */ }

{/* <div className='mt-6 flex-1'>
{menuItems.map((item, key) => (
<MenuItem
key={key}
icon={item.icon}
name={item.name}
isOpen={isOpen}
isLogout={item.isLogout}
/>
))}
</div> */}