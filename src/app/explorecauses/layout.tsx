import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { checkUserSession } from "@/lib/helpers";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await checkUserSession();
  console.log(session);
  return (
    <div className="mr-10 ml-10 mb-16">
      <Navbar userSession={session} />
      {children}
      <Footer />
    </div>
  );
}
