"use client";
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DataTable } from "@/components/ui/data-table";
import { CauseColumns } from "@/components/columns";
import { CausesData } from "@/lib/dummyData";



export default function Causes() {
    const [selectedStatus, setSelectedStatus] = useState<string>("All");
    return (
        <div className="w-full mt-8 md:p-8">
            <Tabs value={selectedStatus} onValueChange={setSelectedStatus}>
                <TabsList>
                    {["All", "Pending", "Approved", "Completed"].map((status) => (
                        <TabsTrigger  key={status} value={status}  className="flex-1 sm:flex-none text-xs sm:text-sm lg:text-base px-2 sm:px-4 py-1 sm:py-2">
                            {status === "All" ? "All Causes" : status}
                        </TabsTrigger>
                    ))}
                </TabsList>
                <TabsContent value={selectedStatus}>
                    <DataTable
                        columns={CauseColumns}
                        data={
                            selectedStatus === "All"
                                ? CausesData
                                : CausesData.filter((cause) => cause.status === selectedStatus)
                        }
                        nofilter
                        addCause
                    />
                </TabsContent>
            </Tabs>
        </div>
    );
}