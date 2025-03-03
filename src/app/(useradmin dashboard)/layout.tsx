import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";


export default async function Layout({ children }: { children: React.ReactNode }) {

    return (
        <div className="flex flex-col h-screen w-full lg:bg-[#FAFCFF]">
            {/* Fixed topbar */}
            <Topbar profileImage="/UserProfile/defaultProfile.svg" />
            <div className="flex w-full">
                {/* Fixed sidebar */}
                <Sidebar />
                <div className=" flex-1 overflow-auto  p-5 w-full" >
                    {children}
                </div>
            </div>
        </div>


    );

}
