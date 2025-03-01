"use client";
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DataTable } from "@/components/ui/data-table";
import { CauseColumns } from "@/components/columns";
import { CausesData } from "@/lib/dummyData";



export default function Causes() {
    const [selectedStatus, setSelectedStatus] = useState<string>("All");
    return (
        <div className="w-full  p-8">
            <Tabs value={selectedStatus} onValueChange={setSelectedStatus}>
                <TabsList>
                    {["All", "Pending", "Approved", "Completed"].map((status) => (
                        <TabsTrigger key={status} value={status}>
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