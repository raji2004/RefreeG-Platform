// app/(useradmin dashboard)/admin/dashboard/favourite-causes/page.tsx
import FavouriteCauses from "@/components/FavouriteCauses";
import { db } from "@/lib/firebase/config";
import { collection, getDocs, query } from "firebase/firestore";
import { getSessionId } from "@/lib/helpers";
import { Cause } from "@/lib/type";

export default async function FavouriteCausesPage() {
  const userId = getSessionId();

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
      const goalAmount = data.goalAmount || 1;
      const progressPercentage = Math.round((raisedAmount / goalAmount) * 100);
      return { ...data, progressPercentage, isBookmarked: true } as Cause;
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
