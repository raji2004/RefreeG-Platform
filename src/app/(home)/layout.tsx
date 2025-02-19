import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className=" mb-16">

                <Navbar />
                {children}
                
            </div>
            <Footer />
        </>
    )
}
