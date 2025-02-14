"use client"

import React, { useState } from 'react'


import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import Causes from '@/components/UserProfileComponents/causes';

export default function MyCauses() {

    const [profileImage, setProfileImage] = useState("/UserProfile/defaultProfile.svg");
  return (
    <div className='w-11/12'>
      <Topbar profileImage={profileImage} />
      <div className="flex pt-28 w-full">
        <Sidebar />
        <Causes />
      </div>
    </div>
  )
}
