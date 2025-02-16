"use client"

import React, { useState } from 'react'


import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import DonationHistory from '@/components/UserProfileComponents/donationHistory';

export default function Donations() {

  const [profileImage, setProfileImage] = useState("/UserProfile/defaultProfile.svg");
  return (
    <div className='w-full lg:bg-[#FAFCFF] lg:pr-16'>
      <Topbar profileImage={profileImage} />
      <div className="flex pt-28 w-full">
        <Sidebar />
        <DonationHistory />
      </div>
    </div>
  )
}
