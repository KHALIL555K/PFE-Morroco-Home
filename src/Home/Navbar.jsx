import React, { useEffect, useState } from 'react'
import { FaBars, FaXmark } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isSticky, setIsSticky] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsSticky(true)
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.addEventListener('scroll', handleScroll);
        }
    })

    const navItems = [
        { link: 'Home', path: '/home' },
        { link: "Service", path: '/service' },
        { link: "About", path: '/about' },
        { link: 'Commantaire', path: '/commantaire' }
    ]


    return (
        <header className='w-full md:bg-transparent fixed top-0 left-0 right-0'>
            <nav className={`py-4 lg:px-14 px-4 ${isSticky ? "sticky top-8 left-0 right-0 border-b bg-white duration-300" : ""} bg-white`}>
                <div className='flex justify-between items-center text-base gap-8'>
                    <a href="#" className='font-bold'>MORROCO <span className='text-brandPrimary '>{" "} HOME</span></a>
                    {/* nav items */}
                    <ul className="md:flex space-x-12 hidden">
                        {
                            navItems.map((value, key) => <a href={value.path} key={key} className='block text-base text-gray900
                             hover:text-brandPrimary first:font-medium'>
                                {value.link}</a>)
                        }
                    </ul>
                    {/* btn for large devices */}
                    <div className="space-x-12 hidden lg:flex items-center">
                        <a href="/" className='hidden lg:flex items-center text-brandPrimary hover:text-gray900'>Login</a>
                        <button className='bg-brandPrimary text-white py-2 px-4 transition-all duration-300 rounded hover:bg-neutralDGray'>Sign Up</button>
                    </div>

                    {/* menu for mobile */}
                    <div className="md:hidden">
                        <button onClick={toggleMenu} className='text-neutralDGray focus:outline-none focus:text-gray-500'>
                            {
                                isMenuOpen ? (<FaXmark className='h-6 w-6 ' />) : (<FaBars className='h-6 w-6 text-neutralDGray' />)
                            }
                        </button>
                    </div>
                </div>
                {/* nav items for mobile */}
                <div className={`space-y-4 px-4 mt-10 py-7 bg-brandPrimary ${isMenuOpen ? "block fixed top-0 right-0 left-0" : "hidden"}`}>
                    {
                        navItems.map((value, key) => <a href={value.path} key={key} className='block text-base text-gray900
                             hover:text-brandPrimary first:font-medium'>
                            {value.link}</a>)
                    }
                </div>

            </nav>

        </header>
    )
}
