// components/BookmarkButton.tsx
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
  onRemoveBookmark?: (id: string) => void; // Add onRemoveBookmark to the props
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({
  cause,
  isBookmarked: initialBookmarked,
  onRemoveBookmark,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);
  const userId = getSessionId(); // Get the user ID from the session

  const toggleBookmark = async () => {
    if (!userId) return;

    const bookmarkRef = doc(db, `users/${userId}/bookmarked`, cause.id);

    if (isBookmarked) {
      await deleteDoc(bookmarkRef); // Remove the bookmark from Firestore
      setIsBookmarked(false);
      onRemoveBookmark?.(cause.id); // Call onRemoveBookmark to update the parent component's state
    } else {
      // Sanitize the `cause` object to remove undefined fields
      const sanitizedCause = {
        id: cause.id,
        causeTitle: cause.causeTitle,
        uploadedImage: cause.uploadedImage || null, // Replace undefined with null
        img: cause.img,
        goalAmount: cause.goalAmount,
        daysLeft: cause.daysLeft,
        progressPercentage: cause.progressPercentage,
        raisedAmount: cause.raisedAmount,
        description: cause.description || "", // Replace undefined with an empty string
      };

      await setDoc(bookmarkRef, sanitizedCause); // Add the bookmark to Firestore
      setIsBookmarked(true);
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
