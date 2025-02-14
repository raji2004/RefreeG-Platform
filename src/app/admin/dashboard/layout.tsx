"use client";

import React from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen flex flex-col">
      {/* Topbar spanning the full width */}
      <Topbar />

      {/* Sidebar and main content container */}
      <div className="flex flex-1 min-h-screen">
        {/* Sidebar */}
        <Sidebar />

        {/* Page Content */}
        <main className="flex-1 p-4 bg-gray-100 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
