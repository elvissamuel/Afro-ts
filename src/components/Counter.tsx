"use client"
import React, { useContext } from 'react'
import { LoginContext } from '@/contexts/LoginContext'

type Props = {}

const Counter = (props: Props) => {
  const contextValues = useContext(LoginContext)
  if(!contextValues){
    return null;
  }
  const {count, setCount} = contextValues
    const reduceCount = ()=>{
        setCount(prev => {
            if(prev > 1){
                return prev - 1
            } else {
                return prev
            }
        })
    }
  return (
    <div>
      <div className='w-[114px] h-[40px] rounded-lg grid grid-cols-3'>
        <span onClick={()=>setCount(prev=> prev + 1)} className={`bg-primaryColor cursor-pointer border rounded-l-lg flex items-center justify-center`}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4 text-white">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
        </span>
        <p className='border text-center flex items-center justify-center '>{count}</p>
        <span onClick={()=>reduceCount()} className='flex cursor-pointer items-center justify-center rounded-r-lg border'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
            </svg>
        </span>
      </div>
    </div>
  )
}

export default Counter