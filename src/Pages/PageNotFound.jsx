import React from 'react'

export default function PageNotFound() {
    return (
        <div className='flex justify-center text-center font-bold text-center font-bold flex-col items-center w-full min-h-screen'>
            <h1 className='text-6xl  my-10'> 404 </h1>
            <p className='text-4xl  uppercase'>page not <span className='text-brandPrimary'>found</span> </p>
        </div>
    )
}
