"use client"
import React, { useContext, useEffect, useState } from 'react'
import proimg from '../assets/imgs/producting.png'
import StarComponent from '@/components/StarComponent'
import Link from 'next/link'
import { LoginContext } from '@/contexts/LoginContext'
import { addToCart, createCart, getAllOrders } from '../api/api'
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { encryptData } from '../AES/AES'
import { Toaster, toast } from 'sonner'
import { LoginResponseProps, productProps } from '@/models/models'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

type Props = {
  product: productProps
}

const Product = (props: Props) => {
  const [loading, setLoading] = useState(false)
  const [cart, setCart] = useState({})
  const [loginResponse, setLoginResponse] = useState<LoginResponseProps>()
  const [cartRef, setCartRef] = useState()
  const [dataIP, setDataIP] = useState()
  const [accessToken, setAccessToken] = useState('')
  const router = useRouter()

  const isBusiness = loginResponse?.responseBody.isBusiness
  const dataAuth = loginResponse?.responseBody.authorizaiton

  const queryClient = useQueryClient()

  const contextValues = useContext(LoginContext)

  useEffect(() => {
    fetch("https://api64.ipify.org?format=json")
      .then((response) => response.json())
      .then((data) => {
        const myIPAddress = data.ip;
        setDataIP(myIPAddress);
      })
      .catch((error) => {
        console.error("Error fetching IP:", error);
      });
  }, []);

  useEffect(()=>{
    if(typeof window !== 'undefined' && window.localStorage){
    const res = localStorage.getItem('Afro_Login_Response') ?? ''
    const loginResponse = JSON.parse(res)
    setLoginResponse(loginResponse)
    const token = localStorage.getItem('My_Login_Auth') ?? ''
    setAccessToken(JSON.parse(token))
    const myCartRef = localStorage.getItem('Afro_Login_Cart_Reference') ?? '';
    const ref = myCartRef !== '' ? JSON.parse(myCartRef) : ''
    setCartRef(ref)
    
    }
  }, [])

  useEffect(()=>{
    if(typeof window !== 'undefined' && window.localStorage){
    const cartStorage = localStorage.getItem('Afro_Cart')
    if (cartStorage === 'undefined' || cartStorage === null){
      setCart({})
    }else{
      setCart(JSON.parse(cartStorage))
    } }
  }, [])

const handleAddProduct = async (): Promise<void> => {
  try {
      if (cart) {
          const isEmpty = Object.keys(cart).length === 0;
          if (isEmpty) {
              const data = {authorization: accessToken, ip_address: dataIP, product_id: props.product.productId, quantity: count};
              console.log('Sent data: ', data);
              const encryptedInfo = encryptData({data, secretKey: process.env.NEXT_PUBLIC_AFROMARKETS_SECRET_KEY});
              return createCart({encryptedInfo, setLoading, toast, setCount});
          } else {
              const data = {authorization: accessToken, ip_address: dataIP, cart_reference: cartRef, product_id: props.product.productId, quantity: count};
              console.log('Sent data: ', data);
              const encryptedInfo = encryptData({data, secretKey: process.env.NEXT_PUBLIC_AFROMARKETS_SECRET_KEY});
              return addToCart({encryptedInfo, setLoading, toast, setCount});
          }
      }
  } catch (error) {
      console.error("Error adding product to cart:", error);
      throw error;
  }
}
      
      const {mutate: addProduct} = useMutation({
        mutationFn: handleAddProduct,
        // @ts-ignore
        onSuccess: queryClient.invalidateQueries({queryKey: ['All_Afro_Orders']})
      
      })

      if(!contextValues){
        return null;
      }
      const {count, setCount} = contextValues

  return (
    <div key={props.product.productId} className='w-full md:w-[200px]'>
        <div onClick={()=>{if(!isBusiness) router.push(`product/${props.product.productId}`)}} className='h-[180px] w-full relative my-2'>
          <Image className='object-contain w-full h-full border rounded-lg p-3 shadow-md' src={props.product.imageUrl} width={100} height={100} alt="" />
        </div>
      <div className='px-1 flex flex-col gap-1'>
        <div className='flex items-center font-semibold justify-between'>
            <p className='text-sm'>{props.product.name}</p>
            <span className='text-xs'>£{props.product.productPrice}</span>
        </div>
        <p className='text-xs'>{props.product.category}</p>
      {!isBusiness && <StarComponent numberOfColored={5} />}
        {!isBusiness ? <button onClick={()=>addProduct()} className='px-3 shadow-md hover:text-primaryColor py-1 text-sm border w-[107px] hover:bg-secondaryColor rounded-xl'>Add to Cart</button> : 
        <div className='flex items-center'>
          <button className='px-3 shadow-md bg-primaryColor text-secondaryColor hover:text-primaryColor py-2 text-sm border w-[107px] hover:bg-secondaryColor'>Edit</button>
          <button className='px-3 shadow-md bg-red-600 text-white hover:text-primaryColor py-2 text-sm border w-[107px] hover:bg-secondaryColor'>Delete</button>
          </div>
        }
      </div>
    </div>
)
}

export default Product