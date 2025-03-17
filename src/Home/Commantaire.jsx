import React from 'react'
import user1 from '../assets/user1.jpg'
import user3 from '../assets/user3.jpg'
import user4 from '../assets/user4.jpg'
import user5 from '../assets/user5.jpg'



export default function Commantaire() {

    const commantaires = [
        {
            img: user1,
            name: 'khalil',
            description: ' Lorem ipsum dolor sit amet, Lorem, ipsum dolor. consectetur adipisicing elit. Voluptatum, aliquam.',
        },
        {
            img: user5,
            name: 'ayoub',
            description: ' Lorem ipsum dolor sit amet, Lorem, ipsum dolor. consectetur adipisicing elit. Voluptatum, aliquam.',
        },
        {
            img: user3,
            name: 'youssef',
            description: ' Lorem ipsum dolor sit amet, Lorem, ipsum dolor. consectetur adipisicing elit. Voluptatum, aliquam.',
        },
        {
            img: user4,
            name: 'ahmed',
            description: ' Lorem ipsum dolor sit amet, Lorem, ipsum dolor. consectetur adipisicing elit. Voluptatum, aliquam.',
        },
    ]

    return (
        <div className='w-full min-h-screen'>
            <h1 className='text-3xl uppercase text-center font-bold mb-12'>quele commantaire des utilisateurs sur notre plateform</h1>
            <div className='flex justify-center items-center gap-10 '>

                {

                    commantaires.map((value, key) => {
                        return (
                            <div key={key} className='w-[20%] shadow-md  rounded-lg  overflow-hidden'>
                                <div className='flex justify-around items-center '>
                                    <img src={value.img} width={80} className='rounded-full ' />
                                    <p>{value.name}</p>
                                </div>
                                <div className='overflow-hidden mt-12'>
                                    <p className='text-center mb-3 px-2'>{value.description}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}
