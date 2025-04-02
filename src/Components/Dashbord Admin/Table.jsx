import React from 'react'
import Title from './Title'
import { tableData } from '../../constants/index'
import { MdAutoDelete } from 'react-icons/md'
import { FaRegPenToSquare } from 'react-icons/fa6'
import { Link} from 'react-router-dom'

export default function Table() {


    return (
        <div className='flex-1 rounded-xl bg-white p-5 dark:bg-slate-600 dark:text-slate-300 '>
            <Link to={'/Dashbord/Admin/Create'} className='bg-brandPrimary text-white p-3 block max-w-fit rounded-xl mb-5 dark:bg-slate-300 dark:text-slate-600'>
                ajouter un nouveau Receptionniste
            </Link>

            <Title>les Receptionnistes de votre Hotel </Title>

            <table className='min-w-full '>
                <thead>
                    <tr className='text-sm md:text-base'>
                        <th className='px-4 py-2 text-left font-semibold text-slate-400'>ID</th>
                        <th className='px-4 py-2 text-left font-semibold text-slate-400'>Reciept Name</th>
                        <th className='px-4 py-2 text-left font-semibold text-slate-400'>Dae</th>
                        <th className='px-4 py-2 text-left font-semibold text-slate-400'>Amount</th>
                    </tr>
                </thead>

                <tbody>
                    {tableData.map((item, key) => {
                        return (
                            <tr key={key} className='border-b border-slate-200 text-sm md:text-base'>
                                <td className='px-4 py-3 font-medium'>{item.id}</td>
                                <td className='px-4 py-3 font-medium'>{item.receiptName}</td>
                                <td className='px-4 py-3 font-medium'>{item.date}</td>
                                <td className='px-4 py-3 font-medium'>{item.amount}</td>
                                <td>
                                    <button className='text-white bg-blue-800 p-2 rounded-lg mr-1'>
                                        <FaRegPenToSquare className='text-xl' />
                                    </button>
                                    <button className='text-white bg-red-800 p-2 rounded-lg  ml-1'>
                                        <MdAutoDelete className='text-xl' />
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
