"use client";

import React, { useEffect, useState } from "react";
import { DonationHistory, columns } from "./donationHistoryColumn"
import { DataTable } from "./data-table"


async function getData(page: number = 0, pageSize: number = 10): Promise<DonationHistory[]> {
  const staticData: DonationHistory[] = [
    { id: 1, cause: "Send Children to School", amount: 100000, dateTime: "2025-05-01 10:00:00", transactionId: "#873882", paymentMethod: "Card" },
    { id: 2, cause: "Provide Books for Students", amount: 50000, dateTime: "2025-05-02 11:00:00", transactionId: "#873883", paymentMethod: "Crypto" },
    { id: 3, cause: "Build a New School", amount: 250000, dateTime: "2025-05-03 12:00:00", transactionId: "#873884", paymentMethod: "Card" },
    { id: 4, cause: "Scholarships for Girls", amount: 150000, dateTime: "2025-05-04 10:00:00", transactionId: "#873885", paymentMethod: "Crypto" },
    { id: 5, cause: "Donate to the Homeless Shelter", amount: 200000, dateTime: "2025-05-05 11:00:00", transactionId: "#873886", paymentMethod: "Card" },
    { id: 6, cause: "Food for Orphanages", amount: 180000, dateTime: "2025-05-06 12:00:00", transactionId: "#873887", paymentMethod: "Crypto" },
    { id: 7, cause: "Support Local Farmers", amount: 50000, dateTime: "2025-05-07 10:00:00", transactionId: "#873888", paymentMethod: "Card" },
    { id: 8, cause: "Clean Water for Rural Areas", amount: 300000, dateTime: "2025-05-08 11:00:00", transactionId: "#873889", paymentMethod: "Crypto" },
    { id: 9, cause: "Empower Women in Tech", amount: 120000, dateTime: "2025-05-09 12:00:00", transactionId: "#873890", paymentMethod: "Card" },
    { id: 10, cause: "Medical Aid for Children", amount: 180000, dateTime: "2025-05-10 10:00:00", transactionId: "#873891", paymentMethod: "Crypto" }
  ];

  return staticData.slice(page * pageSize, (page + 1) * pageSize);
}

export default function DemoPage() {
  const [data, setData] = useState<DonationHistory[]>([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const fetchData = async () => {
    const fetchedData = await getData(pageIndex, pageSize);
    setData(fetchedData);
  };

  useEffect(() => {
    fetchData();
  }, [pageIndex, pageSize]);

  return (
    <div className="container mx-auto py-10">
     <DataTable
        columns={columns}
        data={data}
        setData={setData} // ✅ Add this line
        pagination={{ pageIndex, pageSize, setPageIndex, setPageSize }}
      />
    </div>
  );
}

