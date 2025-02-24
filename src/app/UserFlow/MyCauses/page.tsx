import React from 'react'
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import Causes from '@/components/UserProfileComponents/causes';

export default function MyCauses() {

  return (
    <div className='w-full bg-[#FAFCFF]'>
      <Topbar profileImage="/UserProfile/defaultProfile.svg" />
      <div className="flex w-full">
        <Sidebar />
        <Causes />
      </div>
    </div>
  )
}
