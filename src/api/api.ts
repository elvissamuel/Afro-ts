import axios, { AxiosResponse } from "axios";
import { decryptAES } from "../AES/AES";
import { NextRouter } from "next/router";
import { FCheckoutProps, FCreateCartProps, FCreateProductProps, FEmailVerificationProps, FGetImageProps, FLoginProps, FRegisterBusinessProps, FRegisterEmailProps, FRegisterUserProps, FRemoveFromCartProps, FResetPasswordProps, FVerifyEmailProps, LoginResponseProps, productProps } from "@/models/models";
import { CategoryProps } from "@/components/DashboardNav";


export const registerEmail = (params: FRegisterEmailProps) => {
  params.setLoading(true)
  axios
    .post(
      process.env.NEXT_PUBLIC_AFROMARKETS_URL + "/user/subscribe",
      params.obj,
    )
    .then((response) => {
      if (response.status === 200) {
      params.toast.success('Congratulations!', 
      {description: 'You have joined the queue, see you soon'})
        console.log("Response:", response.data);
      }
      params.setOpen(false)
    })
    .catch((error) => {
      params.toast.error('Failed! try again')
      console.error("Error:", error);
    }).finally(()=>{
      params.setLoading(false)
    })
};

// export const getIPAddress = (setIpAddress)=>{
//   fetch('https://api.ipify.org/?format=json')
//   .then(results => results.json())
//   .then(data => {
//      const myIp = data.ip
//      setIpAddress(myIp)
//      window.localStorage.setItem('ip_address', JSON.stringify(myIp))
//     });

// }

export const registerUser = (params: FRegisterUserProps) => {
  const headers = {
    'auth_param': process.env.NEXT_PUBLIC_AFROMARKETS_AUTH_PARAMS, 
    'Content-Type': 'text/plain'
  }
  
  params.setLoading(true)
  axios.post(process.env.NEXT_PUBLIC_AFROMARKETS_URL + "/user/onboarding", params.encryptedInfo, {headers}
    )
  .then((res) =>{
    if(res){
    const myData = decryptAES(res.data, process.env.NEXT_PUBLIC_AFROMARKETS_SECRET_KEY).then((myres) => {
      const response = JSON.parse(myres!)
      if(res.status === 200) {
      params.toast.success('Registration was successful, check your email for verification code')
        params.reset()
        setTimeout(() => {
          params.router.push('/verify')
        }, 3000);
      }

    }).catch((err) => {console.log('real err: ', err)})
    console.log('Decrpyted: ', myData)
    }
  })
  .catch((err) => {
    const myData = decryptAES(err.response.data, process.env.NEXT_PUBLIC_AFROMARKETS_SECRET_KEY).then((myres) => {
      const response = JSON.parse(myres!)
      console.log('err res: ', response)
      if(response.message.includes('Email exists')) {
      params.toast.error('Email exists, login in to your account')

      } else{
        console.log('user-form-err: ', err)
        params.toast.error('Registration was unsuccessful, try again!')
      }

    }).catch((err) => {console.log('real err: ', err)})
    
  }).finally(()=>{
    params.setLoading(false)
  })
}

export const handlePasswordReset = (params: FResetPasswordProps) => {
  const headers = {
    'auth_param': process.env.NEXT_PUBLIC_AFROMARKETS_AUTH_PARAMS, 
    'Content-Type': 'text/plain'
  }
  
  params.setLoading(true)
  axios.post(process.env.NEXT_PUBLIC_AFROMARKETS_URL + "/user/resetPassword", params.data, {headers}
    )
  .then((res) =>{
    if(res.data){
    const myData = decryptAES(res.data, process.env.NEXT_PUBLIC_AFROMARKETS_SECRET_KEY).then((myres) => {
      const response = JSON.parse(myres!)
      console.log('dres-auth:', response )
      
    }).catch((err) => {console.log('real err: ', err)})
    console.log('Decrpyted: ', myData)
      if(res.status === 200) {
        params.toast.success('You have successfully reset your password')
        params.reset()
        setTimeout(() => {
          params.router.push('/login')
        }, 2000);
      }
    }
  })
  .catch((err) => {
    console.log('user-form-err: ', err)
    params.toast.error('Password reset failed!')
  }).finally(()=>{
    params.setLoading(false)
  })
}

