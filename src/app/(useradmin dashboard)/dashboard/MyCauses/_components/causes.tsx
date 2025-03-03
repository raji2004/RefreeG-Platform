"use client";
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DataTable } from "@/components/ui/data-table";
import { CauseColumns } from "@/components/columns";
import { CausesData } from "@/lib/dummyData";
import RefreshButton from "@/components/refreshButton";

export default function Causes() {
    const [selectedStatus, setSelectedStatus] = useState<string>("All");

    return (
        <div className="w-full py-4 px-1 md:px-2 lg:px-4">
            <div className="flex justify-between w-full">
                <div className="flex gap-3 md:gap-5 lg:gap-8 text-base md:text-xl lg:text-3xl font-semibold py-4">
                    <span className="text-gray-500">Activity Overview</span> 
                    <span className="text-gray-700">&gt;</span>  
                    <span>My Causes</span>
                </div>
                <div className="py-4 lg:pr-4">
                    <RefreshButton />
                </div>
            </div>

            <Tabs value={selectedStatus} onValueChange={setSelectedStatus}>
                <TabsList className="bg-[#fbfcff]">
                    {["All", "Pending", "Approved", "Completed"].map((status) => (
                        <TabsTrigger
                            key={status}
                            value={status}
                            className="text-xs md:text-sm lg:text-base border-b-4 rounded-none border-transparent text-black data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 data-[state=active]:bg-transparent"
                        >
                            {status === "All" ? "All Causes" : status}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {/* Add a separate TabsContent for each tab */}
                {["All", "Pending", "Approved", "Completed"].map((status) => (
                    <TabsContent key={status} value={status}>
                        <DataTable
                            columns={CauseColumns}
                            data={
                                status === "All"
                                    ? CausesData
                                    : CausesData.filter((cause) => cause.status === status)
                            }
                            nofilter
                            addCause
                        />
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
}
