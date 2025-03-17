import React from "react";
import Image from "next/image";
import Link from "next/link";
import DonationProgress from "../components/ui/donationProgress";
import BookmarkButton from "./ui/BookmarkButton";
import { MainCauseCardProps } from "@/lib/type";

export const MainCauseCard: React.FC<MainCauseCardProps> = ({
  img,
  uploadedImage,
  id,
  profileImage,
  causeTitle,
  daysLeft,
  progressPercentage,
  raisedAmount,
  goalAmount,
  description,
  tags,
  hideDescription,
  hideTags,
  hideButton,
}) => {
  return (
    <div className="bg-white w-full rounded-lg">
      {/* Image */}
      <Image
        src={img}
        alt={uploadedImage?.name || "Cause Image"}
        height={300}
        width={600}
        className="rounded-lg w-full"
      />

      {/* Content */}
      <div className="flex justify-between mt-4">
        <div className="flex mb-2">
          {/* Profile Image */}
          <Image
            src={profileImage ?? img}
            alt="profile"
            height={40}
            width={40}
            className="md:size-16 mr-4 rounded-full"
          />
          {/* Title and Details */}
          <div className="flex-1">
            <h3 className="text-xl md:text-2xl font-semibold">{causeTitle}</h3>
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
            {!hideDescription && (
              <p className="mt-2 hidden lg:block">{description}</p>
            )}
          </div>
        </div>
        {/* Bookmark Button Component */}
        <BookmarkButton causeTitle={causeTitle} />
      </div>

      {/* Tags */}
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
        <DonationProgress
          currentAmount={raisedAmount}
          goalAmount={goalAmount}
        />
        <div className="font-bold text-gray-800 mt-2">
          ₦{raisedAmount} raised
        </div>
        <div className="text-gray-800">Goal: ₦{goalAmount}</div>
      </div>

      {/* Donate Button */}
      {!hideButton && (
        <Link href={`/cause/${id}`} className="flex justify-center mt-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Donate now
          </button>
        </Link>
      )}
    </div>
  );
};
