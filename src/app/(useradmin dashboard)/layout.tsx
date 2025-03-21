import DashBoardLayout from "@/components/dashboardLayout";
import { getSessionId } from "@/lib/helpers";
import { getUserById } from "@/lib/firebase/actions";
import { redirect } from "next/navigation";


export default async function Layout({ children }: { children: React.ReactNode }) {
    const session = await getSessionId();
    if (session === undefined) {
        redirect("/login");
    }
    const user = await getUserById(session);

    return (
        <DashBoardLayout profileImage={user?.profileImage === "" ? "/UserProfile/defaultProfile.svg" : user?.profileImage}>

            {children}
        </DashBoardLayout>



    );

}
