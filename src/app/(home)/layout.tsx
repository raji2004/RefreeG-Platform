import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";


export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <div className="mr-10 ml-10 mb-16">

                <Navbar />
                {children}
                
            </div>
            <Footer />
        </div>
    )
}
