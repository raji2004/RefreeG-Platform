"use client"; // Ensures that this component is rendered on the client-side

import React, { useState } from "react";
import DonationProgress from "../../components/ui/donationProgress"; // Import a custom donation progress bar
import {
  FaExclamationTriangle,
  FaHeartbeat,
  FaMapMarkerAlt,
  FaGlobe,
  FaShare,
  FaHeart,
  FaSmile,
  FaLeaf,
} from "react-icons/fa"; // Import icons from FontAwesome
import Link from "next/link"; // Import Link for client-side navigation
import Image from "next/image"; // Import Next.js image optimization component
import Slider from "react-slick"; // Import Slider component for the image carousel
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"; // Import Lucide React icons
import { MouseEventHandler } from "react"; // Import type for event handling
import DonationNav from "@/components/donationNavbar";
import { Navbar } from "@/components/ui/navbar";

// Main component definition
const DonationDetail: React.FC = () => {
  // Array of images used in the slider
  const images = [
    "/DonationDetail/flood1.svg",
    "/DonationDetail/flood2.svg",
    "/DonationDetail/flood3.svg",
    "/DonationDetail/flood4.svg",
    "/DonationDetail/flood5.svg",
    "/DonationDetail/flood6.svg",
    "/DonationDetail/flood7.svg",
    "/DonationDetail/flood8.svg",
    "/DonationDetail/flood9.svg",
    "/DonationDetail/flood10.svg",
    "/DonationDetail/flood11.svg",
    "/DonationDetail/flood12.svg",
    "/DonationDetail/flood13.svg",
    "/DonationDetail/flood14.svg",
    // Other images...
  ];

  // Custom next arrow component for the image slider
  const NextArrow: React.FC<{ onClick?: MouseEventHandler }> = ({
    onClick,
  }) => (
    <button
      className="absolute right-2 z-10 top-1/2 transform -translate-y-1/2 text-white bg-blue-600 rounded-full p-[6px] hover:bg-blue-800 transition-colors duration-300"
      onClick={onClick}
    >
      <ChevronRight size={16} className="h-4 w-4" />
    </button>
  );

  // Custom previous arrow component for the image slider
  const PrevArrow: React.FC<{ onClick?: MouseEventHandler }> = ({
    onClick,
  }) => (
    <button
      className="absolute left-2 z-10 top-1/2 transform -translate-y-1/2 text-white bg-blue-600 rounded-full p-[6px] hover:bg-blue-800 transition-colors duration-300"
      onClick={onClick}
    >
      <ChevronLeft size={16} className="h-4 w-4" />
    </button>
  );

  // Settings for the image slider (e.g., autoplay, transition speed)
  const settings = {
    dots: true,
    dotsClass: "slick-dots custom-dots", // Custom dot styles
    infinite: true,
    speed: 500, // Transition speed
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // Auto slide every 3 seconds
    nextArrow: <NextArrow />, // Next arrow component
    prevArrow: <PrevArrow />, // Previous arrow component
  };

  // Define total goal amount and initialize donation state
  const goalAmount = 2000000; // Set the donation goal amount (in Naira)
  const [donationAmount, setDonationAmount] = useState<number>(24000); // Initial donation amount

  // Function to handle donations, updating the donation amount
  const handleDonate = (amount: number): void => {
    setDonationAmount(donationAmount + amount); // Increase donation amount by input value
  };

  // Calculate donation progress percentage based on current donation amount
  const progressPercentage = (donationAmount / goalAmount) * 100;

  return (
    <div>
      <Navbar />
      <div className="p-4 md:flex md:justify-between">
        {/* Left side - Main content */}
        <div className="md:w-2/4">
          <h1 className="text-2xl font-bold mb-2">Support Flood Victims</h1>

          {/* Important notification about high-priority cause */}
          <p className="text-red-600 font-medium flex items-center">
            <FaExclamationTriangle className="mr-2" />
            This cause is of high precedence
          </p>

          {/* Image carousel with slider settings */}
          <Slider {...settings}>
            {images.map((src, index) => (
              <div key={index} className="relative">
                <Image
                  src={src}
                  alt={`Image of flood relief scenario ${index + 1}`}
                  className="ml-[70px] md:ml-[100px] w-[68%] h-[65%] object-cover rounded-lg items-center"
                  width={867}
                  height={732}
                  priority
                />
              </div>
            ))}
          </Slider>

          {/* Tag indicators for category and location */}
          <div className="flex space-x-2 mt-9">
            <span className="text-sm bg-gray-200 rounded-full px-3 py-1 flex items-center hover:bg-gray-300 transition-colors duration-300">
              <FaHeartbeat className="mr-1" /> Healthcare
            </span>
            <span className="text-sm bg-gray-200 rounded-full px-3 py-1 flex items-center hover:bg-gray-300 transition-colors duration-300">
              <FaMapMarkerAlt className="mr-1" /> Abuja, Nigeria
            </span>
          </div>

          {/* Organization supporting the cause */}
          <p className="flex mt-4 font-semibold text-sm">
            <FaGlobe className="mr-1" /> United Nations International
            Children&apos;s Emergency Fund
          </p>

          {/* Cause description paragraphs */}
          <div className="mt-4 space-y-4">
            <p>
              <strong>Paragraph 1:</strong> The recent floods in Maiduguri have
              displaced thousands of families, leaving them without food,
              shelter, and basic necessities. We are raising $50,000 to provide
              emergency relief, including temporary housing, medical supplies,
              and food. Together, we can help rebuild their lives.
            </p>
            <p>
              <strong>Paragraph 2:</strong> The recent floods in Maiduguri have
              displaced thousands of families, leaving them without food,
              shelter, and basic necessities. We are raising $50,000 to provide
              emergency relief, including temporary housing, medical supplies,
              and food. Together, we can help rebuild their lives.
            </p>
            <p>
              <strong>Paragraph 3:</strong> The recent floods in Maiduguri have
              displaced thousands of families, leaving them without food,
              shelter, and basic necessities. We are raising $50,000 to provide
              emergency relief, including temporary housing, medical supplies,
              and food. Together, we can help rebuild their lives.
            </p>
          </div>

          {/* Buttons for sharing and donating */}
          <div className="flex mt-4 space-x-4">
            <button className="flex items-center bg-gray-200 px-4 py-2 rounded-md shadow-sm hover:bg-gray-300 transition-colors duration-300">
              <FaShare className="mr-2" /> Share
            </button>
            <button className="bg-black text-white px-4 py-2 rounded-md shadow-sm hover:bg-gray-700 transition-colors duration-300">
              Donate
            </button>
          </div>
        </div>

        {/* Right side - Donation details section */}
        <div className="mt-8 md:mt-0 md:w-[40%] mr-10">
          {/* Donation progress bar */}
          <div className="bg-gray-100 p-4 rounded-md shadow-md">
            <DonationProgress
              currentAmount={donationAmount} // Pass current donation amount
              goalAmount={goalAmount} // Pass total goal amount
            />
            <h2 className="text-xl font-bold">
              ₦{donationAmount.toLocaleString()} raised
            </h2>
            <p>of ₦{goalAmount.toLocaleString()} goal</p>

            {/* Statistics on donations */}
            <div className="flex mt-4 text-sm">
              <span className="block bg-gray-200 rounded-full px-3 py-1 mr-1">
                2.4k Donations
              </span>
              <span className="block bg-gray-200 rounded-full px-3 py-1 mr-1">
                {progressPercentage.toFixed(1)}% funded
              </span>
              <span className="block bg-gray-200 rounded-full px-3 py-1 mr-1">
                10 days left
              </span>
            </div>

            {/* Buttons for sharing and donating specific amounts */}
            <div className="mt-4 flex space-x-2">
              <button className="flex-grow bg-gray-300 text-blue py-2 rounded-md hover:bg-gray-400 transition-colors duration-300">
                Share
              </button>
              <button
                className="flex-grow bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
                onClick={() => handleDonate(50000)} // Call donation handler for ₦50,000 donation
              >
                Donate ₦50,000
              </button>
            </div>
          </div>

          {/* Recent donations list */}
          <div className="bg-gray-100 p-4 rounded-md shadow-md mt-8">
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

            {/* Interactive reaction icons */}
            <div className="mt-4 flex justify-center space-x-2">
              <FaHeart className="text-red-500 hover:text-red-600 active:text-red-700 transition-colors duration-300" />
              <FaSmile className="text-yellow-500 hover:text-yellow-600 active:text-yellow-700 transition-colors duration-300" />
              <FaLeaf className="text-green-500 hover:text-green-600 active:text-green-700 transition-colors duration-300" />
            </div>
          </div>
        </div>
      </div>
      <DonationNav />
    </div>
  );
};

export default DonationDetail; // Export the component as default
