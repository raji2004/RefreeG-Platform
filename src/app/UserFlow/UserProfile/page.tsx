"use client"

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import GeneralInfo from "@/components/UserProfileComponents/generalInfo";

export default function UserProfile() {
  const [profileImage, setProfileImage] = useState("/UserProfile/defaultProfile.svg");

  return (
    <div>
      <Topbar profileImage={profileImage} />
      <div className="flex w-full">
        <Sidebar />
        <GeneralInfo profileImage={profileImage} setProfileImage={setProfileImage} />
      </div>
    </div>
  );
}
