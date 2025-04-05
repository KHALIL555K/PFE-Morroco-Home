import React from 'react'
import user1 from '../../assets/user1.jpg'
import user3 from '../../assets/user3.jpg'
import user4 from '../../assets/user4.jpg'
import user5 from '../../assets/user5.jpg'


export default function Commantaire() {

    const commantaires = [
        {
            img: user1,
            name: 'Khalil',
            role: 'Voyageur fréquent',
            rating: 5,
            description: 'Une expérience exceptionnelle ! La réservation en ligne est ultra-rapide et le personnel à l\'arrivée était très accueillant. Je recommande vivement cette plateforme pour vos séjours au Maroc.',
            date: '15 mars 2024'
        },
        {
            img: user5,
            name: 'Ayoub',
            role: 'Touriste espagnol',
            rating: 4,
            description: 'Très bon service avec des options de paiement flexibles. J\'ai particulièrement apprécié la possibilité de payer sur place. La chambre était exactement comme sur les photos.',
            date: '2 février 2024'
        },
        {
            img: user3,
            name: 'Youssef',
            role: 'Homme d\'affaires',
            rating: 5,
            description: 'Parfait pour les professionnels. La connexion wifi était excellente et le service 24h/24 m\'a permis de travailler confortablement. Je reviendrai certainement.',
            date: '28 janvier 2024'
        },
        {
            img: user4,
            name: 'Ahmed',
            role: 'Famille avec enfants',
            rating: 4,
            description: 'Nous avons passé un excellent séjour en famille. Le système de réservation est simple à utiliser et l\'hôtel proposait des activités pour les enfants. Merci !',
            date: '10 décembre 2023'
        },
       
    ]

    return (
        <div className='w-full min-h-[32em]'>
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
