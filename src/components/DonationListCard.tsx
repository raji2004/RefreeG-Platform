"use client";

import React, { useState } from "react";
import { FiHeart } from "react-icons/fi";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

function DonationListCard({
  name,
  amount,
  badgeText,
}: {
  name: string;
  amount: string;
  badgeText: string;
}) {
  const [claps, setClaps] = useState(0);
  const [isClapping, setIsClapping] = useState(false);

  const handleClap = () => {
    setClaps((prev) => prev + 1);
    setIsClapping(true);

    // Reset animation after it completes
    setTimeout(() => {
      setIsClapping(false);
    }, 700);
  };

  return (
    <div className="flex items-center justify-between hover:shadow-md p-2 transition-all duration-200 cursor-pointer">
      <div className="flex items-center">
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
          <FiHeart className="text-gray-500" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p className="font-medium">{name}</p>
            <Badge className="text-xs text-[#7D568A] bg-[#F2EAF4] hover:bg-[#F2EAF4] px-2 py-0.5 rounded">
              {badgeText}
            </Badge>
          </div>
          <p className="text-sm text-gray-700">{amount}</p>
        </div>
      </div>
      <div className="relative">
        <button
          onClick={handleClap}
          className={`border border-[#E6EEF8] p-2 rounded-full transition-all duration-200 ${
            isClapping ? "bg-blue-50" : ""
          } hover:bg-blue-50 focus:outline-none`}
        >
          <div
            className={`transform transition-transform ${
              isClapping ? "scale-125" : "scale-100"
            }`}
          >
            <Image
              src="/DonationDetail/Applause.svg"
              width={24}
              height={24}
              alt="Applause"
            />
          </div>
        </button>
        {claps > 0 && (
          <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {claps}
          </span>
        )}
      </div>
    </div>
  );
}

export default DonationListCard;