export const handleLogin = (params:FLoginProps) => {
  const headers = {
    'auth_param': process.env.NEXT_PUBLIC_AFROMARKETS_AUTH_PARAMS, 
    'Content-Type': 'text/plain'
  }
  
  params.setLoading(true)
  axios.post<string>(process.env.NEXT_PUBLIC_AFROMARKETS_URL + "/user/login", params.encryptedInfo, {headers}
    )
  .then((res: AxiosResponse<string>) =>{
    if(res.data){
    const myData = decryptAES(res.data, process.env.NEXT_PUBLIC_AFROMARKETS_SECRET_KEY).then((myres) => {
      const response = JSON.parse(myres!)
      const cart = response.responseBody.cartResponse
      console.log('dres-auth:', response )
      params.setLoginAuth?.(response.responseBody.authorization)
      params.setIsBusiness?.(response.responseBody.isBusiness)
      params.setKycVerified?.(response.responseBody.kycVerified)
      localStorage.setItem('Afro_Login_Response', JSON.stringify(response))
      localStorage.setItem('Afro_Cart', JSON.stringify(response.responseBody.cartResponse))
      localStorage.setItem('My_Login_Auth', JSON.stringify(response.responseBody.authorization))
      console.log('cart res: ', response.responseBody.cartResponse.orders)
      if (Object.keys(cart).length >= 1){
      localStorage.setItem('Afro_Cart_Orders', JSON.stringify(response.responseBody.cartResponse.orders))
    }
      
    }).catch((err) => {console.log('real err: ', err)})
    console.log('Decrpyted: ', myData)
      if(res.status === 200) {
        params.toast.success('Login was successful')
        params.reset()
        setTimeout(() => {
          params.router.push('/dashboard')
        }, 2000);
      }
    }
  })
  .catch((err) => {
    const myData = decryptAES(err.response.data, process.env.NEXT_PUBLIC_AFROMARKETS_SECRET_KEY).then((myres) => {
      console.log('user-form-err: ', JSON.parse(myres!))

    }).catch((err) => {console.log('real err: ', err)})

    console.log('user-form-err22: ', err)

      
    params.toast.error('Login failed!')
  }).finally(()=>{
    params.setLoading(false)
  })
}

export const handleEmailVerification = (params: FEmailVerificationProps) => {
  const headers = {
    'auth_param': process.env.NEXT_PUBLIC_AFROMARKETS_AUTH_PARAMS, 
    'Content-Type': 'text/plain'
  }
  params.setLoading(true)
  axios.post(process.env.NEXT_PUBLIC_AFROMARKETS_URL + "/user/verifyEmail", params.encryptedInfo, {headers}
    )
  .then((res) =>{
    if(res.data){
    const myData = decryptAES(res.data, process.env.NEXT_PUBLIC_AFROMARKETS_SECRET_KEY).then((myres) => {
      const response = JSON.parse(myres!)
      console.log('Derypted response veri: ', response.responseBody)
      window.localStorage.setItem('Afro_User_Email', response.responseBody.email)
      window.localStorage.setItem('Afro_User_Name', response.responseBody.fullName)
      window.localStorage.setItem('Afro_isBusiness', response.responseBody.isBusiness)
      if(res.status === 200) {
        params.toast.success('Email verified successfully')
        setTimeout(() => {
          if(params.pathName === '/verify-email'){
          params.router.push('/reset-password')
          } else {
            params.router.push('/login')
          }
        }, 2000);
      }
    }).catch((err) => {console.log('real err: ', err)})
    console.log('Decrpyted: ', myData)
    }
  })
  .catch((err) => {
    console.log('user-form-err: ', err)
    params.toast.error('Email verification failed')
  }).finally(()=>{
    params.setLoading(false)
  })
}

export const handleVerifyEmail = (params: FVerifyEmailProps) => {
  const headers = {
    'auth_param': process.env.NEXT_PUBLIC_AFROMARKETS_AUTH_PARAMS, 
    'Content-Type': 'text/plain'
  }
  params.setLoading(true)
  axios.post(process.env.NEXT_PUBLIC_AFROMARKETS_URL + "/user/requestVerification", params.data, {headers}
    )
  .then((res) =>{
    if(res.data){
    const myData = decryptAES(res.data, process.env.NEXT_PUBLIC_AFROMARKETS_SECRET_KEY).then((myres) => {
      const response = JSON.parse(myres!)
      console.log('Derypted response veri: ', response.responseBody)
      if(res.status === 200) {
        params.toast.success('Token has been sent to your email')
        setTimeout(() => {
          params.router.push('/verify-email')
        }, 2000);
      }
    }).catch((err) => {console.log('real err: ', err)})
    console.log('Decrpyted: ', myData)
    }
  })
  .catch((err) => {
    console.log('user-form-err: ', err)
    params.toast.error('Verification request failed!')
  }).finally(()=>{
    params.setLoading(false)
  })
}

