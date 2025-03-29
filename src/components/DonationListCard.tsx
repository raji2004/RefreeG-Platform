"use client";

import React, { useState } from "react";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

function DonationListCard({
  name,
  amount,
  badgeText,
  totalClaps = 0,
  userHasClapped = false,
  userHasLiked = false,
  onClap,
  onLike,
}: {
  name: string;
  amount: string;
  badgeText: string;
  totalClaps?: number;
  userHasClapped?: boolean;
  userHasLiked?: boolean;
  onClap?: () => void;
  onLike?: () => void;
}) {
  // Local state for animations
  const [isClapping, setIsClapping] = useState(false);
  const [isHeartAnimating, setIsHeartAnimating] = useState(false);

  // Local state to track user interactions until they're synced with the backend
  const [hasClappedLocally, setHasClappedLocally] = useState(userHasClapped);
  const [isLikedLocally, setIsLikedLocally] = useState(userHasLiked);

  const handleClap = () => {
    if (!hasClappedLocally) {
      setHasClappedLocally(true);
      setIsClapping(true);

      if (onClap) onClap();

      // Reset animation after it completes
      setTimeout(() => {
        setIsClapping(false);
      }, 700);
    }
  };

  const handleHeartClick = () => {
    setIsLikedLocally(!isLikedLocally);
    setIsHeartAnimating(true);

    if (onLike) onLike();

    setTimeout(() => {
      setIsHeartAnimating(false);
    }, 600);
  };

  // Use the local state which will be updated immediately, or fall back to props
  const effectiveHasClapped = hasClappedLocally || userHasClapped;
  const effectiveIsLiked = isLikedLocally || userHasLiked;

  return (
    <div className="flex items-center justify-between hover:shadow-md p-2 transition-all duration-200 cursor-pointer">
      <div className="flex items-center">
        <button
          onClick={handleHeartClick}
          className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 transition-all duration-300 ${
            effectiveIsLiked ? "bg-red-100" : "bg-blue-100"
          } ${isHeartAnimating ? "scale-125" : "scale-100"} focus:outline-none`}
        >
          {effectiveIsLiked ? (
            <FaHeart
              className={`text-red-500 ${
                isHeartAnimating ? "animate-pulse" : ""
              }`}
            />
          ) : (
            <FiHeart className="text-gray-500" />
          )}
        </button>
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
          disabled={effectiveHasClapped}
          className={`border border-[#E6EEF8] p-2 rounded-full transition-all duration-200 ${
            isClapping ? "bg-blue-50" : ""
          } ${
            effectiveHasClapped ? "bg-blue-50 opacity-80" : "hover:bg-blue-50"
          } focus:outline-none`}
          title={
            effectiveHasClapped
              ? "Already clapped"
              : "Clap to show appreciation"
          }
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
        {(totalClaps > 0 || effectiveHasClapped) && (
          <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {totalClaps > 0 ? totalClaps : 1}
          </span>
        )}
      </div>
    </div>
  );
}

export default DonationListCard;
