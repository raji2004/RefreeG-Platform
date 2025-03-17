// app/(useradmin dashboard)/admin/dashboard/favourite-causes/page.tsx
import FavouriteCauses from "@/components/FavouriteCauses";
import { db } from "@/lib/firebase/config";
import { collection, getDocs, query } from "firebase/firestore";
import { getSessionId } from "@/lib/helpers";

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

export default async function FavouriteCausesPage() {
  const userId = getSessionId(); // Get the user ID from the session

  if (!userId) {
    return (
      <div>
        <FavouriteCauses bookmarkedCauses={[]} />
      </div>
    );
  }

  try {
    const bookmarksQuery = query(collection(db, `users/${userId}/bookmarked`));
    const querySnapshot = await getDocs(bookmarksQuery);
    const bookmarkedCauses = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      const raisedAmount = data.raisedAmount || 0;
      const goalAmount = data.goalAmount || 1; // Avoid division by zero
      const progressPercentage = Math.round((raisedAmount / goalAmount) * 100); // Calculate progressPercentage
      return { ...data, progressPercentage } as Cause;
    });

    return (
      <div>
        <FavouriteCauses bookmarkedCauses={bookmarkedCauses} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching bookmarks:", error);
    return (
      <div>
        <FavouriteCauses bookmarkedCauses={[]} />
      </div>
    );
  }
}
