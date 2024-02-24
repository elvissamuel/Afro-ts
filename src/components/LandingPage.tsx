"use client"

import React, { useEffect, useState } from 'react'
import afrologo from '@/assets/imgs/afrologo.png'
import herobg from '@/assets/imgs/hero-img.png'
import LandingPageForm from './LandingPageForm'
import Footer from './Footer'
import { Toaster, toast } from 'sonner'
import Image from 'next/image'


const LandingPage = () => {
  const [displayForm, setDisplayForm] = useState(false)
  const [ipAddress, setIpAdrress] = useState('')
  const [open, setOpen] = useState(false)
  

  useEffect(() => {
    fetch("https://api64.ipify.org?format=json")
      .then((response) => response.json())
      .then((data) => {
        const myIPAddress = data.ip;
        setIpAdrress(myIPAddress);
      })
      .catch((error) => {
        console.error("Error fetching IP:", error);
      });
  }, []);

  return (
    <div className='bg-gradient-to-r from-secondaryColor via-white to-white' >
        <Toaster richColors position='top-center' />
      <div className='flex flex-col gap-16 lg:grid lg:grid-cols-2 bg-gradient-to-r from-secondaryColor via-white to-white lg:h-screen lg:overflow-hidden'>
        <div className='relative h-full border-r'>          
          <div className='mx-auto pt-24 lg:pt-0 px-12 lg:px-2 flex flex-col items-center h-full justify-center'>
            
            <div className='flex flex-col items-center text-center gap-5'>
              <Image className='w-[211px] h-[100px]' src={afrologo} alt="afro-logo" />
              <h2 className='text-primaryColor text-4xl lg:text-5xl font-semibold'>Be First in Line!</h2>
              <p className='text-primaryColor'>Join our exclusive waiting list and stay informed for the Grand Launch</p>
              <button onClick={()=>setOpen((prev)=>!prev)} className='bg-primaryColor text-white py-3 w-44 rounded-xl'>Join now</button>
            </div>
          </div>
            
        </div>

        <div className='h-full'>
          <div className='w-full h-full'>
            <Image src={herobg} className='object-cover h-full' alt="" />
          </div>
        </div>

        {open && <LandingPageForm ipAddress={ipAddress} setOpen={setOpen} open={open} />}
      </div>
      <Footer />
    </div>
  )
}

export default LandingPage
