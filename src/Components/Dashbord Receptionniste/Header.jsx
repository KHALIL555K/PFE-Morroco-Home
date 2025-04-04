import React from 'react'
import { BsHouseAddFill } from 'react-icons/bs';
import { HiOutlineSearch } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const userData = JSON.parse(localStorage.getItem('receptionniste'));
    const navigate = useNavigate();

    return (
        <div>
            <div className='bg-white h-16 px-4 flex justify-between items-center border-b border-gray-200 px-4 shadow-xl'>
                <div className='flex gap-3 items-center'>

                    <div className='relative'>
                        <HiOutlineSearch fontSize={20} className='text-gray-400 absolute top-1/2 -translate-y-1/2 left-3' />
                        <input type="text"
                            placeholder='Recherche....'
                            className='text-sm focus:outline-none active:outline-none focus:border-gray-500 h-10 w-[24rem] border border-gray-300 rounded-lg pl-11 pr-4 px-4 ' />
                    </div>
                    <div>
                        <button onClick={() => navigate('/Dashbord/Receptionniste/Chambres/Create')} className='bg-green-500 text-white font-bold p-2 rounded-xl hover:bg-neutral-500 duration-300 flex items-center gap-2 '>
                            <BsHouseAddFill className='text-white text-4xl ' />
                            ajouter un chambre
                        </button>
                    </div>
                </div>
                {/* image de receptionnniste */}
                <div className='flex items-center gap-3'>
                    <div className='rounded-full w-10 h-10 bg-red-500'>
                    </div>
                    {userData?.prenom}
                </div>
            </div>

        </div>
    )
}
