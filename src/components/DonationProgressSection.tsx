import React from "react";
import DonationProgress from "@/components/ui/donationProgress";
import { Cause } from "@/lib/type";
import { Button } from "@/components/ui/button";
import { BsShare, BsChevronRight } from "react-icons/bs";
import ShareWrapper from "@/components/ShareWrapper";
import Link from "next/link";
import { getBaseURL } from "@/lib/utils";


interface DonationProgressSectionProps {
  cause: Cause;
  donationAmount: number;
  goalAmount: number;
  progressPercentage: number;
  daysLeft: string;
  stats: string[];
}

async function DonationProgressSection({
  cause,
  donationAmount,
  goalAmount,
  progressPercentage,
  daysLeft,
  stats,
}: DonationProgressSectionProps) {
  const baseUrl = await getBaseURL()
  const causeUrl = `${baseUrl}/cause/${cause.id}`;

  return (
    <div className="p-6 rounded-lg border border-gray-200 shadow-sm bg-white">
      <DonationProgress progressPercentage={progressPercentage} />
      <h2 className="text-2xl font-semibold mt-3">
        ₦{donationAmount.toLocaleString()} raised
      </h2>
      <p className="text-sm mb-4">
        of <span className="font-medium">₦{goalAmount.toLocaleString()}</span>{" "}
        goal
      </p>

      {/* Statistics on donations */}
      <div className="flex gap-2 mb-5">
        {stats.map((stat) => (
          <div
            key={stat}
            className="px-3 py-1 rounded-full border border-gray-300 text-sm"
          >
            {stat}
          </div>
        ))}
      </div>

      {/* Buttons for sharing and donating */}
      <div className="flex flex-col gap-3">
        <ShareWrapper url={causeUrl} title={cause.causeTitle}>
          <Button
            variant="outline"
            className="w-full py-3 text-blue-600 border-blue-600 hover:bg-blue-50 font-medium flex items-center justify-center"
          >
            Share <BsShare className="ml-2" size={16} />
          </Button>
        </ShareWrapper>
        <Link href={`/cause/${cause.id}/payment`}>
          <Button className="w-full py-3 bg-blue-600 text-white hover:bg-blue-700 font-medium flex items-center justify-center">
            Donate <BsChevronRight className="ml-2" size={16} />
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default DonationProgressSection;
