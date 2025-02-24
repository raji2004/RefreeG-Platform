import Image from 'next/image';
import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import DemoPage from '@/app/UserFlow/SignedPetitions/tablePage';
import Link from "next/link";

export default function SignedPetitions() {
  return (
    <div className="md:px-7 py-4 w-11/12 md:w-2/3 lg:w-full lg:bg-[#FAFCFF]">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between">
          <div className="text-base md:text-xl font-semibold">
            <span className="text-gray-500 pr-2 md:pr-6">Activity Overview</span>
            <span className="text-black"> &gt; <span className='pl-3 md:pl-6'> Signed Petitions</span></span>
          </div>
          <div>
            <Link href={""}>
            <Image
              src="/UserProfile/refresh.svg"
              className="w-6 h-6 cursor-pointer"
              alt="refresh"
              width={20}
              height={20}
            />
          </Link>
          </div>
        </div>
        <DemoPage />
      </div>
    </div>

  )
}
