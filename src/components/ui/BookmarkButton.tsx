import React, { useState, useEffect } from "react";
import { Bookmark } from "lucide-react";
import { auth, db } from "@/lib/firebase/config";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from "firebase/firestore";

interface BookmarkButtonProps {
  causeTitle: string;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ causeTitle }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchBookmarkedCauses = async () => {
      if (!user) return;

      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);
      const savedBookmarks = userDoc.exists()
        ? userDoc.data().bookmarkedCauses || []
        : [];

      setIsBookmarked(savedBookmarks.includes(causeTitle));
    };

    fetchBookmarkedCauses();
  }, [causeTitle, user]);

  const toggleBookmark = async () => {
    if (!user) {
      alert("Please log in to bookmark causes.");
      return;
    }

    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);
    const savedBookmarks = userDoc.exists()
      ? userDoc.data().bookmarkedCauses || []
      : [];

    try {
      if (savedBookmarks.includes(causeTitle)) {
        await updateDoc(userRef, {
          bookmarkedCauses: arrayRemove(causeTitle),
        });
        setIsBookmarked(false);
      } else {
        await updateDoc(userRef, {
          bookmarkedCauses: arrayUnion(causeTitle),
        });
        setIsBookmarked(true);
      }
    } catch (error) {
      console.error("Error updating bookmark:", error);
    }
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
