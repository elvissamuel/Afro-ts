"use client";

import { ReactNode, createContext, useState } from "react";
import React from "react";
import { productProps } from "@/models/models";



interface ContextValues {
  registerSuccess: boolean;
  setRegisterSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  userEmail: string;
  setUserEmail: React.Dispatch<React.SetStateAction<string>>;
  ipAddress: string;
  setIpAddress: React.Dispatch<React.SetStateAction<string>>;
  loginAuth: string;
  setLoginAuth: React.Dispatch<React.SetStateAction<string>>;
  isBusiness: boolean;
  setIsBusiness: React.Dispatch<React.SetStateAction<boolean>>;
  kycVerified: boolean;
  setKycVerified: React.Dispatch<React.SetStateAction<boolean>>;
  productCategory: string;
  setProductCategory: React.Dispatch<React.SetStateAction<string>>;
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  buttonClick: boolean;
  setButtonClick: React.Dispatch<React.SetStateAction<boolean>>;
  products: productProps[];
  setProducts: React.Dispatch<React.SetStateAction<productProps[]>>;
}

export const LoginContext = createContext<ContextValues | undefined>(undefined);

interface ContextProviderProps {
  children: ReactNode;
}

export const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  const [registerSuccess, setRegisterSuccess] = useState(false)
  const [userEmail, setUserEmail] = useState("")
  const [ipAddress, setIpAddress] = useState("")
  const [loginAuth, setLoginAuth] = useState("")
  const [isBusiness, setIsBusiness] = useState(false)
  const [kycVerified, setKycVerified] = useState(false)
  const [products, setProducts] = useState<productProps[]>([])
  const [productCategory, setProductCategory] = useState("")
  const [items, setItems] = useState([])
  const [count, setCount] = useState(1)
  const [buttonClick, setButtonClick] = useState(false)
  const [filteredProduct, setFilteredProduct] = useState(null)
 
  const contextValue: ContextValues = {registerSuccess, setRegisterSuccess, userEmail, setUserEmail, ipAddress, setIpAddress, loginAuth, setLoginAuth, isBusiness, setIsBusiness, kycVerified, setKycVerified, productCategory, setProductCategory, count, setCount, buttonClick, setButtonClick, products, setProducts};

  return (
    <LoginContext.Provider value={contextValue}>
      {children}
    </LoginContext.Provider>
  );
};
