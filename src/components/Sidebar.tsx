"use client";

import React from "react";
import { useRouter } from "next/navigation"; // Correct import for Next.js App Router
import {
  HomeIcon,
  UserIcon,
  BellIcon,
  ShieldCheckIcon,
  LifebuoyIcon,
  BanknotesIcon,
  CogIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";

const Sidebar: React.FC = () => {
  const router = useRouter(); // Router instance for navigation

  return (
    <div className="w-64 bg-blue-900 text-white min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <nav>
        <ul>
          <li className="mb-4">
            <button
              onClick={() => router.push("/admin/dashboard")}
              className="flex items-center hover:bg-gray-700 p-2 rounded w-full text-left"
            >
              <HomeIcon className="w-5 h-5 mr-2" /> Dashboard
            </button>
          </li>

          <li className="mb-4">
            <button
              onClick={() => router.push("/")}
              className="flex items-center hover:bg-gray-700 p-2 rounded w-full text-left"
            >
              <UserIcon className="w-5 h-5 mr-2" /> Profile
            </button>
          </li>

          <li className="mb-4">
            <button
              onClick={() => router.push("")}
              className="flex items-center hover:bg-gray-700 p-2 rounded w-full text-left"
            >
              <BanknotesIcon className="w-5 h-5 mr-2" /> Donation Management
            </button>
          </li>

          <li className="mb-4">
            <button
              onClick={() => router.push("/admin/dashboard/notifications")}
              className="flex items-center hover:bg-gray-700 p-2 rounded w-full text-left"
            >
              <BellIcon className="w-5 h-5 mr-2" /> Notifications
            </button>
          </li>

          <li className="mb-4">
            <button
              onClick={() => router.push("")}
              className="flex items-center hover:bg-gray-700 p-2 rounded w-full text-left"
            >
              <CogIcon className="w-5 h-5 mr-2" /> Privacy
            </button>
          </li>

          <li className="mb-4">
            <button
              onClick={() => router.push("")}
              className="flex items-center hover:bg-gray-700 p-2 rounded w-full text-left"
            >
              <ShieldCheckIcon className="w-5 h-5 mr-2" /> Security & Compliance
            </button>
          </li>

          <li className="mb-4">
            <button
              onClick={() => router.push("/admin/dashboard/support")}
              className="flex items-center hover:bg-gray-700 p-2 rounded w-full text-left"
            >
              <LifebuoyIcon className="w-5 h-5 mr-2" /> Support
            </button>
          </li>

          <li className="mb-4">
            <button
              onClick={() => router.push("")}
              className="flex items-center hover:bg-gray-700 p-2 rounded w-full text-left"
            >
              <PowerIcon className="w-5 h-5 mr-2" /> Sign Out
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
