// "use client";

import React from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import GeneralInfo from "./_components/GeneralInfo";

export default function UserProfile() {
  return (
    <div>
      <Topbar profileImage="/UserProfile/defaultProfile.svg" />
      <div className="flex w-full">
        <Sidebar />
        <GeneralInfo profileImage="/UserProfile/defaultProfile.svg" />
      </div>
    </div>
  );
}
