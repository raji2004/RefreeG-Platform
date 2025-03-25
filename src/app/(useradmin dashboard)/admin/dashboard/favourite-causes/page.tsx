import FavouriteCauses from "@/components/FavouriteCauses";
import { getSessionId } from "@/lib/helpers";
import { getBookmarkedIds } from "@/lib/firebase/actions";
import { redirect } from "next/navigation";

export default async function FavouriteCausesPage() {
  const userId = await getSessionId();
  if (!userId) {
    redirect('/login');
  }

  const bookmarkedid = await getBookmarkedIds(userId);

  return (
    <div>
      <FavouriteCauses bookmarkedCauseIds={bookmarkedid} />
    </div>
  );


}
