import React from 'react'
import { CiLogout } from 'react-icons/ci';
import { FaUser } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom';

export default function Navbar() {

    const user = JSON.parse(localStorage.getItem('user'));
    
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear('user')
        navigate('/')
    }

    return (
        <header className='w-full py-2 px-12 fixed min-h-[60px] top-0 left-0 right-0 text-bold uppercase border-b bg-white'>
            <nav className='flex justify-between items-center pl-3 '>
                <h1 className='text-2xl '> <a href="#"> Morroco <span className='text-brandPrimary'> Home</span></a></h1>
                <div className="relative">

                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>

                    <input
                        type="text"
                        className="pl-10 pr-4 py-2 text-base uppercase border border-gray-300 rounded-3xl shadow-md focus:outline-none focus:border-brandPrimary focus:ring-2 focus:ring-brandPrimary w-[550px] transition-all duration-300"
                        placeholder="Rechercher ..."
                        aria-label="Rechercher"
                    />
                </div>

                <div className='w-12 flex gap-2'>
                    <button onClick={logout}>
                        <CiLogout className='w-10 h-10 border border-gray-300 rounded-full p-2 text-gray-700' />
                    </button>
                    <div>
                        <FaUser className='w-10 h-10 border border-gray-300 rounded-full p-2 text-gray-700' />
                    </div>
                </div>
            </nav>
        </header>
    )
}
