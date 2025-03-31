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
            <span className="mx-2 text-md text-black">•</span>
            <span>{progressPercentage}% funded</span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4">
            <div
              className="bg-blue-600 h-1.5 rounded-full"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>

          <div className="font-bold mb-2">₦{raisedAmount.toLocaleString()} raised</div>
          <div className="text-xs text-gray-500 mb-4">
            Goal: ₦{goalAmount.toLocaleString()}
          </div>

          {!hideTags && tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {!hideDescription && description && (
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
              {description}
            </p>
          )}

          {!hideButton && (
            <Link href={`/cause/${id}`}>
              <button className=" bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center">
                Donate now <span className="ml-1">›</span>
              </button>
            </Link>
          )}
        </div>
      </div>
    );
  };