import React from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import PaymentMethods from "./_components/PaymentMethods";

export default function Donations() {

  return (
    <div className="w-full lg:bg-[#FAFCFF]">
      <Topbar profileImage="/UserProfile/defaultProfile.svg" />
      <div className="flex w-full">
        <Sidebar />
        <div className="w-full lg:pr-8 ">
          <PaymentMethods />
        </div>
      </div>
    </div>
  );
}