export const registerBusiness = (params: FRegisterBusinessProps) => {
  const headers = {
    'auth_param': process.env.REACT_APP_AFROMARKETS_Auth_Params, 
    'Content-Type': 'text/plain'
  }
  params.setLoading(true)
  axios.post(process.env.NEXT_PUBLIC_AFROMARKETS_URL + "/merchant/onboarding", params.encryptedInfo, {headers}
    )
  .then((res) =>{
    if(res.data){
    const myData = decryptAES(res.data, process.env.NEXT_PUBLIC_AFROMARKETS_SECRET_KEY).then((myres) => {
      const response = JSON.parse(myres!)
      console.log('Full res: ', res)
      console.log('bus reg: ', response)
      if(res.status === 200) {
        params.toast.success('Registration was successful, check your email for verification code')
        params.reset()
        setTimeout(() => {
          params.router.push('/verify')
        }, 2000);
      }
    }).catch((err) => {console.log('real err: ', err)})
    console.log('Decrpyted: ', myData)
    }
  })
  .catch((err) => {
    console.log('user-form-err: ', err)
    const myData = decryptAES(err.response.data, process.env.NEXT_PUBLIC_AFROMARKETS_SECRET_KEY).then((myres) => {
      const response = JSON.parse(myres!)
      if(response.message.includes('Email exists')) {
      params.toast.error('Email exists, login in to your account')

      } else{
        console.log('user-form-err: ', err)
        params.toast.error('Registration was unsuccessful, try again!')
      }

    }).catch((err) => {console.log('real err: ', err)})
  }).finally(()=>{
    params.setLoading(false)
  })
}

export const getAllBuisnessProducts = async (data:string) => {
  try {
    const headers = {
      'auth_param': process.env.NEXT_PUBLIC_AFROMARKETS_AUTH_PARAMS,
      'Content-Type': 'text/plain'
    };

    const response = await axios.post(process.env.NEXT_PUBLIC_AFROMARKETS_URL + "/product/fetchProducts", data, { headers });

    if (response.data) {
      const myData = await decryptAES(response.data, process.env.NEXT_PUBLIC_AFROMARKETS_SECRET_KEY);
      console.log('This is all items from api: ', myData)
      const parsedData = JSON.parse(myData!);
      console.log('Decrypted Data:', parsedData.responseBody);
      const businessProducts: productProps = parsedData.responseBody
      window.localStorage.setItem('My_Afro_Products', JSON.stringify(parsedData.responseBody))
      window.localStorage.setItem('Afro_Products', JSON.stringify(parsedData.responseBody))
      return parsedData.responseBody; // Return the desired data
    }
  } catch (error) {
    console.log('Error:', error);
    throw new Error('Error fetching products');
  }
}

export const getAllItems = async (data:string) => {
  try {
    const headers = {
      'auth_param': process.env.NEXT_PUBLIC_AFROMARKETS_AUTH_PARAMS,
      'Content-Type': 'text/plain'
    };

    const response = await axios.post(process.env.NEXT_PUBLIC_AFROMARKETS_URL + "/product/fetchAllProducts", data, { headers });

    if (response.data) {
      const myData = await decryptAES(response.data, process.env.NEXT_PUBLIC_AFROMARKETS_SECRET_KEY);
      // console.log('This is all items from api: ', myData)
      const parsedData = JSON.parse(myData!);
      console.log('Decrypted Data:', parsedData.responseBody);
      const allProducts: productProps = parsedData.responseBody
      window.localStorage.setItem('My_Afro_Products', JSON.stringify(parsedData.responseBody))
      window.localStorage.setItem('Afro_Products', JSON.stringify(parsedData.responseBody))
      return parsedData.responseBody; // Return the desired data
    }
  } catch (error) {
    console.log('Error:', error);
    throw new Error('Error fetching products');
  }
};

// export const searchProduct = async (data) => {
//   try {
//     const headers = {
//       'auth_param': process.env.REACT_APP_AFROMARKETS_Auth_Params,
//       'Content-Type': 'text/plain'
//     };

//     const response = await axios.post("https://afromarketsquare-0170213566bc.herokuapp.com/product/fetchAllProducts", data, { headers });

