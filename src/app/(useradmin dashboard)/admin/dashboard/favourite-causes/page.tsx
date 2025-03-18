// app/(useradmin dashboard)/admin/dashboard/favourite-causes/page.tsx
import FavouriteCauses from "@/components/FavouriteCauses";
import { db } from "@/lib/firebase/config";
import { collection, getDocs, query } from "firebase/firestore";
import { getSessionId } from "@/lib/helpers";

export default async function FavouriteCausesPage() {
  const userId = getSessionId();

  if (!userId) {
    return (
      <div>
        <FavouriteCauses bookmarkedCauseIds={[]} />
      </div>
    );
  }

  try {
    const bookmarksQuery = query(collection(db, `users/${userId}/bookmarked`));
    const querySnapshot = await getDocs(bookmarksQuery);
    const bookmarkedCauseIds = querySnapshot.docs.map((doc) => doc.id); // Extract only the cause IDs

    return (
      <div>
        <FavouriteCauses bookmarkedCauseIds={bookmarkedCauseIds} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching bookmarks:", error);
    return (
      <div>
        <FavouriteCauses bookmarkedCauseIds={[]} />
      </div>
    );
  }
}
