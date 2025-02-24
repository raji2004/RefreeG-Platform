"use client";

import React, { useEffect, useState } from "react";
import { SignedPetitions, columns } from "./columns";
import { DataTable } from "./data-table";

// ✅ Unified getData function with pagination
async function getData(page: number = 0, pageSize: number = 10): Promise<SignedPetitions[]> {
  const staticData: SignedPetitions[] = [
    { id: 1, cause: "Send Children to School", dates: "2025-05-01", times: "10:00 AM" },
    { id: 2, cause: "Provide Books for Students", dates: "2025-05-02", times: "10:00 AM" },
    { id: 3, cause: "Build a New School", dates: "2025-05-03", times: "10:00 AM" },
    { id: 4, cause: "Scholarships for Girls", dates: "2025-05-04", times: "10:00 AM" },
    { id: 5, cause: "Donate to the Homeless Shelter", dates: "2025-05-05", times: "10:00 AM" },
    { id: 6, cause: "Food for Orphanages", dates: "2025-05-06", times: "10:00 AM" },
    { id: 7, cause: "Support Local Farmers", dates: "2025-05-07", times: "10:00 AM" },
    { id: 8, cause: "Clean Water for Rural Areas", dates: "2025-05-08", times: "10:00 AM" },
    { id: 9, cause: "Empower Women in Tech", dates: "2025-05-09", times: "10:00 AM" },
    { id: 10, cause: "Medical Aid for Children", dates: "2025-05-10", times: "10:00 AM" },
    { id: 11, cause: "New Classroom Desks", dates: "2025-05-11", times: "10:00 AM" },
    { id: 12, cause: "Solar Panels for Schools", dates: "2025-05-12", times: "10:00 AM" },
    { id: 13, cause: "University Scholarships", dates: "2025-05-13", times: "10:00 AM" },
    { id: 14, cause: "Rural Teacher Salaries", dates: "2025-05-14", times: "10:00 AM" },
    { id: 15, cause: "School Lunch Program", dates: "2025-05-15", times: "10:00 AM" },
    { id: 16, cause: "Library Renovation", dates: "2025-05-16", times: "10:00 AM" },
    { id: 17, cause: "STEM Programs for Girls", dates: "2025-05-17", times: "10:00 AM" },
    { id: 18, cause: "Tech Equipment for Schools", dates: "2025-05-18", times: "10:00 AM" },
    { id: 19, cause: "Support for Disabled Students", dates: "2025-05-19", times: "10:00 AM" },
    { id: 20, cause: "School Bus for Rural Kids", dates: "2025-05-20", times: "10:00 AM" },
    { id: 21, cause: "After-School Programs", dates: "2025-05-21", times: "10:00 AM" },
    { id: 22, cause: "Refurbish Old Schools", dates: "2025-05-22", times: "10:00 AM" },
    { id: 23, cause: "Educational Workshops", dates: "2025-05-23", times: "10:00 AM" },
    { id: 24, cause: "Literacy Program for Adults", dates: "2025-05-24", times: "10:00 AM" },
    { id: 25, cause: "Donate School Uniforms", dates: "2025-05-25", times: "10:00 AM" },
    { id: 26, cause: "Science Lab for Schools", dates: "2025-05-26", times: "10:00 AM" },
    { id: 27, cause: "Digital Learning Materials", dates: "2025-05-27", times: "10:00 AM" },
    { id: 28, cause: "Mobile Libraries", dates: "2025-05-28", times: "10:00 AM" },
    { id: 29, cause: "Coding Bootcamp for Kids", dates: "2025-05-29", times: "10:00 AM" },
    { id: 30, cause: "Eco-Friendly Schools", dates: "2025-05-30", times: "10:00 AM" },
    { id: 31, cause: "Tutoring for Orphans", dates: "2025-05-31", times: "10:00 AM" },
    { id: 32, cause: "Mental Health Support for Students", dates: "2025-06-01", times: "10:00 AM" },
  ];

  return staticData.slice(page * pageSize, (page + 1) * pageSize);
}

export default function DemoPage() {
  const [data, setData] = useState<SignedPetitions[]>([]);
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
