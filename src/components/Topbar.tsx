import React from "react";
import { BellIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const Topbar: React.FC = () => {
  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="flex items-center bg-gray-100 p-2 rounded-md">
        <MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />
        <input
          type="text"
          placeholder="Search"
          className="ml-2 bg-transparent border-none focus:outline-none"
        />
      </div>
      <div className="flex items-center">
        <BellIcon className="w-6 h-6 text-gray-500 mr-4" />
        <img
          src="https://via.placeholder.com/40"
          alt="Profile"
          className="rounded-full"
        />
      </div>
    </div>
  );
};

export default Topbar;
