import React from 'react'
import { GoMoveToBottom } from 'react-icons/go'
// import react from '../assets/react.svg'

export default function Home() {
    return (
        <div className='bg-neutralSilver'>
            <div className='px-4 lg:px-14 max-w-screen-2xl mx-auto min-h-screen h-screen mt-20 flex justify-center items-center flex-col'>
                <div className='text-center text-xl font-bold flex justify-center items-center flex-col'>
                    {/* logo */}
                    {/* <div className='mb-10'>
                        <img src={react} width={200} alt="" />
                    </div> */}
                    <h1 className='text-4xl  mb-20 uppercase'>Morrocco <span className='text-brandPrimary'> Home </span></h1>
                    {/* un mini discription */}
                    <p className='text-gray-600'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio dolorem molestias error,
                        Rerum quia officia ex, odio fuga accusamus possimus.
                    </p>
                    <GoMoveToBottom className='text-brandPrimary mt-10 text-5xl ' />
                </div>
            </div>

        </div>
    )
}
