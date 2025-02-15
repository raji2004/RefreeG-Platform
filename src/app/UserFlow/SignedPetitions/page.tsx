"use client"

import React, { useState } from 'react'


import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import SignedPetitions from '@/components/UserProfileComponents/signedPetitions';

export default function Petitions() {

    const [profileImage, setProfileImage] = useState("/UserProfile/defaultProfile.svg");
  return (
    <div className='w-full bg-[#FAFCFF] pr-16'>
      <Topbar profileImage={profileImage} />
      <div className="flex pt-28 w-full">
        <Sidebar />
        <SignedPetitions />
      </div>
    </div>
  )
}