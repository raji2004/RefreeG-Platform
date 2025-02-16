"use client"

import React from "react";
import { BellIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

interface TopbarProps {
  profileImage: string;
}

const Topbar: React.FC<TopbarProps> = ({ profileImage }) => {
  return (
    <div className="fixed border-b border-[#B6C3CD] h-20 md:h-24 lg:h-28 bg-white shadow-md p-4 w-full flex items-center z-10">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-6">
        {/* Left Section: Logo */}
        <div className="flex items-center">
          <Image
            src="/logo.svg" // Update this with your actual logo path
            alt="Logo"
            width={50}
            height={25}
            className="mr-2 md:mr-4 md:w-[70px] md:h-[35px]"
          />
        </div>

        {/* Center Section: Search Bar */}
        <div className="hidden sm:flex items-center border border-[#B5B3B3] w-full max-w-xs sm:max-w-sm md:max-w-md bg-[#FAFAFA] px-3 py-2 sm:px-4 sm:py-3 rounded-lg">
          <MagnifyingGlassIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search"
            className="ml-2 bg-transparent w-full border-none focus:outline-none text-xs sm:text-sm"
          />
        </div>

        {/* Right Section: Notifications & Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="p-2 sm:p-3 border border-[#B5B3B3] rounded-full">
            <BellIcon className="w-6 h-6 sm:w-8 sm:h-8 text-gray-500 cursor-pointer" />
          </div>
          {/* Profile Image */}
          <div className="relative">
            <Image
              src={profileImage} // Display the selected image or default
              alt="Profile"
              width={32}
              height={32}
              className="rounded-full cursor-pointer w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
