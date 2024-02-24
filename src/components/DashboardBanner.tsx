import React from 'react'
import banner from '@/assets/imgs/bannerimg.png'
import Image from 'next/image'

type Props = {}

const DashboardBanner = (props: Props) => {
  return (
    <div className=''>
      <div className='bg-secondaryColor my-4 md:flex justify-between items-center px-4 lg:px-24 py-2 h-[280px] md:h-[200px] w-[90%] mx-auto rounded'>
        <div className='text-primaryColor '>
            <h2 className='text-xl md:text-2xl lg:text-3xl font-bold'>Savor Perfection: Try Our <br /> Exquisite Indomitable Today!</h2>
            <button className='bg-primaryColor z-30 text-white my-4 px-3 py-1 rounded-lg'>Buy Now</button>
        </div>
        <div className='-mt-32 md:-mt-20 '>
            <Image src={banner} width={400} className='' alt="banner-img" />
        </div>
      </div>
    </div>
  )
}

export default DashboardBanner