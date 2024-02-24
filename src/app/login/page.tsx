"use client"

import logo from '@/assets/imgs/afrologo.png'
import { useContext, useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form"
import { handleLogin } from '@/api/api';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { encryptData } from '@/AES/AES';
import { LoginContext } from '@/contexts/LoginContext';
import { Toaster, toast } from 'sonner'
import { LoginFormValues } from '@/models/models';



export default function Login() {
  const [loading, setLoading] = useState(false)
  const {register, handleSubmit, formState: {errors}, reset} = useForm<LoginFormValues>()
  const router = useRouter()
  const contextValues = useContext(LoginContext)
  if(!contextValues){
    return null;
  }
  const {setIpAddress, setLoginAuth, setIsBusiness, setKycVerified, loginAuth} = contextValues

  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    const encryptedInfo = encryptData({data, secretKey: process.env.NEXT_PUBLIC_AFROMARKETS_SECRET_KEY})
    console.log('encry: ',encryptedInfo)
    handleLogin({encryptedInfo, setLoading, reset, router, setLoginAuth, setIsBusiness, setKycVerified, toast})  
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
                Login
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" action="#" method="POST">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-primaryColor">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    {...register('email', {required:true})}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full bg-secondaryColor rounded-md border-0 py-1.5 px-3 text-primaryColor shadow-sm placeholder:text-primaryColor sm:text-sm sm:leading-6"
                  />
                  {errors.email && <span className='text-sm'>This field is required</span>}
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-primaryColor">
                    Password
                  </label>
                  <div className="text-sm">
                    <Link href="/forgot-password" className="font-semibold text-primaryColor hover:text-primaryColorVar">
                      Forgot password?
                    </Link>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    {...register('password', {required:true})}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full bg-secondaryColor rounded-md border-0 py-1.5 px-3 text-primaryColor shadow-sm placeholder:text-primaryColor sm:text-sm sm:leading-6"
                  />
                  {errors.password && <span className='text-sm'>This field is required</span>}
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className={`${loading ? 'bg-gray-500' : 'bg-primaryColor'} flex w-full justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-teal-600`}
                >
                  {loading ? 'Loading...' : 'Sign in'}
                </button>
              </div>
            </form>
  
            <p className="mt-10 text-center text-sm text-primaryColor">
              Dont have an account?{' '}
              <Link href='/signup' className="font-semibold leading-6 text-primaryColor underline hover:text-primaryColorVar">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </>
    )
  }
  