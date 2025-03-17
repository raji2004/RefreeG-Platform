import React, { useState, useEffect } from "react";
import { Bookmark } from "lucide-react";
import { db } from "@/lib/firebase/config";
import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";
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
    raisedAmount: number;
    description?: string; // Make `description` optional
  };
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ cause }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const userId = getSessionId(); // Get the user ID from the session

  useEffect(() => {
    const fetchBookmarkStatus = async () => {
      if (userId) {
        const bookmarkRef = doc(db, `users/${userId}/bookmarked`, cause.id);
        const bookmarkSnap = await getDoc(bookmarkRef);
        setIsBookmarked(bookmarkSnap.exists());
      }
    };

    fetchBookmarkStatus();
  }, [cause.id, userId]);

  const toggleBookmark = async () => {
    if (!userId) return;

    const bookmarkRef = doc(db, `users/${userId}/bookmarked`, cause.id);

    if (isBookmarked) {
      await deleteDoc(bookmarkRef);
    } else {
      // Validate and sanitize the `cause` object before saving
      const sanitizedCause = {
        id: cause.id,
        causeTitle: cause.causeTitle || "", // Fallback to empty string if undefined
        uploadedImage: cause.uploadedImage || null, // Fallback to null if undefined
        img: cause.img || "", // Fallback to empty string if undefined
        goalAmount: cause.goalAmount || 0, // Fallback to 0 if undefined
        daysLeft: cause.daysLeft || "", // Fallback to empty string if undefined
        raisedAmount: cause.raisedAmount || 0, // Fallback to 0 if undefined
        description: cause.description || "", // Fallback to empty string if undefined
      };

      await setDoc(bookmarkRef, sanitizedCause);
    }

    setIsBookmarked(!isBookmarked);
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
