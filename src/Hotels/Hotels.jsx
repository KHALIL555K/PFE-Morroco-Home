import React from 'react'
import chambreTest from '../assets/chambreTest.jpg'
import { IoIosAdd } from 'react-icons/io'

export default function Hotels() {

    const cards = [
        {
            img: chambreTest,
            nomHotel: 'nador hotel',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At, ipsa.',
            prix: 20,
            iconPlus: <IoIosAdd />
        },
        {
            img: chambreTest,
            nomHotel: 'nador hotel',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At, ipsa.',
            prix: 20,
            iconPlus: <IoIosAdd />
        },
        {
            img: chambreTest,
            nomHotel: 'nador hotel',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At, ipsa.',
            prix: 20,
            iconPlus: <IoIosAdd />
        },
        {
            img: chambreTest,
            nomHotel: 'nador hotel',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At, ipsa.',
            prix: 20,
            iconPlus: <IoIosAdd />
        },
        {
            img: chambreTest,
            nomHotel: 'nador hotel',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At, ipsa.',
            prix: 20,
            iconPlus: <IoIosAdd />
        },
        {
            img: chambreTest,
            nomHotel: 'nador hotel',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At, ipsa.',
            prix: 20,
            iconPlus: <IoIosAdd />
        },
        {
            img: chambreTest,
            nomHotel: 'nador hotel',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At, ipsa.',
            prix: 20,
            iconPlus: <IoIosAdd />
        },
        {
            img: chambreTest,
            nomHotel: 'nador hotel',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At, ipsa.',
            prix: 20,
            iconPlus: <IoIosAdd />
        },
        {
            img: chambreTest,
            nomHotel: 'nador hotel',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At, ipsa.',
            prix: 20,
            iconPlus: <IoIosAdd />
        },

    ]

    return (
        <section className='w-full max-w-8xl mx-auto justify-center mt-[8em] flex flex-wrap gap-6'>
            {cards.map((value, key) => (
                <div
                    key={key}
                    className='w-full sm:w-[48%] md:w-[30%] lg:w-[23%] flex flex-col shadow-md rounded-lg p-2 text-center'
                >
                    <div>
                        <img src={value.img} className='rounded-lg w-full' alt={value.nomHotel} />
                    </div>
                    <h3 className='md:text-xl lg:text-2xl my-4 sm:text-lg  '>Hotel : {value.nomHotel}</h3>
                    <p className='lg:text-lg md:text-md sm:text-sm'>{value.description}</p>
                    <div className='flex justify-between items-center w-full mt-4'>
                        <p>{value.prix} MAD</p>
                        <button className='bg-brandPrimary text-white p-2 rounded-full'>
                            {value.iconPlus}
                        </button>
                    </div>
                </div>
            ))}
        </section>
    );
}
