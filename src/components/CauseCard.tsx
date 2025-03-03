import React, { useState } from "react";
import Image from "next/image";
import { FaHeartbeat, FaMapMarkerAlt } from "react-icons/fa";
import DonationProgress from "../components/ui/donationProgress";
import { Bookmark } from "lucide-react";

interface MainCauseCardProps {
  imageSrc: string;
  altText: string;
  profileImageSrc: string;
  title: string;
  daysLeft: string;
  progressPercentage: number;
  donationAmount: number;
  goalAmount: number;
  description?: string;
  tags?: { icon: JSX.Element; text: string }[];
  hideDescription?: boolean;
  hideTags?: boolean;
  hideButton?: boolean;
}

export const MainCauseCard: React.FC<MainCauseCardProps> = ({
  imageSrc,
  altText,
  profileImageSrc,
  title,
  daysLeft,
  progressPercentage,
  donationAmount,
  goalAmount,
  description,
  tags,
  hideDescription,
  hideTags,
  hideButton,
}) => {
  // State to track bookmark status
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Toggle bookmark function
  const toggleBookmark = () => {
    setIsBookmarked((prev) => !prev);
  };

  return (
    <div className="bg-white w-full rounded-lg">
      {/* Image */}
      <Image
        src={imageSrc}
        alt={altText}
        height={300}
        width={600}
        className="rounded-lg w-full"
      />

      {/* Content */}
      <div className="flex justify-between mt-4">
        <div className="flex mb-2">
          {/* Profile Image */}
          <Image
            src={profileImageSrc}
            alt="profile"
            height={40}
            width={40}
            className="md:size-16 mr-4"
          />
          {/* Title and Details */}
          <div className="flex-1">
            <h3 className="text-xl md:text-2xl font-semibold">{title}</h3>
            <p className="flex mt-2 text-gray-600">
              <Image
                src="/images/clock.svg"
                alt="clock"
                height={20}
                width={20}
                className="mr-1"
              />
              {daysLeft} • {progressPercentage}% funded
            </p>
            {/* Description (Hidden on Mobile) */}
            {!hideDescription && <p className="mt-2 hidden lg:block">{description}</p>}
          </div>
        </div>
        {/* Bookmark Icon */}
        <div onClick={toggleBookmark} className="cursor-pointer">
          <Bookmark
            size={30}
            className={`transition-colors duration-300 ${
              isBookmarked ? "text-blue-600 fill-blue-600" : "text-gray-500"
            }`}
          />
        </div>
      </div>

      {/* Tags (Hidden on Mobile) */}
      {!hideTags && (
        <div className="hidden md:flex space-x-2 mt-9">
          {tags?.map((tag, index) => (
            <span
              key={index}
              className="text-sm bg-gray-200 rounded-full px-3 py-1 flex items-center hover:bg-gray-300 transition-colors duration-300"
            >
              {tag.icon} {tag.text}
            </span>
          ))}
        </div>
      )}

      {/* Donation Progress */}
      <div className="mt-6">
        <DonationProgress currentAmount={donationAmount} goalAmount={goalAmount} />
        <div className="font-bold text-gray-800 mt-2">₦{donationAmount} raised</div>
        <div className="text-gray-800">Goal: ₦{goalAmount}</div>
      </div>

      {/* Donate Button */}
      {!hideButton && (
        <div className="flex justify-center mt-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Donate now
          </button>
        </div>
      )}
    </div>
  );
};