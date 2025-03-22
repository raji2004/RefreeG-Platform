// components/FavouriteCauses.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MainCauseCard } from "@/components/CauseCard"
import { getCauseById, removeBookmark } from "@/lib/firebase/actions";
import { Cause } from "@/lib/type"; // Import the Cause type
import { getDaysLeft } from "@/lib/utils";

interface FavouriteCausesProps {
  bookmarkedCauseIds: string[]; // Array of cause IDs
}

const FavouriteCauses: React.FC<FavouriteCausesProps> = ({
  bookmarkedCauseIds,
}) => {
  const [bookmarks, setBookmarks] = useState<Cause[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarkedCauses = async () => {
      if (!bookmarkedCauseIds) return;

      const causes: Cause[] = [];
      for (const causeId of bookmarkedCauseIds) {
        const cause = await getCauseById(causeId);
        if (!cause) continue;
        const progressPercentage = Math.round(
          (cause.raisedAmount / cause.goalAmount) * 100
        );
        const daysLeft = getDaysLeft(cause.deadline)
        causes.push({
          ...cause,
          progressPercentage,
          daysLeft,
        });
      }

      setBookmarks(causes);
      setIsLoading(false);
    };

    fetchBookmarkedCauses();
  }, [bookmarkedCauseIds]);

  const handleRemoveBookmark = async (id: string) => {
    await removeBookmark(id); // Use the utility function
    const updatedBookmarks = bookmarks.filter((cause) => cause.id !== id);
    setBookmarks(updatedBookmarks);
  };

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
              {...cause} // Spread all properties from cause
              hideDescription={false}
              hideTags={false}
              hideButton={false}
              isBookmarked={true} // Set isBookmarked to true for all causes
              onRemoveBookmark={handleRemoveBookmark} // Pass the handler
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavouriteCauses;