//     if (response.data) {
//       const myData = await decryptAES(response.data, 'ticker2020@1234#');
//       const parsedData = JSON.parse(myData!);
//       console.log('This is filtered item from api: ', parsedData)
//       console.log('Decrypted Data:', parsedData.responseBody);
//       window.localStorage.setItem('My_Afro_Products', JSON.stringify(parsedData.responseBody))
//       window.localStorage.setItem('Afro_Products', JSON.stringify(parsedData.responseBody))
//       return parsedData.responseBody; // Return the desired data
//     }
//   } catch (error) {
//     console.log('Error:', error);
//     throw new Error('Error fetching products');
//   }
// };

export const createCart = (params: FCreateCartProps) => {
  const headers = {
    'auth_param': process.env.NEXT_PUBLIC_AFROMARKETS_AUTH_PARAMS, 
    'Content-Type': 'text/plain'
  }
  params.setLoading(true)
  axios.post(process.env.NEXT_PUBLIC_AFROMARKETS_URL + "/cart/createCart", params.encryptedInfo, {headers}
    )
  .then((res) =>{
    if(res.data){
    const myData = decryptAES(res.data, process.env.NEXT_PUBLIC_AFROMARKETS_SECRET_KEY).then((myres) => {
      const response = JSON.parse(myres!)
      console.log('bus reg: ', response)
      params.setCount(1)
      localStorage.setItem('Afro_Cart_Reference', JSON.stringify(response.responseBody.cartReference))
      localStorage.setItem('Afro_Item_No', JSON.stringify(response.responseBody.numberOfItems))
      localStorage.setItem('Afro_Cart_Orders', JSON.stringify(response.responseBody.orders))
      if(res.status === 200) {
        params.toast.success('Cart created and item added successfully', {
          duration: 1000,
        })
      }
    }).catch((err) => {console.log('real err: ', err)})
    console.log('Decrpyted cart res: ', myData)
    }
  })
  .catch((err) => {
    console.log('user-form-err: ', err)
    params.toast.error("Couldn't create or add product to cart")
  }).finally(()=>{
    params.setLoading(false)
  })
}

export const addToCart = (params: FCreateCartProps) => {
  const headers = {
    'auth_param': process.env.NEXT_PUBLIC_AFROMARKETS_AUTH_PARAMS, 
    'Content-Type': 'text/plain'
  }
  params.setLoading(true)
  axios.post(process.env.NEXT_PUBLIC_AFROMARKETS_URL + "/cart/addItemToCart", params.encryptedInfo, {headers}
    )
  .then((res) =>{
    if(res.data){
    const myData = decryptAES(res.data, process.env.NEXT_PUBLIC_AFROMARKETS_SECRET_KEY).then((myres) => {
      const response = JSON.parse(myres!)
      console.log('bus reg: ', response)
      params.setCount(1)
      localStorage.setItem('Afro_Item_No', JSON.stringify(response.responseBody.numberOfItems))
      localStorage.setItem('Afro_Cart_Reference', JSON.stringify(response.responseBody.cartReference))
      localStorage.setItem('Afro_Cart_Orders', JSON.stringify(response.responseBody.orders))
      if(res.status === 200) {
        params.toast.success('Product added to cart successfully', {
          duration: 1000,
        })
      }
    }).catch((err) => {console.log('real err: ', err)})
    console.log('Decrpyted cart res: ', myData)
    }
  })
  .catch((err) => {
    console.log('user-form-err: ', err)
    params.toast.error("Couldn't add product to cart")
  }).finally(()=>{
    params.setLoading(false)
  })
}

export const removeFromCart = (params: FRemoveFromCartProps) => {
  const headers = {
    'auth_param':process.env.NEXT_PUBLIC_AFROMARKETS_AUTH_PARAMS, 
    'Content-Type': 'text/plain'
  }
  params.setLoading(true)
  axios.post(process.env.NEXT_PUBLIC_AFROMARKETS_URL + "/cart/removeItemFromCart", params.encryptedInfo, {headers}
    )
  .then((res) =>{
    if(res.data){
    const myData = decryptAES(res.data, process.env.NEXT_PUBLIC_AFROMARKETS_SECRET_KEY).then((myres) => {
      const response = JSON.parse(myres!)
      console.log('bus reg: ', response)
      localStorage.setItem('Afro_Cart_Orders', JSON.stringify(response.responseBody.orders))
      localStorage.setItem('Afro_Item_No', JSON.stringify(response.responseBody.numberOfItems))
      if(res.status === 200) {
        params.toast.success('Product removed successfully', {
          duration: 1000
        })
      }
    }).catch((err) => {console.log('real err: ', err)})
    console.log('Decrpyted cart res: ', myData)
    }
  })
  .catch((err) => {
    console.log('user-form-err: ', err)
    params.toast.error("Couldn't remove product from cart")
  }).finally(()=>{
    params.setLoading(false)
  })
}

