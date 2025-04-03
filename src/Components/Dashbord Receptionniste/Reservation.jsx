import React from 'react'

export default function Reservation() {
    return (
        <div className='flex-1 rounded-xl bg-white p-5 dark:bg-slate-600 dark:text-slate-300 '>


            {/* <Title>les Receptionnistes de votre Hotel </Title> */}

            <table className='min-w-full '>
                <thead>
                    <tr className='text-sm md:text-base'>
                        <th className='px-4 py-2 text-left font-semibold text-slate-400'>ID</th>
                        <th className='px-4 py-2 text-left font-semibold text-slate-400'>Nom</th>
                        <th className='px-4 py-2 text-left font-semibold text-slate-400'>Prenom</th>
                        <th className='px-4 py-2 text-left font-semibold text-slate-400'>Email</th>
                        <th className='px-4 py-2 text-left font-semibold text-slate-400'>Actif</th>
                        <th className='px-4 py-2 text-left font-semibold text-slate-400'>Operation :</th>
                    </tr>
                </thead>

                <tbody>

                </tbody>
            </table>
        </div>
    )
}
