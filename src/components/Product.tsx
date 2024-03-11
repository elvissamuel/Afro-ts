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

type Props = {
  product: productProps
}

const Product = (props: Props) => {
  const [loading, setLoading] = useState(false)
  const [cart, setCart] = useState({})
  const [loginResponse, setLoginResponse] = useState<LoginResponseProps>()
  const [cartRef, setCartRef] = useState()
  const [dataIP, setDataIP] = useState()

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
    const res = localStorage.getItem('Afro_Login_Response') ?? ''
    const loginResponse = JSON.parse(res)
    setLoginResponse(loginResponse)
    const myCartRef = localStorage.getItem('Afro_Cart_Reference') ?? '';
    const cartRef = JSON.parse(myCartRef);
    setCartRef(cartRef)
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
              const data = {authorization: dataAuth, ip_address: dataIP, product_id: props.product.productId, quantity: count};
              console.log('Sent data: ', data);
              const encryptedInfo = encryptData({data, secretKey: process.env.NEXT_PUBLIC_AFROMARKETS_SECRET_KEY});
              return createCart({encryptedInfo, setLoading, toast, setCount});
          } else {
              
              const data = {authorization: dataAuth, ip_address: dataIP, cart_reference: cartRef, product_id: props.product.productId, quantity: count};
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
          // try {
          //     const orders = await getAllOrders(encryptedData);
          //     console.log("Updated orders:", orders);
          // } catch (error) {
          //     console.error("Error fetching orders:", error);
          // }
      
      })

      if(!contextValues){
        return null;
      }
      const {count, setCount} = contextValues

  return (
    <div key={props.product.productId} className='w-[200px]'>
      <Link href={`product/${props.product.productId}`}>
        <div className='h-[180px] w-full relative my-2'>
          <Image className='object-contain w-full h-full border rounded-lg p-3 shadow-md' src={props.product.imageUrl} width={100} height={100} alt="" />
          <span className='absolute top-2 right-1'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 text-red-500">
              <path d="M2 6.342a3.375 3.375 0 0 1 6-2.088 3.375 3.375 0 0 1 5.997 2.26c-.063 2.134-1.618 3.76-2.955 4.784a14.437 14.437 0 0 1-2.676 1.61c-.02.01-.038.017-.05.022l-.014.006-.004.002h-.002a.75.75 0 0 1-.592.001h-.002l-.004-.003-.015-.006a5.528 5.528 0 0 1-.232-.107 14.395 14.395 0 0 1-2.535-1.557C3.564 10.22 1.999 8.558 1.999 6.38L2 6.342Z" />
            </svg>
          </span>
        </div>
      </Link>
      <div className='px-1 flex flex-col gap-1'>
        <div className='flex items-center font-semibold justify-between'>
            <p className='text-sm'>{props.product.name}</p>
            <span className='text-xs'>£{props.product.productPrice}</span>
        </div>
        <p className='text-xs'>{props.product.category}</p>
        <StarComponent numberOfColored={5} />
        {!isBusiness ? <button onClick={()=>addProduct()} className='px-3 shadow-md hover:text-primaryColor py-1 text-sm border w-[107px] hover:bg-secondaryColor rounded-xl'>Add to Cart</button> : 
        <div className='flex items-center'>
          <button className='px-3 shadow-md bg-red-600 text-white hover:text-primaryColor py-2 text-sm border w-[107px] hover:bg-secondaryColor'>Edit</button>
          <button className='px-3 shadow-md bg-primaryColor text-secondaryColor hover:text-primaryColor py-2 text-sm border w-[107px] hover:bg-secondaryColor'>Delete</button>
          </div>
        }
      </div>
    </div>
)
}

export default Product