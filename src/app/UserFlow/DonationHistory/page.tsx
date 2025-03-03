import React from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { DonationHistoryData } from "@/lib/dummyData";
import { donationHistoryColumn } from "@/components/columns";
import { DataTable } from "@/components/ui/data-table";
import RefreshButton from "@/components/refreshButton";

export default function Donations() {
  return (
    <div className="flex flex-col h-screen w-full lg:bg-[#FAFCFF]">
      {/* Fixed topbar */}
      <Topbar profileImage="/UserProfile/defaultProfile.svg" />
      
      <div className="flex flex-1 w-full lg:w-full overflow-hidden">
        {/* Fixed sidebar */}
        <Sidebar  />
        
        {/* Scrollable table container */}
        <div className="flex-1 overflow-auto">
          <div className="container py-5 px-2 w-full">
            <div className="flex justify-between w-full">
              <div className="flex gap-3 md:gap-5 lg:gap-8 text-base md:text-xl lg:text-3xl font-semibold py-4">
                <span className="text-gray-500">Activity Overview</span> <span className="text-gray-700">&gt;</span>  <span>Donation History</span>
              </div>
              <div className="py-4 lg:pr-4">
                <RefreshButton />
              </div>
            </div>
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