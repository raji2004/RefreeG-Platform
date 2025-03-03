import DashBoardLayout from "@/components/dashboardLayout";


export default async function Layout({ children }: { children: React.ReactNode }) {

    return (
        <DashBoardLayout profileImage={"/UserProfile/defaultProfile.svg"}>
        
            {children}
        </DashBoardLayout>



    );

}
