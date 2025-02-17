import React from "react";
import { BellIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

interface TopbarProps {
  profileImage?: string | null; // Allow profileImage to be null or undefined
}

const Topbar: React.FC<TopbarProps> = ({ profileImage }) => {
  return (
    <div className="bg-white shadow-md p-4 w-full">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left Section: Logo */}
        <div className="flex items-center">
          <Image
            src="/logo.svg" // Update this with your actual logo path
            alt="Logo"
            width={90}
            height={40}
            className="mr-4"
          />
        </div>

        {/* Center Section: Search Bar */}
        <div className="flex items-center w-full max-w-md bg-gray-100 px-4 py-2 rounded-lg">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search"
            className="ml-2 bg-transparent w-full border-none focus:outline-none"
          />
        </div>

        {/* Right Section: Notifications & Profile */}
        <div className="flex items-center">
          <BellIcon className="w-6 h-6 text-gray-500 mr-4 cursor-pointer" />
          {profileImage ? (
            <Image
              src={profileImage}
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full"
            />
          ) : (
            <div className="w-10 h-10 bg-gray-300 rounded-full" /> // Placeholder if no profile image
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
