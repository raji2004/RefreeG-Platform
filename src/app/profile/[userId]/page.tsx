// app/profile/[userId]/page.tsx
import { Suspense } from "react";
import Loading from "@/components/ui/loading";
import UserProfile from "@/components/UserProfile";

export default function ProfilePage({
  params,
}: {
  params: { userId: string };
}) {
  return (
    <Suspense fallback={<Loading />}>
      <UserProfile userId={params.userId} />
    </Suspense>
  );
}
