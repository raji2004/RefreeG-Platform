"use client";

import { useEffect, useState } from "react";
import { donationHistoryColumn } from "@/components/columns";
import { DataTable } from "@/components/ui/data-table";
import { getSessionId } from "@/lib/helpers";
import { getUserDonations } from "@/lib/firebase/actions/donation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { DonationHistory } from "@/lib/type";

interface Donation {
  id: string;
  [key: string]: any;
}

// Simple client-side cache implementation
const donationCache = new Map<string, Donation[]>();

const EmptyState = ({ onDonateClick }: { onDonateClick: () => void }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-10">
      <Image
        src="/donation_flow/empty.png"
        alt="No donations yet"
        width={400}
        height={400}
        className="object-contain"
        priority
      />
      <p className="text-xl text-center">You are yet to donate to any cause</p>
      <Button
        className="bg-blue-600 hover:bg-blue-700 py-6 gap-2"
        onClick={onDonateClick}
      >
        Make a Donation <ChevronRight size={20} />
      </Button>
    </div>
  );
};

const LoadingState = () => (
  <div className="flex items-center justify-center h-full">
    <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
  </div>
);

export default function Donations() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        setLoading(true);
        const sessionId = await getSessionId();

        // Check cache first
        const cacheKey = `donations-${sessionId}`;
        if (donationCache.has(cacheKey)) {
          setDonations(donationCache.get(cacheKey)!);
          return;
        }

        const response = await getUserDonations({ userId: sessionId! });
        const { data } = response;
        const fetchedDonations = data?.donations || [];

        // Update cache and state
        donationCache.set(cacheKey, fetchedDonations);
        setDonations(fetchedDonations);
      } catch (err) {
        console.error("Error fetching donations:", err);
        setError("Failed to load donations. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();

    // Cleanup function
    return () => {
      // Optional: Clear loading state if component unmounts
      setLoading(false);
    };
  }, []);

  const handleDonateClick = () => {
    router.push("/");
  };

  if (loading) return <LoadingState />;
  if (error) return <div className="text-center p-8 text-red-500">{error}</div>;

  return (
    <div className="h-full">
      {donations.length === 0 ? (
        <EmptyState onDonateClick={handleDonateClick} />
      ) : (
        <DataTable
          columns={donationHistoryColumn}
          data={donations as unknown as DonationHistory[]}
          filterColumn="cause"
          filterColumnPlaceholder="Search Cause"
        />
      )}
    </div>
  );
}
