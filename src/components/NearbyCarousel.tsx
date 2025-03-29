"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BsArrowLeft, BsArrowRight, BsBookmark } from "react-icons/bs";
import { GoClock } from "react-icons/go";
import { Badge } from "./ui/badge";

interface CauseItem {
  id: string;
  title: string;
  daysLeft: number;
  percentFunded: number;
  amountRaised: number;
  goalAmount: number;
  location: string;
  imageSrc: string;
}

const NearbyCarousel: React.FC = () => {
  // Sample data for the carousel
  const nearbyItems: CauseItem[] = [
    {
      id: "1",
      title: "Maiduguiri flood",
      daysLeft: 15,
      percentFunded: 60,
      amountRaised: 1700000,
      goalAmount: 2700000,
      location: "Maiduguiri",
      imageSrc: "/DonationDetail/flood1.svg",
    },
    {
      id: "2",
      title: "Maiduguiri flood",
      daysLeft: 15,
      percentFunded: 60,
      amountRaised: 1700000,
      goalAmount: 2700000,

      location: "Maiduguiri",
      imageSrc: "/DonationDetail/flood2.svg",
    },
    {
      id: "3",
      title: "Maiduguiri flood",
      daysLeft: 15,
      percentFunded: 60,
      amountRaised: 1700000,
      goalAmount: 2700000,

      location: "Maiduguiri",
      imageSrc: "/DonationDetail/flood3.svg",
    },
    {
      id: "4",
      title: "Maiduguiri flood",
      daysLeft: 15,
      percentFunded: 60,
      amountRaised: 1700000,
      goalAmount: 2700000,

      location: "Maiduguiri",
      imageSrc: "/DonationDetail/flood4.svg",
    },
    {
      id: "5",
      title: "Maiduguiri flood",
      daysLeft: 15,
      percentFunded: 60,
      amountRaised: 1700000,
      goalAmount: 2700000,

      location: "Maiduguiri",
      imageSrc: "/DonationDetail/flood5.svg",
    },
    {
      id: "6",
      title: "Maiduguiri flood",
      daysLeft: 15,
      percentFunded: 60,
      amountRaised: 1700000,
      goalAmount: 2700000,
      location: "Maiduguiri",
      imageSrc: "/DonationDetail/flood2.svg",
    },
  ];

  const [startIndex, setStartIndex] = useState(0);
  const itemsToShow = 4; // Number of items to show at once

  const handlePrevious = () => {
    setStartIndex((prevIndex) =>
      prevIndex === 0
        ? Math.max(0, nearbyItems.length - itemsToShow)
        : Math.max(0, prevIndex - 1)
    );
  };

  const handleNext = () => {
    setStartIndex((prevIndex) =>
      prevIndex >= nearbyItems.length - itemsToShow ? 0 : prevIndex + 1
    );
  };

  const visibleItems = nearbyItems.slice(startIndex, startIndex + itemsToShow);

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-medium">Happening near you</h2>
        <Link
          href="/causes"
          className="text-blue-600 hover:underline flex items-center"
        >
          View all <span className="ml-1">›</span>
        </Link>
      </div>
      <p className="text-gray-600 mb-6">
        These causes are happening close to your current location.
      </p>

      <div className="relative">
        <div className="flex space-x-4 overflow-hidden">
          {visibleItems.map((item) => (
            <div
              key={item.id}
              className="flex-none w-full sm:w-1/2 md:w-1/4 px-2"
            >
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="relative">
                  <div className="relative h-48 w-full">
                    <Image
                      src={item.imageSrc}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <Badge className="absolute bottom-2 left-2 bg-white text-black text-xs px-2 py-1 rounded-full">
                    3k donations
                  </Badge>
                </div>

                <div className="p-4">
                  <div className="flex items-center mb-2">
                    <div className="h-6 w-6 rounded-full bg-gray-300 mr-2"></div>

                    <div className="flex items-center justify-between w-full">
                      <h3 className="font-medium">{item.title}</h3>
                      <button>
                        <BsBookmark className="text-gray-700" />
                      </button>
                    </div>
                  </div>

                  <div className="flex  text-xs text-gray-500 mb-2">
                    <span className="text-black font-medium flex items-center gap-1">
                      {" "}
                      <GoClock /> 15 days left
                    </span>

                    <span className="mx-2 text-md text-black">•</span>

                    <span>60% funded</span>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4">
                    <div
                      className="bg-blue-600 h-1.5 rounded-full"
                      style={{ width: `${item.percentFunded}%` }}
                    ></div>
                  </div>

                  <div className="font-bold mb-2">
                    ₦{item.amountRaised.toLocaleString()} raised
                  </div>
                  <div className="text-xs text-gray-500 mb-4">
                    Goal: ₦{item.goalAmount.toLocaleString()}
                  </div>

                  <Link href={`/${item.id}/payment`}>
                    <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center">
                      Donate now <span className="ml-1">›</span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end  mt-6 space-x-2">
          <button
            onClick={handlePrevious}
            className="p-2 rounded-full border border-gray-300 hover:bg-gray-100"
            aria-label="Previous slide"
          >
            <BsArrowLeft />
          </button>
          <button
            onClick={handleNext}
            className="p-2 rounded-full border border-gray-300 hover:bg-gray-100"
            aria-label="Next slide"
          >
            <BsArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NearbyCarousel;
