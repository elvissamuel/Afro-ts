import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { UseFormReset } from "react-hook-form";
// @ts-ignore
import { PromiseData, PromiseT } from "sonner";
import { ExternalToast } from "sonner";

type ToastFunction = ((message: string | React.ReactNode, data?: ExternalToast) => string | number) & {
  success: (message: string | React.ReactNode, data?: ExternalToast) => string | number;
  info: (message: string | React.ReactNode, data?: ExternalToast) => string | number;
  warning: (message: string | React.ReactNode, data?: ExternalToast) => string | number;
  error: (message: string | React.ReactNode, data?: ExternalToast) => string | number;
  custom: (jsx: (id: number | string) => React.ReactElement, data?: ExternalToast) => string | number;
  message: (message: string | React.ReactNode, data?: ExternalToast) => string | number;
  promise: <ToastData>(promise: PromiseT<ToastData>, data?: PromiseData<ToastData>) => string | number;
  dismiss: (id?: number | string) => string | number;
  loading: (message: string | React.ReactNode, data?: ExternalToast) => string | number;
};

export interface businessResponseProps {
    businessId: number;
    businessName: string;
    kybVerified: boolean;
  }

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface EmailVerificationFormValues {
  email: string | null;
  token: string;
}

export interface BusinessFormValues {
  business_name: string;
  full_name: string;
  email: string;
  address: string;
  phone_number: string;
  password: string;
  confirmPassword: string;
}

export interface ImageFormData {
  file: File
  upload_preset: string
}

export interface UserFormValues {
  full_name: string;
  email: string;
  home_address: string;
  phone_number: string;
  password: string;
  confirmPassword: string;
}

export interface VerifyEmailFormValues {
  email: string;
}

export interface ResetPasswordFormValues {
  password: string;
  confirmPassword: string
}

export interface ResgisterEmailFormValues {
  name: string;
  email: string;
  location: string;
  ip_address: string;
}

export interface LoginResponseProps {
  message: string;
  responseBody: LoginResponseBodyProps;
}

export interface LoginResponseBodyProps {
  address: string;
  authorizaiton: string;
  businessResponse?: businessResponseProps;
  cartResponse?: {};
  email: string;
  fullName: string;
  isBusiness: boolean;
  kycStatus: string;
  kycVerified: boolean;
  phoneNumber: string;
}

export interface CreateCartProps {
  authorization: string
  ip_address: string
  productId: string
  quantity: number
}

export interface FLoginProps {
  encryptedInfo: LoginFormValues | string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  reset:  UseFormReset<LoginFormValues>;
  router: AppRouterInstance;
  toast: ToastFunction;
  setLoginAuth?: React.Dispatch<React.SetStateAction<string>> | undefined;
  setIsBusiness?:React.Dispatch<React.SetStateAction<boolean>> | undefined;
  setKycVerified?: React.Dispatch<React.SetStateAction<boolean>> | undefined;
}

export interface FRegisterBusinessProps {
  encryptedInfo: BusinessFormValues | string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  reset:  UseFormReset<BusinessFormValues>;
  router: AppRouterInstance;
  toast: ToastFunction;
}

export interface FResetPasswordProps {
  data: ResetPasswordFormValues | string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  reset:  UseFormReset<ResetPasswordFormValues>;
  router: AppRouterInstance;
  toast: ToastFunction;
}
export interface FRegisterUserProps {
  encryptedInfo: LoginFormValues | string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  reset:  UseFormReset<UserFormValues>;
  router: AppRouterInstance;
  toast: ToastFunction;
}

export interface FEmailVerificationProps {
  encryptedInfo: EmailVerificationFormValues | string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  router: AppRouterInstance;
  toast: ToastFunction;
  pathName: string;
}

export interface FVerifyEmailProps {
  data: VerifyEmailFormValues | string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  router: AppRouterInstance;
  toast: ToastFunction;
}

export interface FCreateCartProps {
  encryptedInfo: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  toast: ToastFunction;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

export interface FRegisterEmailProps {
  obj: ResgisterEmailFormValues | string;
  toast: ToastFunction;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface FRemoveFromCartProps {
  encryptedInfo: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  toast: ToastFunction;
}

export interface FCreateProductProps {
  encryptedInfo: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  toast: ToastFunction;
}

export interface FGetImageProps {
  files: FormData
  setImgUrl: React.Dispatch<React.SetStateAction<string>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface FCheckoutProps {
  data: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  toast: ToastFunction;
}

export interface productProps {
  name: string;
  category: string;
  imageUrl: string;
  description: string;
  productId: string;
  productPrice: number;
  productQuantity: number;
  businessName?: string
}

export interface OrderProps {
  productId: number
  quantity: number
  price: number
  productName: string
  imageUrl: string
  orderRef: string
}

interface FBase {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}