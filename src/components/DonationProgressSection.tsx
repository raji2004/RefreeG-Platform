"use client";

import React, { useState, useEffect } from "react";
import DonationProgress from "@/components/ui/donationProgress";
import { Cause } from "@/lib/type";
import { Button } from "@/components/ui/button";
import { BsShare, BsChevronRight } from "react-icons/bs";
import ShareWrapper from "@/components/ShareWrapper";
import Link from "next/link";
import { getBaseURL } from "@/lib/utils";
import MaticDonationButton from "./ui/MaticDonationButton";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase/config";

interface DonationProgressSectionProps {
  cause: Cause;
  donationAmount: number;
  goalAmount: number;
  progressPercentage: number;
  daysLeft: string;
  stats: string[];
}

export default function DonationProgressSection({
  cause,
  donationAmount: initialDonationAmount,
  goalAmount,
  progressPercentage: initialProgressPercentage,
  daysLeft,
  stats,
}: DonationProgressSectionProps) {
  const [currentDonationAmount, setCurrentDonationAmount] = useState(
    initialDonationAmount
  );
  const [currentProgressPercentage, setCurrentProgressPercentage] = useState(
    initialProgressPercentage
  );

  const baseUrl = getBaseURL();
  const causeUrl = `${baseUrl}/cause/${cause.id}`;

  useEffect(() => {
    const causeRef = doc(db, "causes", cause.id);
    const unsubscribe = onSnapshot(causeRef, (doc) => {
      if (doc.exists()) {
        const causeData = doc.data();
        const newAmount = causeData.raisedAmount;
        const newPercentage = (newAmount / goalAmount) * 100;

        setCurrentDonationAmount(newAmount);
        setCurrentProgressPercentage(newPercentage);
      }
    });

    return () => unsubscribe();
  }, [cause.id, goalAmount]);

  const handleMaticDonationSuccess = (amountInNaira: number) => {
    // Optional: For immediate UI update before Firestore updates
    const newAmount = currentDonationAmount + amountInNaira;
    const newPercentage = (newAmount / goalAmount) * 100;

    setCurrentDonationAmount(newAmount);
    setCurrentProgressPercentage(newPercentage);
  };

  return (
    <div className="p-6 rounded-lg border border-gray-200 shadow-sm bg-white">
      <DonationProgress progressPercentage={currentProgressPercentage} />
      <h2 className="text-2xl font-semibold mt-3">
        ₦{currentDonationAmount.toLocaleString()} raised
      </h2>
      <p className="text-sm mb-4">
        of <span className="font-medium">₦{goalAmount.toLocaleString()}</span>{" "}
        goal
      </p>

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
            Donate in Naira <BsChevronRight className="ml-2" size={16} />
          </Button>
        </Link>

        <div className="border-t border-gray-200 pt-3 mt-2">
          <p className="text-sm text-gray-800 text-center mb-2">
            Or donate with cryptocurrency
          </p>
          <MaticDonationButton
            causeId={cause.id}
            onDonationSuccess={handleMaticDonationSuccess}
          />
        </div>
      </div>
    </div>
  );
}
