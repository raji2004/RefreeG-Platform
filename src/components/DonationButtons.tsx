// components/DonationButtons.tsx
"use client";

import Link from "next/link";
import { BsShare, BsChevronRight } from "react-icons/bs";
import MaticDonationButton from "./ui/MaticDonationButton";
import ShareWrapper from "./ShareWrapper";

interface DonationButtonsProps {
  causeId: string;
  causeUrl: string;
  causeTitle: string;
}

export default function DonationButtons({
  causeId,
  causeUrl,
  causeTitle,
}: DonationButtonsProps) {
  return (
    <div className="flex flex-wrap gap-4 mt-4">
      <ShareWrapper url={causeUrl} title={causeTitle}>
        <button className="flex items-center bg-white border border-gray-400 px-6 py-3 rounded-md shadow-sm hover:bg-gray-300 transition-colors duration-300">
          Share <BsShare className="ml-2" />
        </button>
      </ShareWrapper>

      {/* Naira Donation Button */}
      <Link href={`/cause/${causeId}/payment`} className="flex-1 min-w-[200px]">
        <button className="w-full bg-[#433E3F] flex items-center justify-center text-white px-6 py-3 rounded-md shadow-sm hover:bg-gray-700 transition-colors duration-300">
          Donate in Naira <BsChevronRight className="ml-2" />
        </button>
      </Link>

      {/* MATIC Donation Button */}
      <div className="flex-1 min-w-[200px]">
        <MaticDonationButton causeId={causeId} />
      </div>
    </div>
  );
}
