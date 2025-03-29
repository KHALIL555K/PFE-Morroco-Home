import React from 'react'
import { cardItems } from '../../constants/index'
import CardItems from './CardItems'

export default function Cards() {
    return (
        <div className='translate-all flex flex-wrap gap-3 p-4 duration-300 sm:px-7'>
            {
                cardItems.map((item, key) => {
                    return <CardItems item={item} key={key} />
                })
            }
        </div>
    )
}
