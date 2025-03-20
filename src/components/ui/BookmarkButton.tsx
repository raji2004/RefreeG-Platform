// components/ui/BookmarkButton.tsx
"use client";

import React, { useState } from "react";
import { Bookmark } from "lucide-react";
import { db } from "@/lib/firebase/config";
import { doc, setDoc } from "firebase/firestore";
import { getSessionId } from "@/lib/helpers";
import { removeBookmark } from "@/lib/bookmark";

interface BookmarkButtonProps {
  causeId: string; // Only the cause ID is needed
  isBookmarked: boolean;
  onRemoveBookmark?: (id: string) => void;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({
  causeId,
  isBookmarked: initialBookmarked,
  onRemoveBookmark,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);
  const userId = getSessionId();

  const toggleBookmark = async () => {
    if (!userId) return;

    setIsBookmarked((prev) => !prev);

    const bookmarkRef = doc(db, `users/${userId}/bookmarked`, causeId);

    try {
      if (isBookmarked) {
        await removeBookmark(causeId); // Use the utility function
        onRemoveBookmark?.(causeId);
      } else {
        // Save only the cause ID
        await setDoc(bookmarkRef, { causeId });
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