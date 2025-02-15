"use client"

import React from "react";
import { BellIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

interface TopbarProps {
  profileImage: string;
}

const Topbar: React.FC<TopbarProps> = ({ profileImage }) => {
  return (
    <div className="fixed border-b border-[#B6C3CD] h-28 bg-white shadow-md p-4 w-full flex items-center z-10">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left Section: Logo */}
        <div className="flex items-center">
          <Image
            src="/logo.svg" // Update this with your actual logo path
            alt="Logo"
            width={70}
            height={35}
            className="mr-4"
          />
        </div>

        {/* Center Section: Search Bar */}
        <div className="flex items-center border border-[#B5B3B3] w-full max-w-md bg-[#FAFAFA] px-4 py-4 rounded-lg">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search"
            className="ml-2 bg-transparent w-full border-none focus:outline-none"
          />
        </div>

        {/* Right Section: Notifications & Profile */}
        <div className="flex items-center gap-3">
          <div className="p-4 border border-[#B5B3B3] rounded-full">
            <BellIcon className="w-8 h-8 text-gray-500 cursor-pointer" />
          </div>
          {/* Profile Image */}
          <div className="relative">
            <Image
              src={profileImage} // Display the selected image or default
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full cursor-pointer w-16 h-16"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
