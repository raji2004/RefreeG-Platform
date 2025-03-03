import React from "react";
import { DonationHistoryData } from "@/lib/dummyData";
import { donationHistoryColumn } from "@/components/columns";
import { DataTable } from "@/components/ui/data-table";
import RefreshButton from "@/components/refreshButton";

export default function Donations() {
  return (
    <div className='w-full lg:bg-[#FAFCFF]'>
          <div className="flex w-full lg:w-full">
            <div className="container py-2 px-2">
              <div className="flex justify-between w-full">
                <div className="flex gap-1 md:gap-5 lg:gap-8 text-base md:text-xl lg:text-3xl font-semibold py-4">
                  <span className="text-gray-500">Activity Overview</span> <span className="text-gray-700">&gt;</span> <span>Donation History</span>
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
  );
}
