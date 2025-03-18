// components/ui/BookmarkButton.tsx
"use client";

import React, { useState } from "react";
import { Bookmark } from "lucide-react";
import { db } from "@/lib/firebase/config";
import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { getSessionId } from "@/lib/helpers";

interface BookmarkButtonProps {
  cause: {
    id: string;
    causeTitle: string;
    uploadedImage?: {
      src: string;
      name: string;
      size: number;
      type: string;
      progress: number;
    };
    img: string;
    goalAmount: number;
    daysLeft: string;
    progressPercentage: number;
    raisedAmount: number;
    description?: string;
  };
  isBookmarked: boolean;
  onRemoveBookmark?: (id: string) => void;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({
  cause,
  isBookmarked: initialBookmarked,
  onRemoveBookmark,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);
  const userId = getSessionId();

  const toggleBookmark = async () => {
    if (!userId) return;

    setIsBookmarked((prev) => !prev);

    const bookmarkRef = doc(db, `users/${userId}/bookmarked`, cause.id);

    try {
      if (isBookmarked) {
        await deleteDoc(bookmarkRef);
        onRemoveBookmark?.(cause.id);
      } else {
        const sanitizedCause = {
          id: cause.id,
          causeTitle: cause.causeTitle,
          uploadedImage: cause.uploadedImage || null,
          img: cause.img,
          goalAmount: cause.goalAmount,
          daysLeft: cause.daysLeft,
          progressPercentage: cause.progressPercentage,
          raisedAmount: cause.raisedAmount,
          description: cause.description || "",
        };

        await setDoc(bookmarkRef, sanitizedCause);
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error);
      setIsBookmarked((prev) => !prev);
    }

    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div onClick={toggleBookmark} className="cursor-pointer">
      <Bookmark
        size={30}
        className={`transition-colors duration-300 ${
          isBookmarked ? "text-blue-600 fill-blue-600" : "text-gray-500"
        }`}
      />
    </div>
  );
};

export default BookmarkButton;
