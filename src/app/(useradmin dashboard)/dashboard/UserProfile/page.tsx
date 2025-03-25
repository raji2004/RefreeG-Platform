import { getSessionId } from "@/lib/helpers";
import { redirect } from "next/navigation";
import GeneralInfo from "./_components/GeneralInfo";
import { getUserById } from "@/lib/firebase/actions";

export default async function UserProfile() {
  const session = await getSessionId();
  if (!session) {
    redirect("/");
  }
  const user = await getUserById(session);
  if (user === null) {
    redirect("/"); // Redirect to login if user not found
  }
  return (
    <GeneralInfo
      user={
        {
          ...user,
          profileImage: user.profileImage ?? "/UserProfile/defaultProfile.svg",
        }
      }
    />
  );
}