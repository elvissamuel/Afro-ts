"use client"
import React, { useRef } from 'react'

type Props = {}

const KnowYourClient = (props: Props) => {

    const passportInput = useRef<HTMLInputElement>(null)
    const utilityInput = useRef<HTMLInputElement>(null)

    const passportUpload = () => {
        passportInput.current?.click()
    }
    const utilityUpload = ()=>{
        utilityInput.current?.click()
    }

  return (
    <div className="flex bg-gradient-to-r from-secondaryColor via-white to-white min-h-full flex-1 flex-col justify-center px-6 pb-8 lg:px-8">
  
          <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md  bg-viaColor">
          <p className='border w-full p-4 border-secondaryColor text-primaryColor font-semibold'>
            Know your client
          </p>
            <div className=" w-32 h-32 bg-secondaryColor flex justify-center items-center rounded-[50%] mx-auto my-3 text-center text-primaryColor">
                <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
  <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
</svg>

                </div>
            </div>
            <p className='mx-auto w-full text-primaryColor font-semibold text-center mb-8'>Take photo</p>
            <form className="space-y-6 px-4" action="#" method="POST">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-primaryColor">
                  Owner's Name
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block px-3 w-full bg-secondaryColor rounded-md border-0 py-1.5 text-primaryColor shadow-sm placeholder:text-primaryColor sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-primaryColor">
                    Date of Birth
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block px-3 w-full bg-secondaryColor rounded-md border-0 py-1.5 text-primaryColor shadow-sm placeholder:text-primaryColor sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className='grid grid-cols-2 gap-2'>
                  <div className='h-[146] cursor-pointer border border-dashed border-secondaryColor flex flex-col justify-center items-center text-primaryColor font-semibold'>
                  <div>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                  </div>

                    <p className='text-sm'>Upload utility bill</p>
                    <input ref={utilityInput} type="file" className='hidden' name="" id="" />
                  </div>
                  <div onClick={passportUpload} className='h-[146px] cursor-pointer border border-dashed border-secondaryColor flex flex-col justify-center items-center text-primaryColor font-semibold'>
                    <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>

                    </div>
                    <p className='text-sm'>Passport ID</p>
                    <input ref={passportInput} type="file" className='hidden' name="" id="" />
                  </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-primaryColor px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-teal-600"
                >
                   Submit
                </button>
              </div>
            </form>
          </div>
        </div>
  )
}

export default KnowYourClient