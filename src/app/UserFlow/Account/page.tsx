"use client"

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import PaymentMethods from "@/components/UserProfileComponents/paymentMethods";

export default function Donations() {
  const [profileImage, setProfileImage] = useState<string>("/UserProfile/defaultProfile.svg");

  return (
    <div className="w-full lg:bg-[#FAFCFF]">
      <Topbar profileImage={profileImage} />
      <div className="flex w-full">
        <Sidebar />
        <div className="w-full lg:pr-8 ">
          <PaymentMethods />
        </div>
      </div>
    </div>
  );
}
