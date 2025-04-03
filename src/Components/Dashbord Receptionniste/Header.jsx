import React from 'react'
import { HiOutlineSearch } from 'react-icons/hi'

export default function Header() {
    return (
        <div>
            <div className='bg-white h-16 px-4 flex justify-between items-center border-b border-gray-200 px-4 shadow-xl'>
                <div className='relative'>
                    <HiOutlineSearch fontSize={20} className='text-gray-400 absolute top-1/2 -translate-y-1/2 left-3' />
                    <input type="text"
                        placeholder='Recherche....'
                        className='text-sm focus:outline-none active:outline-none focus:border-gray-500 h-10 w-[24rem] border border-gray-300 rounded-lg pl-11 pr-4 px-4 ' />
                </div>
                {/* image de receptionnniste */}
                <div className='rounded-full w-10 h-10 bg-red-500'>

                </div>
            </div>

        </div>
    )
}
