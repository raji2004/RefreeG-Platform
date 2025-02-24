// "use client"

import React from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import DonationHistory from "@/components/UserProfileComponents/donationHistory";

export default function Donations() {
  // const [profileImage, setProfileImage] = useState<string>("/UserProfile/defaultProfile.svg");

  return (
    <div className="w-full lg:bg-[#FAFCFF]">
      <Topbar profileImage="/UserProfile/defaultProfile.svg" />
      <div className="flex w-11/12 lg:w-full">
        <Sidebar />
        <DonationHistory />
      </div>
    </div>
  );
}
