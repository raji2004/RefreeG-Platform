// (Server Component)
import DonationForm from "@/components/DonationForm";
import { Navbar } from "@/components/ui/navbar";
import { getSessionId } from "@/lib/helpers";
import { redirect } from "next/navigation";
import { getCauseById, getUserById } from "@/lib/firebase/actions";

export default async function DonatePage({ params }: { params: { cause_id: string } }) {
  const sessionId= await getSessionId()
  if (!sessionId) redirect('/login')
  const user = await getUserById(sessionId)
  if (!user) redirect('/login')
  const cause = await getCauseById(params.cause_id)
  if (!cause) redirect('/')
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar userSession={!!sessionId} profile={user?.profileImage === "" ? undefined : user?.profileImage} />
            <div className="max-w-3xl mx-auto p-4 space-y-5 bg-white shadow-md rounded-lg my-10">
                <DonationForm cause={cause} user={user} />
            </div>
        </div>
    );
}
