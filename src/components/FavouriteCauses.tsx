// components/FavouriteCauses.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { db } from "@/lib/firebase/config";
import { doc, deleteDoc, getDoc } from "firebase/firestore";
import { getSessionId } from "@/lib/helpers";
import { MainCauseCard } from "@/components/CauseCard";
import { Cause } from "@/lib/type";

interface FavouriteCausesProps {
  bookmarkedCauseIds: string[]; // Array of cause IDs
}

const FavouriteCauses: React.FC<FavouriteCausesProps> = ({
  bookmarkedCauseIds,
}) => {
  const [bookmarks, setBookmarks] = useState<Cause[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const userId = getSessionId();

  useEffect(() => {
    const fetchBookmarkedCauses = async () => {
      if (!bookmarkedCauseIds) return;

      const causes: Cause[] = [];
      for (const causeId of bookmarkedCauseIds) {
        const causeDoc = await getDoc(doc(db, "causes", causeId));
        if (causeDoc.exists()) {
          const causeData = causeDoc.data();

          // Calculate progressPercentage dynamically
          const raisedAmount = causeData.raisedAmount || 0;
          const goalAmount = causeData.goalAmount || 1; // Avoid division by zero
          const progressPercentage = Math.round((raisedAmount / goalAmount) * 100);

          // Calculate daysLeft dynamically
          const deadline = causeData.deadline; // Ensure deadline is stored in Firestore
          const daysLeft = deadline
            ? Math.ceil(
                (new Date(deadline).getTime() - new Date().getTime()) /
                  (1000 * 60 * 60 * 24)
              )
            : "N/A";

          // Add calculated fields to the cause object
          causes.push({
            ...causeData,
            id: causeDoc.id,
            progressPercentage,
            daysLeft,
          } as Cause);
        }
      }

      setBookmarks(causes);
      setIsLoading(false);
    };

    fetchBookmarkedCauses();
  }, [bookmarkedCauseIds]);

  const removeBookmark = async (id: string) => {
    if (!userId) return;

    try {
      const bookmarkRef = doc(db, `users/${userId}/bookmarked`, id);
      await deleteDoc(bookmarkRef);

      const updatedBookmarks = bookmarks.filter((cause) => cause.id !== id);
      setBookmarks(updatedBookmarks);

      window.dispatchEvent(new Event("storage"));
    } catch (error) {
      console.error("Error removing bookmark:", error);
    }
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
              onRemoveBookmark={removeBookmark}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavouriteCauses;