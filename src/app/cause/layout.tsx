import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { checkUserSession } from "@/lib/helpers";
import { getSessionId } from "@/lib/helpers";
import { getUserById } from "@/lib/firebase/actions";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = (await getSessionId())
    const user = await getUserById(session ?? "")
  // const session = await checkUserSession();
  // console.log(session);
  return (
    <div className="mr-10 ml-10 mb-16">
      <Navbar userSession={!!session} profile={user?.profileImage === "" ? undefined : user?.profileImage} />
      {children}
      <Footer />
    </div>
  );
}
