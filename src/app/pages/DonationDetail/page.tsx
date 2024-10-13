"use client";

import React, { useState } from "react";
import DonationProgress from "../../../components/ui/donationProgress";
import {
  FaExclamationTriangle,
  FaHeartbeat,
  FaMapMarkerAlt,
  FaGlobe,
  FaShare,
  FaHeart,
  FaSmile,
  FaLeaf,
} from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

const DonationDetail: React.FC = () => {
  const goalAmount = 2000000; // Total goal amount
  const [donationAmount, setDonationAmount] = useState<number>(24000); // Initial donation amount

  const handleDonate = (amount: number): void => {
    setDonationAmount(donationAmount + amount); // Update donation amount on click
  };

  return (
    <div className="p-4 md:flex md:justify-between">
      {/* Left side - Main content */}
      <div className="md:w-2/3">
        <h1 className="text-2xl font-bold mb-2">Support Flood Victims</h1>
        <p className="text-red-600 font-medium flex items-center">
          <FaExclamationTriangle className="mr-2" />
          This cause is of high precedence
        </p>
        <Image
          className="w-full md:w-1/2 h-64 object-cover rounded-md mt-4 mx-auto"
          src={"/DonationDetail/flood.svg"}
          width={80}
          height={80}
          alt="Flood victims"
        />
        <div className="flex space-x-2 mt-3">
          <span className="text-sm bg-gray-200 rounded-full px-3 py-1 flex items-center">
            <FaHeartbeat className="mr-1" /> Healthcare
          </span>
          <span className="text-sm bg-gray-200 rounded-full px-3 py-1 flex items-center">
            <FaMapMarkerAlt className="mr-1" /> Abuja, Nigeria
          </span>
        </div>

        <p className="flex mt-4 font-semibold text-sm">
          <FaGlobe className="mr-1" /> United Nations International Children's
          Emergency Fund
        </p>

        <div className="mt-4 space-y-4">
          <p>
            <strong>Paragraph 1:</strong> The recent floods in Maiduguri have
            displaced thousands of families...
          </p>
          <p>
            <strong>Paragraph 2:</strong> More details on the flood and the
            victims...
          </p>
        </div>

        <div className="flex mt-4 space-x-4">
          <button className="flex items-center bg-gray-200 px-4 py-2 rounded-md shadow-sm">
            <FaShare className="mr-2" /> Share
          </button>
          <button className="bg-black text-white px-4 py-2 rounded-md shadow-sm">
            Donate
          </button>
        </div>
      </div>

      {/* Right side - Donation details */}
      <div className="mt-8 md:mt-0 md:w-1/3">
        <div className="bg-gray-100 p-4 rounded-md shadow-md">
          <h2 className="text-xl font-bold">
            ₦{donationAmount.toLocaleString()} raised
          </h2>
          <p>of ₦{goalAmount.toLocaleString()} goal</p>

          {/* Progress Bar */}
          <DonationProgress
            currentAmount={donationAmount}
            goalAmount={goalAmount}
          />

          <div className="mt-4 text-sm">
            <span className="block">2.4k Donations</span>
            <span className="block">10 days left</span>
          </div>
          <div className="mt-4 flex space-x-2">
            <button className="flex-grow bg-blue-500 text-white py-2 rounded-md">
              Share
            </button>
            <button
              className="flex-grow bg-black text-white py-2 rounded-md"
              onClick={() => handleDonate(50000)} // Example donation logic
            >
              Donate ₦50,000
            </button>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-semibold">300 people just donated</h3>
          <ul className="mt-2 space-y-2">
            <li className="flex justify-between">
              <span>Salim Ibrahim</span>
              <span className="text-xs">₦50,000</span>
            </li>
            <li className="flex justify-between">
              <span>Hephzibah</span>
              <span className="text-xs">₦10,000</span>
            </li>
            <li className="flex justify-between">
              <span>Julius</span>
              <span className="text-xs">₦50,000</span>
            </li>
            <li className="text-blue-500">See all</li>
          </ul>

          <div className="mt-4 flex justify-center space-x-2">
            <FaHeart className="text-red-500" />
            <FaSmile className="text-yellow-500" />
            <FaLeaf className="text-purple-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationDetail;
