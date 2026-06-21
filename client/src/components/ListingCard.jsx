import React from 'react'
import { platformIcons } from '../assets/assets';

const ListingCard = ({listings}) => {

    const currency = import.meta.env.VITE_CURRENCY || 'R';

  return (
    <div className='relative bg-white rounded-2x1 shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition'>
      {/* Featured Banner */}
      {listings.featured &&(
        <>
        <p className='py-1' />
        <div className='absolute top-0 left-0 w-full bg-gradient-to-r from-pink-500 to-purpple-500 text-while text-center text-xs font-semibold py-1 tracking-wide uppercase'>
            Featured
        </div>
        </>
      )}

      <div className='p-5-pt-8'>
        {/* Header */}
        <div className='flex items-center gap-3 mb-3'>
            {platformIcons[listings.platform]}

            <div className='flex flex-col'> 
                <h2>{listings.title}</h2>
            </div>
{/* 1:45:57 */}
        </div>
      </div>
    </div>
  )
}

export default ListingCard
