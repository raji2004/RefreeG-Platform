"use client"

import React, { useState } from 'react'


import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import Causes from '@/components/UserProfileComponents/causes';
import DonationHistory from '@/components/UserProfileComponents/donationHistory';

export default function Donations() {

  const [profileImage, setProfileImage] = useState("/UserProfile/defaultProfile.svg");
  return (
    <div className='w-full pr-16 bg-[#FAFCFF]'>
      <Topbar profileImage={profileImage} />
      <div className="flex pt-28 w-full">
        <Sidebar />
        <DonationHistory />
      </div>
    </div>
  )
}
