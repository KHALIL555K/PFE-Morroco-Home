import React from 'react'

export default function MenuItem({ icon: Icon, name, isOpen, isLogout }) {
    return (
        <div className={`m-2 flex cursor-pointer items-center
         space-x-4 rounded px-4 py-3 text-gray-400 duration-500 hover:bg-teal-700 hover:white ${isLogout ? "mt-auto hidden" : ""}`}>
            <Icon className="text-xl" />
            {isOpen && <span className='text-[14px] overflow-hidden'>{name}</span>}
        </div>
    )
}
