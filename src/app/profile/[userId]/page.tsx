//app/profile/[userId]/page.tsx

import { getUserById } from "@/lib/firebase/actions";
import { getSessionId } from "@/lib/helpers";
import UserProfile from "@/components/UserProfile";
import { Suspense } from "react";
import Loading from "@/components/ui/loading";

export default async function ProfilePage({
  params,
}: {
  params: { userId: string };
}) {
  try {
    // Get the profile user data
    const profileUser = await getUserById(params.userId);

    // Get the current logged-in user's ID
    const currentUserId = await getSessionId();

    // Determine if this is the user's own profile
    const isOwnProfile = currentUserId === params.userId;

    if (!profileUser) {
      return (
        <div className="flex flex-col items-center justify-center h-screen">
          <h2 className="text-2xl font-bold mb-4">User Not Found</h2>
          <p className="text-gray-600">
            The user profile you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
      );
    }

    return (
      <Suspense fallback={<Loading />}>
        <UserProfile
          user={profileUser}
          isOwnProfile={isOwnProfile}
          currentUserId={currentUserId || undefined}
        />
      </Suspense>
    );
  } catch (error) {
    console.error("Error loading profile:", error);
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-xl font-bold mb-4">Something went wrong</h2>
        <p className="text-gray-600">
          Unable to load this profile. Please try again later.
        </p>
      </div>
    );
  }
}
