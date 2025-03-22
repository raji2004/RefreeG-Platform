// components/ui/BookmarkButton.tsx
"use client";

import React, { useState } from "react";
import { Bookmark } from "lucide-react";
import { addBookmark, removeBookmark } from "@/lib/firebase/actions";


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
 

  const toggleBookmark = async () => {
  

    setIsBookmarked((prev) => !prev);
    try {
      if (isBookmarked) {
        await removeBookmark(causeId); // Use the utility function
        onRemoveBookmark?.(causeId);
      } else {
        await addBookmark(causeId); // Use the utility function
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
        className={`transition-colors duration-300 ${isBookmarked ? "text-blue-600 fill-blue-600" : "text-gray-500"
          }`}
      />
    </div>
  );
};

export default BookmarkButton;