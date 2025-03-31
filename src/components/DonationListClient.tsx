"use client";
import React, { useState } from "react";
import { FiStar } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import DonationListCard from "./DonationListCard";

interface Donation {
    name: string;
    amount: string;
    badgeText: string;
}

interface DonationListClientProps {
    donations: Donation[];
    totalCount: number;
}

export default function DonationListClient({ donations, totalCount }: DonationListClientProps) {
    const [showAll, setShowAll] = useState(false);
    const displayedDonations = showAll ? donations : donations.slice(0, 3);

    return (
        <div className="p-6 rounded-lg border border-gray-200 shadow-sm bg-white mt-6">
            {/* Header with icon and title */}
            <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <Image
                        src="/DonationDetail/Graph.svg"
                        width={24}
                        height={24}
                        alt="Graph"
                    />
                </div>
                <h3
                    className="text-xl font-semibold bg-gradient-to-r from-[#EF4387] to-[#0066CC] bg-clip-text text-transparent"
                    style={{
                        backgroundImage:
                            "linear-gradient(227deg, #EF4387 21.93%, #06C 95.78%)",
                    }}
                >
                    {totalCount} people just donated
                </h3>
            </div>

            {/* Divider */}
            <div className="border-b border-gray-200 mb-4"></div>

            {/* Donation list */}
            <div className="space-y-4">
                {displayedDonations.map((donation, index) => (
                    <DonationListCard
                        key={index}
                        name={donation.name}
                        amount={donation.amount}
                        badgeText={donation.badgeText}
                    />
                ))}
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 mt-6 justify-center">
                <Button
                    onClick={() => setShowAll(!showAll)}
                    className="px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-md flex items-center justify-center hover:bg-gray-50"
                >
                    {showAll ? "Show less" : "See all"}{" "}
                    <Image
                        src="/DonationDetail/Eye.svg"
                        width={24}
                        height={24}
                        alt="Eye"
                        className="ml-1"
                    />
                </Button>
                <Button className="px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-md flex items-center justify-center hover:bg-gray-50">
                    See top <FiStar width={24} height={24} className="ml-1" />
                </Button>
            </div>
        </div>
    );
} 