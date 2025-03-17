"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Bookmark } from "lucide-react";
import { db } from "@/lib/firebase/config";
import { collection, getDocs, query, doc, deleteDoc } from "firebase/firestore";
import { getSessionId } from "@/lib/helpers";

interface Cause {
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
  description: string;
}

const FavouriteCauses: React.FC = () => {
  const [bookmarkedCauses, setBookmarkedCauses] = useState<Cause[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state
  const userId = getSessionId(); // Get the user ID from the session

  useEffect(() => {
    const fetchBookmarks = async () => {
      if (userId) {
        try {
          const bookmarksQuery = query(
            collection(db, `users/${userId}/bookmarked`)
          );
          const querySnapshot = await getDocs(bookmarksQuery);
          const bookmarks = querySnapshot.docs.map(
            (doc) => doc.data() as Cause
          );
          setBookmarkedCauses(bookmarks);
        } catch (error) {
          console.error("Error fetching bookmarks:", error);
        } finally {
          setIsLoading(false); // Set loading to false after fetching data
        }
      } else {
        setIsLoading(false); // Set loading to false if there's no user ID
      }
    };

    fetchBookmarks();
  }, [userId]);

  const removeBookmark = async (id: string) => {
    if (!userId) return;

    const bookmarkRef = doc(db, `users/${userId}/bookmarked`, id);
    await deleteDoc(bookmarkRef);

    const updatedBookmarks = bookmarkedCauses.filter(
      (cause) => cause.id !== id
    );
    setBookmarkedCauses(updatedBookmarks);
    window.dispatchEvent(new Event("storage"));
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

      {bookmarkedCauses.length === 0 ? (
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
          {bookmarkedCauses.map((cause) => (
            <div key={cause.id} className="bg-white p-4 rounded-lg shadow-md">
              <Image
                src={cause.img}
                alt={cause.causeTitle}
                width={300}
                height={200}
                className="rounded-lg w-full"
              />
              <div className="flex justify-between items-center mt-2">
                <h3 className="text-lg font-semibold">{cause.causeTitle}</h3>
                <Bookmark
                  size={24}
                  className="fill-blue-600 cursor-pointer"
                  onClick={() => removeBookmark(cause.id)}
                />
              </div>
              <p className="text-gray-600 mt-1">{cause.description}</p>
              <p className="text-sm text-gray-500 mt-1">
                {cause.daysLeft} • ₦{cause.raisedAmount} raised
              </p>
              <Link
                href={`/cause/${cause.id}`}
                className="block mt-2 text-blue-600 hover:underline"
              >
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  Donate now
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavouriteCauses;
