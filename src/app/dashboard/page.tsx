"use client"
import React, { useContext, useEffect, useState } from 'react'
import DashBoardNav from '@/components/DashboardNav'
import DashboardBanner from '@/components/DashboardBanner'
import { getAllBuisnessProducts, getAllItems } from '@/api/api'
import { LoginContext } from '@/contexts/LoginContext'
import { encryptData } from '@/AES/AES'
import {TailSpin} from 'react-loader-spinner';
import Product from '@/components/Product'
import { Toaster, toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'

type Props = {}
type QueryFunction = typeof getAllBuisnessProducts | typeof getAllItems;
type DataSentProp = {
  authorization: string
  ip_address: string
  search_word?: string
}

const Dashboard = (props: Props) => {
  const [loading, setLoading] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const res = localStorage.getItem('Afro_Login_Response') ?? ''
  const loginResponse = JSON.parse(res)
  const isBusiness = loginResponse?.responseBody.isBusiness
  const myAuth = localStorage.getItem('My_Login_Auth') ?? ''
  const dataAuth = myAuth && JSON.parse(myAuth)
  const dataIP = localStorage.getItem('ip_address') ?? ''
  const router = useRouter()

  const contextValues = useContext(LoginContext)


  const apiCall = isBusiness ? getAllBuisnessProducts : getAllItems

  const fetchData = async () => {
    try {
      let data: DataSentProp = { authorization: dataAuth, ip_address: JSON.parse(dataIP) };
      if (searchValue !== '') {
        data.search_word = searchValue;
      }
  
      const encryptedData = encryptData({data, secretKey: process.env.NEXT_PUBLIC_AFROMARKETS_SECRET_KEY});
  
      const result = await apiCall(encryptedData);
  
      return result;
    } catch (error) {
      console.error('Error in fetchData:', error);
      throw error; 
    }
  };

  const {data: allProducts, isLoading, refetch,} = useQuery({
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

  if(!contextValues){
    return null;
  }
  const {setProducts, products} = contextValues

  if(isLoading){
    return <div className='flex justify-center items-center mt-20'>
        <TailSpin 
          color="#01974B"
          height={50}
          width={50} 
        />
    </div>
  } else if(myAuth === ''){
    return(
      <div className='mx-auto mt-32 text-center'>
        <p>You have to login first to view this page</p>
        <button onClick={()=>router.push('/login')} className='border py-1 my-3 block w-32 mx-auto bg-primaryColor hover:bg-primaryColorVar text-white'>Login</button>
      </div>
    )
  }else return (
    <div className='font-lato'>
      <Toaster richColors position='top-right' closeButton />
      <DashBoardNav setSearchValue={setSearchValue} />
      {/* <ProductDetails /> */}
      <DashboardBanner />
      
      <div className='grid gap-1 grid-cols-2 lg:grid-cols-4 w-[90%] mx-auto '>
        {products?.map((product, index)=>(
          <div key={index} className='cursor-pointer my-6 flex items-center justify-center'>
            <Product product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard