"use client"
import { SubmitHandler, useForm } from 'react-hook-form'
import { handleVerifyEmail } from '@/api/api';
import { useRouter } from 'next/navigation';
import { encryptData } from '@/AES/AES';
import { Toaster, toast } from 'sonner'
import { useState } from 'react';
import { VerifyEmailFormValues } from '@/models/models';
import Image from 'next/image';
import logo from '@/assets/imgs/afrologo.png'

type Props = {}

const ForgotPassword = (props: Props) => {

  const [loading, setLoading] = useState(false)
  const {register, handleSubmit, formState: {errors}, reset} = useForm<VerifyEmailFormValues>()
  const router = useRouter()

  const onSubmit: SubmitHandler<VerifyEmailFormValues>  = (data) => {
    window.localStorage.setItem('Afro_Email', data.email)
    const encryptedInfo = encryptData({data, secretKey: "ticker2020@1234#"})
    console.log('encry: ',encryptedInfo)
    handleVerifyEmail({data:encryptedInfo, setLoading, router, toast})  
  }

  return (
    <>
      <div className="flex bg-gradient-to-r from-secondaryColor via-white to-white min-h-full h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <Toaster richColors position='top-right' />
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            className="mx-auto h-14 w-auto"
            src={logo}
            alt="Your Company"
          />
         
        </div>
        

        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md p-8 bg-viaColor">
          <h2 className=" text-center text-xl font-bold leading-9 tracking-tight text-primaryColor">
              Forgot Password
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" action="#" method="POST">

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-primaryColor">
                Enter your email address for password reset
                </label>
                
              </div>
              <div className="mt-2">
                <input
                  {...register('email', {required:true})}
                  id="email"
                  name="email"
                  type="text"
                  autoComplete="current-email"
                  required
                  className="block w-full bg-secondaryColor rounded-md border-0 py-1.5 px-3 text-primaryColor shadow-sm placeholder:text-primaryColor sm:text-sm sm:leading-6"
                />
                {errors.email && <span className='text-sm'>This field is required</span>}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className={`${loading ? 'bg-gray-500' : 'bg-primaryColor'} flex w-full justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-teal-600`}
              >
                {loading ? 'Loading...' : 'Continue'}
              </button>
            </div>
          </form>

        </div>
      </div>
    </>
  )
}

export default ForgotPassword