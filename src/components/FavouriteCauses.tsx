"use client";

import React, { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { MainCauseCard } from "./CauseCard";
import { MainCauseCardProps } from "@/lib/type";

const FavouriteCauses: React.FC = () => {
  const [favouriteCauses, setFavouriteCauses] = useState<string[]>([]);
  const [causesData, setCausesData] = useState<MainCauseCardProps[]>([]);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchBookmarkedCauses = async () => {
      if (!user) return;

      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);
      const savedBookmarks = userDoc.exists()
        ? userDoc.data().bookmarkedCauses || []
        : [];
      setFavouriteCauses(savedBookmarks);
    };

    fetchBookmarkedCauses();
  }, [user]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCauses = localStorage.getItem("causes");
      if (storedCauses) {
        const parsedCauses: MainCauseCardProps[] = JSON.parse(storedCauses);
        const filteredCauses = parsedCauses.filter((cause) =>
          favouriteCauses.includes(cause.causeTitle)
        );
        setCausesData(filteredCauses);
      }
    }
  }, [favouriteCauses]);

  return (
    <div className="container mx-auto py-6">
      <h2 className="text-2xl font-bold mb-4">Favourite Causes</h2>
      {causesData.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {causesData.map((cause) => (
            <MainCauseCard key={cause.id} {...cause} />
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No favourite causes found.</p>
      )}
    </div>
  );
};

export default FavouriteCauses;
