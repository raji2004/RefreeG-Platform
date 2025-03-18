"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { db } from "@/lib/firebase/config";
import { doc, deleteDoc } from "firebase/firestore";
import { getSessionId } from "@/lib/helpers";
import { MainCauseCard } from "@/components/CauseCard"; // Import the MainCauseCard component

interface Cause {
  id: string;
  causeTitle: string;
  uploadedImage: {
    src: string;
    name: string;
    size: number;
    type: string;
    progress: number;
  };
  img: string;
  goalAmount: number;
  progressPercentage: number;
  daysLeft: string;
  raisedAmount: number;
  description: string;
  profileImage: string;
  tags?: { icon: JSX.Element; text: string }[];
  isBookmarked: boolean; // Add isBookmarked to the Cause interface
}

interface FavouriteCausesProps {
  bookmarkedCauses: Cause[];
}

const FavouriteCauses: React.FC<FavouriteCausesProps> = ({
  bookmarkedCauses,
}) => {
  const [bookmarks, setBookmarks] = useState<Cause[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state
  const userId = getSessionId(); // Get the user ID from the session

  // Initialize bookmarks state and set loading to false once data is available
  useEffect(() => {
    if (bookmarkedCauses) {
      setBookmarks(bookmarkedCauses);
      setIsLoading(false);
    }
  }, [bookmarkedCauses]);

  const removeBookmark = async (id: string) => {
    if (!userId) return;

    try {
      const bookmarkRef = doc(db, `users/${userId}/bookmarked`, id);
      await deleteDoc(bookmarkRef); // Remove the bookmark from Firestore

      // Update the local state to remove the cause from the list
      const updatedBookmarks = bookmarks.filter((cause) => cause.id !== id);
      setBookmarks(updatedBookmarks);

      // Dispatch a storage event to notify other components of the change
      window.dispatchEvent(new Event("storage"));
    } catch (error) {
      console.error("Error removing bookmark:", error);
    }
  };

  // Show a loading spinner or skeleton while data is being fetched
  if (isLoading) {
    return (
      <div className="container mx-auto py-6 text-center">
        <h1 className="text-2xl font-semibold mb-4">Favourite Causes</h1>
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 text-center">
      <h1 className="text-2xl font-semibold mb-4">Favourite Causes</h1>

      {bookmarks.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-10">
          <p className="text-gray-600 mb-4">
            You have no favourite causes at this time 🙂
          </p>
          <Link href="/">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              Browse Causes →
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookmarks.map((cause) => (
            <MainCauseCard
              key={cause.id}
              id={cause.id}
              causeTitle={cause.causeTitle}
              uploadedImage={cause.uploadedImage}
              img={cause.img}
              goalAmount={cause.goalAmount}
              daysLeft={cause.daysLeft}
              raisedAmount={cause.raisedAmount}
              progressPercentage={cause.progressPercentage}
              description={cause.description}
              profileImage={cause.profileImage}
              tags={cause.tags}
              hideDescription={false}
              hideTags={false}
              hideButton={false}
              isBookmarked={cause.isBookmarked}
              onRemoveBookmark={removeBookmark} // Pass the removeBookmark function as a prop
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavouriteCauses;
