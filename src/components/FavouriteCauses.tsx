// components/FavouriteCauses.tsx
"use client";

import React, { useState } from "react";
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
}

interface FavouriteCausesProps {
  bookmarkedCauses: Cause[];
}

const FavouriteCauses: React.FC<FavouriteCausesProps> = ({
  bookmarkedCauses,
}) => {
  const [bookmarks, setBookmarks] = useState<Cause[]>(bookmarkedCauses);
  const userId = getSessionId(); // Get the user ID from the session

  const removeBookmark = async (id: string) => {
    if (!userId) return;

    const bookmarkRef = doc(db, `users/${userId}/bookmarked`, id);
    await deleteDoc(bookmarkRef);

    const updatedBookmarks = bookmarks.filter((cause) => cause.id !== id);
    setBookmarks(updatedBookmarks);
    window.dispatchEvent(new Event("storage"));
  };

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
              progressPercentage={cause.progressPercentage} // Pass the calculated progressPercentage
              description={cause.description}
              profileImage={cause.profileImage}
              tags={cause.tags}
              hideDescription={false}
              hideTags={false}
              hideButton={false}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavouriteCauses;
