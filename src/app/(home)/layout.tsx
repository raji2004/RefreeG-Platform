import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { getSessionId } from "@/lib/helpers";


export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = (await getSessionId()) != undefined ? true : false;
  return (
    <div>
      <Navbar userSession={session} />
      {children}
      <Footer />
    </div>
  );

}
