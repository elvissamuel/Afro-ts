"use client"
import React, { useContext, useEffect, useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import {registerUser} from '../api/api'
import { encryptData } from '../AES/AES'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { Toaster, toast } from 'sonner'
import { UserFormValues } from '@/models/models'

type UserFormProps = {}

const UserForm = (props: UserFormProps) => {

  const {register, handleSubmit, formState: {errors}, reset} = useForm<UserFormValues>()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const onSubmit:  SubmitHandler<UserFormValues> = (data) => {
    const encryptedInfo = encryptData({data, secretKey: "ticker2020@1234#"})
    window.localStorage.setItem('Afro_Email', data.email)
    console.log('encry: ',encryptedInfo)
    registerUser({encryptedInfo, setLoading, reset, router, toast})  
  }

  return (
    <div>
        <Toaster richColors position='top-right' closeButton />
      <form onSubmit={handleSubmit(onSubmit)} className="md:grid md:grid-cols-2 gap-4 rounded-lg border border-opacity-50 border-secondaryColor px-6 py-2 my-3">
          <h2 className="col-span-2 font-semibold text-lg">Sign up</h2>
          <div className='my-2'>
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-primaryColor"
            >
              Full Name
            </label>
            <div className="mt-2">
              <input
                {...register('full_name', {required:true})}
                type="text"
                id="name"
                className="block w-full bg-secondaryColor rounded-md border-0 py-1.5 px-2 text-primaryColor placeholder:text-primaryColor sm:text-sm sm:leading-6"
              />
              {errors.full_name && <span className='text-sm'>This field is required</span>}
            </div>
          </div>
          <div className='my-2'>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-primaryColor"
            >
              Email
            </label>
            <div className="mt-2">
            <input
              {...register('email', { required: true })}
              type="email"
              id="email"
              className="block w-full bg-secondaryColor rounded-md border-0 py-1.5 px-2 text-primaryColor placeholder:text-primaryColor sm:text-sm sm:leading-6"
            />

              {errors.email && <span className='text-sm'>This field is required</span>}
            </div>
          </div>

          <div className="col-span-2 my-2">
            <label
              htmlFor="home_address"
              className="block text-sm font-medium leading-6 text-primaryColor"
            >
              Home Address
            </label>
            <div className="mt-2">
              <input
                {...register('home_address', {required:true})}
                type="text"
                id="home_address"
                className="block w-full bg-secondaryColor rounded-md border-0 py-1.5 px-2 text-primaryColor placeholder:text-primaryColor sm:text-sm sm:leading-6"
              />
              {errors.home_address && <span className='text-sm'>This field is required</span>}
            </div>
          </div>

          <div className="col-span-2 my-2">
            <label
              htmlFor="phone-no"
              className="block text-sm font-medium leading-6 text-primaryColor"
            >
              Phone Number
            </label>
            <div className="mt-2">
              <input
                {...register('phone_number', {required:true})}
                type="text"
                id='phone-no'
                className="block w-full bg-secondaryColor rounded-md border-0 py-1.5 px-2 text-primaryColor placeholder:text-primaryColor sm:text-sm sm:leading-6"
               
              />
              {errors.phone_number && <span className='text-sm'>This field is required</span>}
            </div>
          </div>

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
              {errors.confirmPassword && <span className='text-sm'>{errors.confirmPassword.message}</span>}
            </div>
          </div>
          <button disabled={loading} type='submit' className={`${loading?'bg-slate-400' : 'bg-primaryColor'} text-white p-2 col-span-2 rounded-lg`}>{loading? 'Loading...' : 'Submit'}</button>
          <p className="text-primaryColor col-span-2 text-center">Got an account? <Link href='/login' className="underline font-semibold">Sign in</Link></p>
        </form>
    </div>
  )
}

export default UserForm