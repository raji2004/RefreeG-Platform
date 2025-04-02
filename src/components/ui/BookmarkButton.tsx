"use client";

import React, { useState, useEffect } from "react";
import { BsBookmarkFill, BsBookmark } from "react-icons/bs";
import { addBookmark, removeBookmark } from "@/lib/firebase/actions";

interface BookmarkButtonProps {
  causeId: string;
  isBookmarked: boolean;
  onRemoveBookmark?: (id: string) => void;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({
  causeId,
  isBookmarked: initialBookmarked,
  onRemoveBookmark,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    setIsBookmarked(initialBookmarked);
  }, [initialBookmarked]);

  const toggleBookmark = async () => {
    if (isProcessing) return;

    setIsProcessing(true);
    const newBookmarkedState = !isBookmarked;
    setIsBookmarked(newBookmarkedState);

    try {
      if (newBookmarkedState) {
        await addBookmark(causeId);
      } else {
        await removeBookmark(causeId);
        onRemoveBookmark?.(causeId);
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error);
      setIsBookmarked(!newBookmarkedState); // Revert on error
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div
      onClick={toggleBookmark}
      className="cursor-pointer"
      aria-busy={isProcessing}
    >
      {isBookmarked ? (
        <BsBookmarkFill size={20} className="text-blue-600" />
      ) : (
        <BsBookmark size={20} className="text-black" />
      )}
    </div>
  );
};

export default BookmarkButton;
