import React from 'react'


import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import SignedPetitions from '@/components/UserProfileComponents/signedPetitions';

export default function Petitions() {
  
  return (
    <div className='w-full lg:bg-[#FAFCFF]'>
      <Topbar profileImage="/UserProfile/defaultProfile.svg" />
      <div className="flex w-11/12 lg:w-full">
        <Sidebar />
        <SignedPetitions />
      </div>
    </div>
  )
}