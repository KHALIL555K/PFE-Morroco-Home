import React from 'react';
import { FcBullish } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineAnnotation, HiOutlineCog, HiOutlineCube, HiOutlineQuestionMarkCircle, HiOutlineShoppingCart, HiOutlineViewGrid } from 'react-icons/hi';
import { CiLogout } from 'react-icons/ci';

export default function Sidebar() {

    const navigate = useNavigate();
    const LogOut = () => {
        localStorage.clear();
        navigate('/')
    }

    return (
        <div className='bg-neutral-900 w-60 p-3 flex flex-col text-white h-screen shadow-xl'>
            <div className='flex items-center gap-2 px-1 py-3'>
                <FcBullish fontSize={24} />
                <span className='text-neutral-100 text-lg'>Dashboard</span>
            </div>
            <div className='flex-1 flex flex-col gap-1 py-4'>
                <Link className='hover:bg-neutral-600 p-2 rounded-lg flex items-center gap-2' to={'/Dashboard/Receptionniste'} >
                    <HiOutlineViewGrid />
                    Dashbord
                </Link>

                <Link className='hover:bg-neutral-600 p-2 rounded-lg  flex items-center gap-2' to={'/Dashboard/Receptionniste/Chambres'}>
                    <HiOutlineCube />
                    Chambres
                </Link>

                <Link className='hover:bg-neutral-600 p-2 rounded-lg  flex items-center gap-2' to={'/Dashboard/Receptionniste/Reservation'}>
                    <HiOutlineShoppingCart />
                    Reservation
                </Link>


            </div>

            <div className='mt-auto flex flex-col gap-0.5 pt-2 border-t border-neutral-700'>

                <Link className='hover:bg-neutral-600 p-2 rounded-lg  flex items-center gap-2' to={'/Dashboard/Receptionniste/Transactions'}>
                    <HiOutlineCog />
                    Settigns
                </Link>

                <Link className='hover:bg-neutral-600 p-2 rounded-lg  flex items-center gap-2' to={'/Dashboard/Receptionniste/Transactions'}>
                    <HiOutlineQuestionMarkCircle />
                    Supports
                </Link>

                <button onClick={LogOut} className='hover:bg-neutral-600 p-2 rounded-lg text-red-500 flex items-center gap-2' to={'/'}>
                    <CiLogout />
                    Log out
                </button>
            </div>
        </div>
    );
}

