
import CryptoJS from 'crypto-js';
import { LoginFormValues } from '@/models/models';

 interface EncryptProps<T extends object> {
  data: T;
  secretKey: string | undefined;
}

export const encryptData1 =<T extends object>(params:EncryptProps<T>) => {
    const jsonData = JSON.stringify(params.data); 
    const encrypted = CryptoJS.AES.encrypt(jsonData, params.secretKey ?? "").toString();
    return encrypted;
};

export const encryptData =<T extends object>(params:EncryptProps<T>) => {
    const jsonData = JSON.stringify(params.data);
    console.log("data: ",jsonData)
    const key = CryptoJS.enc.Latin1.parse(params.secretKey ?? "")
    const stringIV = CryptoJS.enc.Latin1.parse("e8f24a9d0c731b5f")

    const encrypted = CryptoJS.AES.encrypt(jsonData, key, {
      iv: stringIV,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    return encrypted.toString()
};


function hexToUint8Array(hexString:string) {
  // Check if the hexString is of even length
  if (hexString.length % 2 !== 0) {
    throw new Error('Hex string length must be even.');
  }

  const uint8Array = new Uint8Array(hexString.length / 2);

  for (let i = 0; i < hexString.length; i += 2) {
    const byteValue = parseInt(hexString.substr(i, 2), 16);
    uint8Array[i / 2] = byteValue;
  }

  return uint8Array;
}

// Function to decrypt using Web Crypto API
export async function decryptAES(encryptedHex:string, key:string | undefined) {
  try {
    const iv = process.env.NEXT_PUBLIC_AFROMARKETS_AUTH_PARAMS
    const keyBytes = new TextEncoder().encode(key);
    const ivBytes = new TextEncoder().encode(iv);
    const encryptedBytes = hexToUint8Array(encryptedHex);

    const importedKey = await window.crypto.subtle.importKey(
      'raw',
      keyBytes,
      { name: 'AES-CBC' },
      false,
      ['encrypt', 'decrypt']
    );

    const decrypted = await window.crypto.subtle.decrypt(
      {
        name: 'AES-CBC',
        iv: ivBytes,
      },
      importedKey,
      encryptedBytes
    );

    const decryptedText = new TextDecoder().decode(decrypted);
    return decryptedText;
  } catch (error) {
    console.error('Decryption error:', error);
    return null;
  }
}


