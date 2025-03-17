"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Bookmark } from "lucide-react";

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

  useEffect(() => {
    const fetchBookmarks = () => {
      const storedBookmarks = JSON.parse(
        localStorage.getItem("bookmarkedCauses") || "[]"
      );
      setBookmarkedCauses(storedBookmarks);
    };

    fetchBookmarks();
    window.addEventListener("storage", fetchBookmarks);
    return () => window.removeEventListener("storage", fetchBookmarks);
  }, []);

  const removeBookmark = (id: string) => {
    const updatedBookmarks = bookmarkedCauses.filter(
      (cause) => cause.id !== id
    );
    setBookmarkedCauses(updatedBookmarks);
    localStorage.setItem("bookmarkedCauses", JSON.stringify(updatedBookmarks));
    window.dispatchEvent(new Event("storage"));
  };

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
