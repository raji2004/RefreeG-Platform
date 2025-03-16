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

export function getDaysLeft(deadline: string): string {
  const deadlineDate = new Date(deadline);
  const now = new Date();
  const diffTime = deadlineDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays <= 0) return "Past due";
  const words = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
  ];
  const dayWord = diffDays <= 10 ? words[diffDays] : diffDays.toString();
  return `${dayWord} day${diffDays > 1 ? "s" : ""} left`;
}


