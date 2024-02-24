"use client"
import React, { useContext, useEffect, useState } from 'react'
import DashBoardNav from '@/components/DashboardNav'
import DashboardBanner from '@/components/DashboardBanner'
import { getAllItems} from '@/api/api'
import { LoginContext } from '@/contexts/LoginContext'
import { decryptAES, encryptData } from '@/AES/AES'
import {Circles, TailSpin} from 'react-loader-spinner';
import Product from '@/components/Product'
import { Toaster, toast } from 'sonner'
// import { Link, useNavigate } from 'react-router-dom'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import HomeNav from '@/components/HomeNav'
import HomeProducts from '@/components/HomeProducts'

type Props = {}
export type DataSentProp = {
  ip_address: string
  search_word?: string
}

const Home = (props: Props) => {
  const [loading, setLoading] = useState()
  const [searchValue, setSearchValue] = useState('')
  const dataAuth = localStorage.getItem('My_Login_Auth')
  const dataIP = localStorage.getItem('ip_address') ?? ''
  const router = useRouter()
  const contextValues = useContext(LoginContext)
  if(!contextValues){
    return null;
  }
  const {loginAuth, ipAddress, setProducts, products} = contextValues

  const myData = {ip_address: JSON.parse(dataIP)}
  const encryptedData = encryptData({data: myData, secretKey: "ticker2020@1234#"})

  const fetchData = async () => {
    try {
      let data:DataSentProp = { ip_address: JSON.parse(dataIP) };
      if (searchValue !== '') {
        data.search_word = searchValue;
      }
  
      const encryptedData = encryptData({data, secretKey: "ticker2020@1234#"});
  
      const result = await getAllItems(encryptedData);
  
      return result;
    } catch (error) {
      console.error('Error in fetchData:', error);
      throw error; 
    }
  };

  const {data: allProducts, isLoading, refetch, isError} = useQuery({
    queryKey: ['All_Afro_Products'],
    queryFn: async () => {
      try{
      const myProducts = await fetchData()
      if (myProducts){
        setProducts(myProducts)
      }
      return myProducts
    }catch (error) {
      throw new Error('Failed to fetch products: ');
    }
    },
  })

  useEffect(() => {
      refetch();
      console.log('Refetch triggered');
    
  }, [searchValue, refetch]);
  if(isLoading){
    return <div className='flex justify-center items-center mt-20'>
      <TailSpin 
          color="#01974B"
          height={50}
          width={50} 
        />
    </div>
  } else return (
    <div className='font-lato'>
      <HomeNav setSearchValue={setSearchValue} />
      <DashboardBanner />
      <Toaster position="top-center" />
      <div className='grid gap-1 md:grid-cols-2 lg:grid-cols-4 w-[90%] mx-auto '>
        {products?.map((product, index)=>(
          <div key={index} className='cursor-pointer my-6 flex items-center justify-center'>
            <HomeProducts product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home