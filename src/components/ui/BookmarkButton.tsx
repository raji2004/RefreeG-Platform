import React, { useState, useEffect } from "react";
import { Bookmark } from "lucide-react";

interface BookmarkButtonProps {
  cause: {
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
    daysLeft: string;
    raisedAmount: number;
    description: string;
  };
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ cause }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const storedBookmarks = JSON.parse(
      localStorage.getItem("bookmarkedCauses") || "[]"
    );
    setIsBookmarked(storedBookmarks.some((item: any) => item.id === cause.id));
  }, [cause.id]);

  const toggleBookmark = () => {
    let storedBookmarks: any[] = JSON.parse(
      localStorage.getItem("bookmarkedCauses") || "[]"
    );

    if (storedBookmarks.some((item) => item.id === cause.id)) {
      storedBookmarks = storedBookmarks.filter((item) => item.id !== cause.id);
    } else {
      storedBookmarks.push({
        id: cause.id,
        causeTitle: cause.causeTitle,
        uploadedImage: cause.uploadedImage,
        goalAmount: cause.goalAmount,
        daysLeft: cause.daysLeft,
        raisedAmount: cause.raisedAmount || 0, // Ensure it doesn't break if undefined
        description: cause.description,
        img: cause.img,
      });
    }

    localStorage.setItem("bookmarkedCauses", JSON.stringify(storedBookmarks));
    setIsBookmarked(!isBookmarked);

    // Dispatch event to notify FavouriteCauses component
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
