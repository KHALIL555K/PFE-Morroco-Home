import React from 'react'
import { FaHotel } from 'react-icons/fa6'
import { GiReceiveMoney } from 'react-icons/gi'
import { ImAirplane } from 'react-icons/im'
import { MdLocalHotel, MdOutlineLaptopChromebook, MdOutlinePayment } from 'react-icons/md'

export default function Service() {


    const service = [
        {
            icons: <MdLocalHotel />,
            title: 'reservation des chambres en ligne',
            description: 'vous pouver server des chambres selon votre choix',
        },
        {
            icons: <MdOutlinePayment />,
            title: 'paiyement en ligne ',
            description: 'ila ntoma b3ad t9dro t 3isservew en ligne',
        },
        {
            icons: <GiReceiveMoney />,
            title: 'paiyement sur place ',
            description: 't9dro reserver de paiyement sur place ',
        },
        {
            icons: <FaHotel />,
            title: 'pour les Hotels ',
            description: 'umkin les hotels i7ito les chambres li b3aw platform dialna',
        },
        {
            icons: <ImAirplane />,
            title: 'reservation au marroc',
            description: 'umkin reserver a magrib sarid kolo',
        },
        {
            icons: <MdOutlineLaptopChromebook />,
            title: 'web et mobile',
            description: 'le plateform est accessible pour le mobile et site web',
        },
    ]


    return (
        <section className='h-[46em] w-full'>
            <h1 className='text-5xl text-center my-8 uppercase font-bold '>Service </h1>
            <div className='flex justify-center flex-wrap gap-12 my-10'>
                {service.map((value, key) => (
                    <div
                        key={key}
                        className='flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 w-[25%] sm:flex-wrap' // Ajustez la largeur ici
                    >
                        {/* Icône */}
                        <div className='text-6xl mb-4 text-brandPrimary '>
                            {value.icons}
                        </div>

                        {/* Titre */}
                        <h3 className='text-xl font-semibold mb-2 sm:text-xl'>
                            {value.title}
                        </h3>

                        {/* Description */}
                        <p className='text-gray-600'>
                            {value.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    )
}
