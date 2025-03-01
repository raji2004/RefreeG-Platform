// "use client"
import React from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { DonationHistoryData } from "@/lib/dummyData";
import { donationHistoryColumn } from "@/components/columns";
import { DataTable } from "@/components/ui/data-table";

export default function Donations() {
  return (
    <div className="flex flex-col h-screen w-full lg:bg-[#FAFCFF]">
      {/* Fixed topbar */}
      <Topbar profileImage="/UserProfile/defaultProfile.svg" />
      
      <div className="flex flex-1 w-11/12 lg:w-full overflow-hidden">
        {/* Fixed sidebar */}
        <Sidebar  />
        
        {/* Scrollable table container */}
        <div className="flex-1 overflow-auto">
          <div className="container  p-5 w-full">
            <DataTable
              columns={donationHistoryColumn}
              data={DonationHistoryData}
              filterColumn="cause"
              filterColumnPlaceholder="Search Cause"
            />
          </div>
        </div>
      </div>
    </div>
  );
}