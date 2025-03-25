// components/CauseCard.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import DonationProgress from "../components/ui/donationProgress";
import BookmarkButton from "./ui/BookmarkButton";
import { MainCauseCardProps } from "@/lib/type";
import { BsBookmark } from "react-icons/bs";
import { GoClock } from "react-icons/go";
import { Badge } from "./ui/badge";

export const MainCauseCard: React.FC<
  MainCauseCardProps & { onRemoveBookmark: (id: string) => void }
> = ({
  img,
  uploadedImage,
  id,
  profileImage,
  causeTitle,
  daysLeft = 0,
  progressPercentage = 0,
  raisedAmount = 0,
  goalAmount = 0,
  description,
  tags,
  hideDescription,
  hideTags,
  hideButton,
  isBookmarked,
  onRemoveBookmark,
}) => {
    return (
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="relative">
          <div className="relative h-48 w-full">
            <Image
              src={img}
              alt={uploadedImage?.name || "Cause Image"}
              fill
              className="object-cover"
            />
          </div>
          <Badge className="absolute bottom-2 left-2 bg-white text-black text-xs px-2 py-1 rounded-full">
            {raisedAmount.toLocaleString()} donations
          </Badge>
        </div>

        <div className="p-4">
          <div className="flex items-center mb-2">
            <div className="h-8 w-8 aspect-square rounded-full overflow-hidden mr-2">
              <Image
                src={profileImage }
                alt="profile"
                width={34}
                height={34}
                className="w-full h-full aspect-square"
              />
            </div>

            <div className="flex items-center justify-between w-full">
              <h3 className="font-medium">{causeTitle}</h3>
              <button onClick={() => onRemoveBookmark(id)}>
                <BookmarkButton
                  causeId={id}
                  isBookmarked={isBookmarked}
                  onRemoveBookmark={onRemoveBookmark}
                />
              </button>
            </div>
          </div>

          <div className="flex text-xs text-gray-500 mb-2">
            <span className="text-black font-medium flex items-center gap-1">
              <GoClock /> {daysLeft} 
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
        <DonationProgress progressPercentage={progressPercentage} />
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
