"use client"

import React, { useState } from "react";
// import Sidebar from "@/components/Sidebar";
// import Topbar from "@/components/Topbar";
// import DonationHistory from "@/components/UserProfileComponents/donationHistory";

export default function Donations() {
  const [profileImage, setProfileImage] = useState<string>("/UserProfile/defaultProfile.svg");

  return (
    <div className="w-full lg:bg-[#FAFCFF]">
      {/* <Topbar profileImage={profileImage} />
      <div className="flex w-full">
        <Sidebar />
        <DonationHistory />
      </div> */}
    </div>
  );
}
