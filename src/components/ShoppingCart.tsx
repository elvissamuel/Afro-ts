import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAllOrders, removeFromCart, handleCheckout } from '@/api/api'
import { Toaster, toast } from 'sonner'
import { encryptData } from '../AES/AES'
import { useRouter } from 'next/navigation'
import { LoginResponseBodyProps, OrderProps } from '@/models/models'
import Image from 'next/image'

type Props = {}

const ShoppingCart = (props: Props) => {
  const [open, setOpen] = useState(true)
  const [loading, setLoading] = useState(false)
  const res = localStorage.getItem('Afro_Login_Response') ?? ''
  const loginResponse = JSON.parse(res)
  const dataAuth = loginResponse?.responseBody.authorization
  const cartReference = localStorage.getItem('Afro_Cart_Reference') ?? ''
  const cartRef = JSON.parse(cartReference)
  const router = useRouter()

  const handleDeleteItem = async (id: number): Promise<any> => {
    try {
        const data = {authorization: dataAuth, cart_reference: cartRef, product_id: id};
        console.log('sent data: ', data);
        const encryptedInfo = encryptData({data, secretKey: process.env.NEXT_PUBLIC_AFROMARKETS_SECRET_KEY});
        return removeFromCart({encryptedInfo, setLoading, toast});
    } catch (error) {
        console.error("Error removing item from cart:", error);
        throw error;
    }
};

  
  const dataIP = localStorage.getItem('ip_address') ?? ''
  const encryptedData = encryptData({data: {authorization: dataAuth, ip_address: JSON.parse(dataIP), cart_reference: cartRef}, secretKey:process.env.NEXT_PUBLIC_AFROMARKETS_SECRET_KEY})


  const {mutate:handleCartCheckout} = useMutation({
    mutationFn: ()=>handleCheckout({data:encryptedData, setLoading, toast}),
  })

  const {data, isLoading, refetch, isSuccess, isError} = useQuery({
    queryKey: ['All_Afro_Orders'],
    queryFn: async ()=>getAllOrders(encryptedData)
  })

  const {mutate: deleteCartItem} = useMutation({
    mutationFn: (id:number) => handleDeleteItem(id),
    // @ts-ignore
    onSuccess: refetch() 
      // try {
      //     const orders = await getAllOrders(encryptedData);
      //     console.log("Updated orders:", orders);
      // } catch (error) {
      //     console.error("Error fetching orders:", error);
      // }
  
  })
  
  const sum = data?.map((val: OrderProps) => val.price).reduce((acc: number, value: number) => {
    return acc + value
}, 0)
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-40" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
        <Toaster richColors position='top-right' />
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">Shopping cart</Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setOpen(false)}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        {isSuccess ? <div className="flow-root">
                          <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {data?.map((order: OrderProps) => (
                              <li key={order.productId} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <Image
                                    src={order.imageUrl} width={100} height={100}
                                    alt='product-image'
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <a href='#'>{order.productName}</a>
                                      </h3>
                                      <p className="ml-4">${order.price}</p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">{order.orderRef}</p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <p className="text-gray-500">Qty {order.quantity}</p>

                                    <div className="flex">
                                      <button
                                        onClick={()=>deleteCartItem(order.productId)}
                                        type="button"
                                        className="font-medium text-primaryColor hover:text-primaryColorVar"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div> :
                        <div className='text-black font-semibold'>This is no item in cart</div>}
                      </div>
                    </div>

                    {isSuccess && <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>${sum}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                      <div className="mt-6">
                        <a
                        onClick={()=>handleCartCheckout()}
                          href="#"
                          className="flex items-center justify-center rounded-md border border-transparent bg-primaryColor px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                          Checkout
                        </a>
                      </div>
                    </div>}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default ShoppingCart