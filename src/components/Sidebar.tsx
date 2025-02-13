import React from "react";
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
  return (
    <div className="w-64 bg-blue-900 text-white min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <nav>
        <ul>
          <li className="mb-4">
            <a
              href="#"
              className="flex items-center hover:bg-gray-700 p-2 rounded"
            >
              <HomeIcon className="w-5 h-5 mr-2" /> Dashboard
            </a>
          </li>
          <li className="mb-4">
            <a
              href="#"
              className="flex items-center hover:bg-gray-700 p-2 rounded"
            >
              <UserIcon className="w-5 h-5 mr-2" /> Profile
            </a>
          </li>
          <li className="mb-4">
            <a
              href="#"
              className="flex items-center hover:bg-gray-700 p-2 rounded"
            >
              <BanknotesIcon className="w-5 h-5 mr-2" /> Donation Management
            </a>
          </li>
          <li className="mb-4">
            <a
              href="#"
              className="flex items-center hover:bg-gray-700 p-2 rounded"
            >
              <BellIcon className="w-5 h-5 mr-2" /> Notifications
            </a>
          </li>
          <li className="mb-4">
            <a
              href="#"
              className="flex items-center hover:bg-gray-700 p-2 rounded"
            >
              <CogIcon className="w-5 h-5 mr-2" /> Privacy
            </a>
          </li>
          <li className="mb-4">
            <a
              href="#"
              className="flex items-center hover:bg-gray-700 p-2 rounded"
            >
              <ShieldCheckIcon className="w-5 h-5 mr-2" /> Security & Compliance
            </a>
          </li>
          <li className="mb-4">
            <a
              href="#"
              className="flex items-center hover:bg-gray-700 p-2 rounded"
            >
              <LifebuoyIcon className="w-5 h-5 mr-2" /> Support
            </a>
          </li>
          <li className="mb-4">
            <a
              href="#"
              className="flex items-center hover:bg-gray-700 p-2 rounded"
            >
              <PowerIcon className="w-5 h-5 mr-2" /> Sign Out
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
