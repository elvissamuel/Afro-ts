"use client"
import logo from '@/assets/imgs/afrologo.png'
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form'
import { handlePasswordReset } from '@/api/api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { encryptData } from '@/AES/AES';
import { LoginContext } from '@/contexts/LoginContext';
import { Toaster, toast } from 'sonner'
import Image from 'next/image';
import { ResetPasswordFormValues } from '@/models/models';

type Props = {}

const ResetPassword = (props: Props) => {

  const [loading, setLoading] = useState(false)
  const {register, handleSubmit, formState: {errors}, reset} = useForm<ResetPasswordFormValues>()
  const router = useRouter()

  const onSubmit: SubmitHandler<ResetPasswordFormValues> = (data) => {
    const myData = {email: window.localStorage.getItem('Afro_Email'), password: data.password}
    const encryptedInfo = encryptData({data:myData, secretKey: "ticker2020@1234#"})
    console.log('encry: ',encryptedInfo)
    handlePasswordReset({data:encryptedInfo, setLoading, reset, router, toast})  
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
              New Password
          </h2>
          <p className='mb-2 text-sm text-primaryColor'>Please enter the new password</p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" action="#" method="POST">

          <div className='my-2'>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-primaryColor"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                {...register('password', {required:true})}
                type="password"
                id='password'
                className="block w-full bg-secondaryColor rounded-md border-0 py-1.5 px-2 text-primaryColor placeholder:text-primaryColor sm:text-sm sm:leading-6"
              />
              {errors.password && <span className='text-sm'>This field is required</span>}
            </div>
          </div>

          <div className='my-2'>
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium leading-6 text-primaryColor"
            >
              Confirm Password
            </label>
            <div className="mt-2">
              <input
                  className="block w-full bg-secondaryColor rounded-md border-0 py-1.5 px-2 text-primaryColor placeholder:text-primaryColor sm:text-sm sm:leading-6"
                  type="password"
                  id="confirmPassword"
                  {...register('confirmPassword', {
                    validate: (value) => {const passwordInput = document.getElementById('password') as HTMLInputElement | null;
                    if (passwordInput !== null) {
                        return value === passwordInput.value || 'The passwords do not match';
                    }}
                  })}
                />
              {errors.confirmPassword && <span className='text-sm'>Password does not match</span>}
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

export default ResetPassword