export const getAllOrders = async (data:string) => {
  try {
    const headers = {
      'auth_param': process.env.NEXT_PUBLIC_AFROMARKETS_AUTH_PARAMS,
      'Content-Type': 'text/plain'
    };

    const response = await axios.post(process.env.NEXT_PUBLIC_AFROMARKETS_URL + "/cart/fetchUserCart", data, { headers });

    if (response.data) {
      const myData = await decryptAES(response.data, process.env.NEXT_PUBLIC_AFROMARKETS_SECRET_KEY);
      const parsedData = JSON.parse(myData!);
      window.localStorage.setItem('My_Afro_Orders', JSON.stringify(parsedData.responseBody))
      return parsedData.responseBody.orders;
    }
  } catch (error) {
    console.log('Error:', error);
    throw new Error('Error fetching products');
  }
};

export const getImageUrl = (params: FGetImageProps)=>{
  params.setLoading(true)
  axios
  .post("https://api.cloudinary.com/v1_1/dws9ykgky/image/upload", params.files)
  .then((response)=> {
    console.log('img res: ', response)
    const postUrl = response.data.url
    params.setImgUrl(postUrl)
  }).catch((err) => {
    console.log('fetch-img-err: ', err)
  }).finally(()=>{
    params.setLoading(false)
  })
}

export const createNewProduct = (params: FCreateProductProps) => {
  const headers = {
    'auth_param': process.env.NEXT_PUBLIC_AFROMARKETS_AUTH_PARAMS, 
    'Content-Type': 'text/plain'
  }
  params.setLoading(true)
  axios.post(process.env.NEXT_PUBLIC_AFROMARKETS_URL + "/product/listProduct", params.encryptedInfo, {headers}
    )
  .then((res) =>{
    if(res.data){
    const myData = decryptAES(res.data, process.env.NEXT_PUBLIC_AFROMARKETS_SECRET_KEY).then((myres) => {
      const response = JSON.parse(myres!)
      console.log('new product details: ', response)
      if(res.status === 200) {
        params.toast.success('Product created successfully', {
          duration: 1000,
        })
      }
    }).catch((err) => {console.log('real err: ', err)})
    console.log('Decrpyted cart res: ', myData)
    }
  })
  .catch((err) => {
    console.log('user-form-err: ', err)
    params.toast.error("Couldn't add product to cart")
  }).finally(()=>{
    params.setLoading(false)
  })
}

export const getCategories = (setCategories: React.Dispatch<React.SetStateAction<CategoryProps[]>>) => {
  axios.get(process.env.NEXT_PUBLIC_AFROMARKETS_URL + "/app/categories")
            .then((res) => {
              console.log('cat log:', res)
              if(res.data){
                const myData = decryptAES(res.data, process.env.NEXT_PUBLIC_AFROMARKETS_SECRET_KEY).then((myres) => {
                  const response = JSON.parse(myres!)
                  console.log('categories: ', response)
                  setCategories(response)
                  return response
                  
                }).catch((err) => {console.log('real err: ', err)})
                console.log('Decrpyted cart res: ', myData)
                }
            })
            .catch(function (error) {
                console.error('Error:', error);
            });
}

export const handleCheckout = (params: FCheckoutProps) => {
  const headers = {
    'auth_param': process.env.REACT_APP_AFROMARKETS_Auth_Params, 
    'Content-Type': 'text/plain'
  };

  params.setLoading(true);

  return axios.post(process.env.NEXT_PUBLIC_AFROMARKETS_URL + "/order/checkout", params.data, { headers })
    .then((res) => {
      if (res.data) {
        return decryptAES(res.data, process.env.NEXT_PUBLIC_AFROMARKETS_SECRET_KEY)
          .then((myres) => {
            const response = JSON.parse(myres!);
            const checkoutUrl = response.responseBody.stripeResponse;
            console.log('checkout res: ', response);
      
            if (res.status === 200) {
              params.toast.success('Checkout successful', {
                duration: 1000
              });
              setTimeout(() => {
                // navigate(checkoutUrl)
                window.location.href = checkoutUrl;
              }, 1000);
            }
          })
          .catch((err) => {
            console.log('real err: ', err);
            throw err; // Re-throw error to be caught by the outer catch block
          });
      }
    })
    .catch((err) => {
      console.log('user-form-err: ', err);
      params.toast.error("Checkout unsuccessful");
      throw err; // Re-throw error to be caught by the caller
    })
    .finally(() => {
      params.setLoading(false);
    });
};



