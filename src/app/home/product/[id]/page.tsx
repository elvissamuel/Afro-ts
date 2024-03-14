"use client"
import React, { useContext, useEffect, useState } from 'react'
import StarComponent from '@/components/StarComponent'
import ButtonComponent from '@/components/ButtonComponent'
import Counter from '@/components/Counter'
import { LoginContext } from '@/contexts/LoginContext'
import { addToCart, createCart, getAllItems, getAllOrders, getCategories } from '@/api/api'
import { Toaster, toast } from 'sonner'
import { encryptData } from '@/AES/AES'
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import HomeNav from '@/components/HomeNav'
import { LoginResponseProps, productProps } from '@/models/models'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { DataSentProp } from '../../page'
import { TailSpin } from 'react-loader-spinner'
import BreadCrumbs from '@/components/BreadCrumbs'

// type Props = {
//   product: productProps
// }

const ProductDetails = () => {
  const {id} = useParams();
  const contextValues = useContext(LoginContext)

    const [loading, setLoading] = useState(false)
    const [homeProduct, setHomeProduct] = useState<productProps[]>()
    const [searchValue, setSearchValue] = useState('')
    const [loginResponse, setLoginResponse] = useState<LoginResponseProps>()
    const [dataIP, setDataIP] = useState('')

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
      if (typeof window !== 'undefined' && window.localStorage){
        const res = localStorage.getItem('Afro_Login_Response') ?? ''
        const loginResponse = JSON.parse(res)
        setLoginResponse(loginResponse)
      }
    }, [])

    const fetchData = async () => {
      try {
        let data:DataSentProp = { ip_address: dataIP };
        if (searchValue !== '') {
          data.search_word = searchValue;
        }
    
        const encryptedData = encryptData({data, secretKey: process.env.NEXT_PUBLIC_AFROMARKETS_SECRET_KEY});
    
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
          const filteredProduct = myProducts.filter((prod: productProps)=> prod.productId === id)
          setHomeProduct(filteredProduct)
        }
        return myProducts
      }catch (error) {
        throw new Error('Failed to fetch products: ');
      }
      },
    })
  

    const allprod = allProducts && allProducts.filter((prod: productProps)=> prod.productId === id)


    if(!contextValues){
      return null;
    }
    const {count, setCount, setButtonClick, setProducts, products} = contextValues

    return (
    <>
    
     <HomeNav />
        <Toaster richColors position='top-center' />
        <div className='w-full fixed'><BreadCrumbs title="Product" /> </div>
        {allprod ? 
        <div key={allprod[0].productId} className='w-full xl:w-[85%] mx-auto mt-16 my-6'>
        <div className='flex flex-col lg:flex-row lg:justify-around gap-8 lg:items-center px-8'>
            <div className='w-full  xl:w-1/2'>
                <div className='md:w-[90%] md:h-[90%] mx-auto xl:w-[450px] xl:h-[450px] shadow-md p-24'>
                    <Image className='w-full h-full' src={allprod[0].imageUrl} alt="" width={100} height={100} />
                </div>
                
            </div>
            <div className='py-10 w-full xl:w-1/2'>
                <div className='bg-secondaryColor text-primaryColor rounded-xl w-[127px] h-[35px] flex justify-center items-center font-semibold mb-3'>Afro Markets</div>
                <p className='text-primaryColor text-xl font-bold'>{allprod[0].name}</p>
                <p className='font-extrabold'>${allprod[0].productPrice}</p>
                <div className='flex items-center gap-1'>
                    <StarComponent numberOfColored={2} numberOfUncolored={3} />
                    <span className='text-xs text-primaryColor font-semibold'>(100 rating)</span>
                </div>
                <div className='shadow-md rounded-xl p-3 my-4 '>
                    <h2 className='font-semibold text-primaryColor'>{allprod[0].category}</h2>
                    <span className='text-sm'>{allprod[0].description}</span>
                </div>
                <div className='flex items-center my-2 justify-between gap-2 w-[415px] pr-6'>

                     <button onClick={()=>{toast.warning("Can't Add to Cart", {description: 'You have to sign in before adding to cart'}); setButtonClick(prev => !prev)}} className='w-[251px] bg-secondaryColor font-semibold text-primaryColor rounded-lg h-[40px]'>Add to Cart</button>
                     
                    <Counter />
                </div>
                <ButtonComponent handleClick={()=> console.log('button was clicked')} title='Add to wishlist' />
            </div>
        </div>

        {/* <div className='w-[95%] mx-auto shadow-lg rounded-xl p-8 '>
            <h2 className='text-primaryColor font-bold mb-3'>Description</h2>
            <p className='text-sm '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis voluptates doloribus voluptatem unde iusto qui. Ea quos repudiandae consectetur asperiores dolorem temporibus tenetur obcaecati esse? <br /> Rem quos eius magni ut corrupti atque, modi sint rerum animi dolorum dolor inventore accusamus molestiae, sequi illo? Tempora quibusdam quaerat modi porro aut necessitatibus?</p>
        </div> */}

        <div className='my-16 w-[95%] mx-auto'>
            <h2 className='text-primaryColor text-lg font-semibold mb-6'>Customer Review</h2>

            <div className='grid gap-4 lg:grid-cols-2 '>
                <div className='col-span-1 flex flex-col gap-6'>
                    <div className='flex flex-col items-center justify-center'>
                        <p className='text-4xl font-bold'>0</p>
                        <StarComponent numberOfUncolored={5} />
                        <p className='text-sm text-primaryColor'>No reviews yet</p>
                    </div>
                    <div className='pl-4 text-sm font-semibold text-gray-600'>
                        <div className='flex gap-1 items-center'>
                            <StarComponent numberOfColored={5} />
                            <div className='h-[6px] w-[240px] bg-gray-400 rounded-lg' />
                            <span>0</span>
                        </div>
                        <div className='flex gap-1 items-center'>
                            <StarComponent numberOfColored={4} numberOfUncolored={1} />
                            <div className='h-[6px] w-[240px] bg-gray-400 rounded-lg' />
                            <span>0</span>
                        </div>
                        <div className='flex gap-1 items-center'>
                            <StarComponent numberOfColored={3} numberOfUncolored={2} />
                            <div className='h-[6px] w-[240px] bg-gray-400 rounded-lg' />
                            <span>0</span>
                        </div>
                        <div className='flex gap-1 items-center'>
                            <StarComponent numberOfColored={2} numberOfUncolored={3} />
                            <div className='h-[6px] w-[240px] bg-gray-400 rounded-lg' />
                            <span>0</span>
                        </div>
                        <div className='flex gap-1 items-center'>
                            <StarComponent numberOfColored={1} numberOfUncolored={4} />
                            <div className='h-[6px] w-[240px] bg-gray-400 rounded-lg' />
                            <span>0</span>
                        </div>
                    </div>
                </div>
                <div className='col-span-1 flex flex-col gap-2 text-primaryColor'>
                        <h2 className='uppercase text-primaryColor font-bold'>Add a review</h2>
                        <p className='text-sm'>Your email address will not be published, required fields are marked <span className='text-red-600 font-bold'>*</span></p>
                        <div className='flex items-center gap-1'>
                            <p className='text-sm'>Your Rating<span className='text-red-600 font-bold'>*</span>: </p>
                            <StarComponent numberOfUncolored={5} />
                        </div>
                        <form className='flex flex-col gap-4' action="">
                            <div className='flex flex-col text-primaryColor'>
                                <label htmlFor="review" className='text-sm font-semibold'>Your Review <span className='text-red-600 font-bold'>*</span></label>
                                <textarea name="" id="review" cols={30} rows={10} className='h-[178px] outline-none boder border-[1px] rounded-lg border-primaryColor shadow-md p-3' />
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="name" className='text-sm font-semibold text-primaryColor'>Name<span className='text-red-600 font-bold'>*</span></label>
                                <input type="text" id='name' className='border-primaryColor outline-none border-[1px] rounded-lg px-3 py-1.5' />
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="email" className='text-sm font-semibold text-primaryColor'>Email<span className='text-red-600 font-bold'>*</span></label>
                                <input type="text" id='email' className='border-primaryColor outline-none border-[1px] rounded-lg px-3 py-1.5' />
                            </div>
                            <div className='flex items-center gap-2'>
                                <input type="checkbox" className='border-[1px] outline-none border-primaryColor' name="" id="" />
                                <p className='text-sm font-semibold text-primaryColor'>Save my name, email and website in this browser for next time</p>
                            </div>
                            <button className='bg-primaryColor text-white text-sm font-semibold py-2 px-4 rounded-md' type="submit">Submit</button>
                        </form>
                </div>
                {/* <div>
                    <p className='text-primaryColor font-semibold'>0 Reviews</p>
                    <div className='border border-primaryColor border-opacity-40 shadow-lg rounded-lg p-4 my-8'>
                        <div className='flex justify-between items-center text-sm font-semibold'>
                            <p>[Reviewer name]</p>
                            <p>[Date]</p>
                        </div>
                        <p className='text-sm font-semibold'>[Star rating]</p>

                        <span className='my-4 text-sm block'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos quas similique saepe, illo eaque asperiores repellendus possimus minima autem accusantium quibusdam repellat velit natus! Tenetur assumenda recusandae facilis eos sunt!</span>
                    </div>
                </div> */}
            </div>
        </div>
        </div> 
        : 
        <div className='flex justify-center items-center mt-20'>
          <TailSpin 
              color="#01974B"
              height={50}
              width={50} 
            />
        </div>
        }
    </>
  ) 

  }


export default ProductDetails