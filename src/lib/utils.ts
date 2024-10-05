import { clsx, type ClassValue } from "clsx"
import { ReadonlyURLSearchParams } from "next/navigation"
import { twMerge } from "tailwind-merge"
import { User } from "./type"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const sessionAge = 60 * 60 * 24 * 180 ;

export const getOldParams = (searchParams:ReadonlyURLSearchParams,params:URLSearchParams)=>{
  const oldObj:any= {}
  const oldParams =  Array.from(searchParams.keys())
  oldParams.forEach((key:any) => {
      const value = params.get(key);
         if(value){
           params.set(key, value);
           oldObj[`${key}`]= value
         }
   })
   return oldObj

}

