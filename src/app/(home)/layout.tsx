import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { checkUserSession } from "@/lib/helpers";

export default function Layout({ children }: { children: React.ReactNode }) {
  const session = checkUserSession();
  return (
    <div className="mr-10 ml-10 mb-16">
      <Navbar userSession={true} />
      {children}
      <Footer />
    </div>
  );
}
