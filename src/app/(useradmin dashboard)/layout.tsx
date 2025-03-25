import DashBoardLayout from "@/components/dashboardLayout";
import { getSessionId } from "@/lib/helpers";
import { getUserById } from "@/lib/firebase/actions";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export default async function Layout({ children }: { children: React.ReactNode }) {
    const session = await getSessionId();
    if (!session) {
        redirect("/login");
    }
    const user = await getUserById(session);
    

    return (
        <DashBoardLayout profileImage={user?.profileImage === "" ? "/UserProfile/defaultProfile.svg" : user?.profileImage}>

            {children}
        </DashBoardLayout>



    );

}
