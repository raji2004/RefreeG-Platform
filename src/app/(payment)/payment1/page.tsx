// (Server Component)
import DonationForm from "@/components/DonationForm";
import { Navbar } from "@/components/ui/navbar";

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-3xl mx-auto p-4 space-y-5 bg-white shadow-md rounded-lg my-10">
        <DonationForm />
      </div>
    </div>
  );
}
