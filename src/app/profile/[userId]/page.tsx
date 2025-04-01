// app/profile/[userId]/page.tsx
import { getUserById, getCausesByUserId } from "@/lib/firebase/actions";
import { getSessionId } from "@/lib/helpers";
import UserProfile from "@/components/UserProfile";
import { Suspense } from "react";
import Loading from "@/components/ui/loading";
import { redirect } from "next/navigation";
import { getProfileData } from "@/lib/helpers";

export default async function ProfilePage({
  params,
}: {
  params: { userId: string };
}) {
  const profileData = await getProfileData(params.userId);

  if (!profileData) {
    redirect("/");
  }

  const currentUserId = await getSessionId();
  const isOwnProfile = currentUserId === params.userId;

  return (
    <Suspense fallback={<Loading />}>
      <UserProfile
        user={profileData}
        isOwnProfile={isOwnProfile}
        currentUserId={currentUserId || undefined}
      />
    </Suspense>
  );
}
