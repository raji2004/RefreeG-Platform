// components/profile/ProfileNav.tsx
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getCausesByUserId } from "@/lib/firebase/actions";
import { getDonationsByUserId } from "@/lib/firebase/actions/donation";
import { useRouter } from "next/navigation";
import { Cause } from "@/lib/type";
import { getDaysLeft } from "@/lib/utils";

interface ProfileNavProps {
  isOwnProfile: boolean;
  userId: string;
  currentUserId?: string;
  firstName?: string;
  lastName?: string;
}

const EmptyStateIllustration = () => (
  <div className="flex justify-center mb-4">
    <Image src="/nullCauses.svg" alt="No items yet" width={140} height={140} />
  </div>
);

const ProfileNav: React.FC<ProfileNavProps> = ({
  isOwnProfile,
  userId,
  firstName,
  lastName,
}) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>("Causes");
  const [isLoading, setIsLoading] = useState(false);
  const [causes, setCauses] = useState<Cause[]>([]);
  const [donations, setDonations] = useState([]);

  const tabOptions = isOwnProfile
    ? ["Causes", "Donations"]
    : ["Causes", "Donations"];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (activeTab === "Causes") {
          const fetchedCauses = await getCausesByUserId(userId);
          setCauses(fetchedCauses || []);
        } else if (activeTab === "Donations") {
          const fetchedDonations = await getDonationsByUserId(userId);
          setDonations(fetchedDonations || []);
        }
      } catch (error) {
        console.error(`Error fetching ${activeTab.toLowerCase()}:`, error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [activeTab, userId]);

  const handleExplore = () => {
    router.push("/");
  };

  const handleStartCause = () => {
    router.push("/cause/create");
  };

  const getEmptyStateMessage = () => {
    const userName = firstName || lastName || "This user";
    const name = isOwnProfile ? "You" : userName;

    if (activeTab === "Causes") {
      return isOwnProfile
        ? "You haven't started any causes yet. Start your first cause to make an impact!"
        : `It looks like ${name} hasn't started a cause yet. Stay tuned for their first impact story, or explore other causes making a difference! 💙`;
    } else if (activeTab === "Donations") {
      return isOwnProfile
        ? "You haven't made any donations yet. Explore causes to support!"
        : `It looks like ${name} hasn't donated to a cause yet. Stay tuned for their first impact story, or explore other causes making a difference! 💙`;
    }
    return "No items to display.";
  };

  const renderEmptyState = () => (
    <div className="py-12 px-6">
      <EmptyStateIllustration />
      <div className="text-center">
        <h3 className="text-lg font-medium mb-2">No {activeTab} Yet</h3>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          {getEmptyStateMessage()}
        </p>
        {isOwnProfile && activeTab === "Causes" ? (
          <button
            onClick={handleStartCause}
            className="px-6 py-2 bg-blue-500 text-white rounded-full flex items-center mx-auto"
          >
            <span>Start a new cause</span>
            <svg
              className="ml-1 w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        ) : (
          <button
            onClick={handleExplore}
            className="px-6 py-2 bg-blue-500 text-white rounded-full flex items-center mx-auto"
          >
            <span>Donate Now</span>
            <svg
              className="ml-1 w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );

  const renderCauseCard = (cause: Cause) => {
    const progressPercentage = Math.round(
      (cause.raisedAmount / cause.goalAmount) * 100
    );
    const daysLeft = getDaysLeft(cause.deadline);

    return (
      <div
        key={cause.id}
        className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
      >
        <Link href={`/cause/${cause.id}`} className="flex-grow">
          <div className="relative aspect-video bg-gray-100">
            {cause.uploadedImage && (
              <Image
                src={cause.uploadedImage.src}
                alt={cause.causeTitle}
                fill
                className="object-cover"
              />
            )}
          </div>
          <div className="p-4 flex-grow">
            <h3 className="font-semibold text-lg mb-1 line-clamp-1">
              {cause.causeTitle}
            </h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {cause.description}
            </p>

            <div className="mb-2">
              <div className="flex justify-between text-sm mb-1">
                <span>Raised: {progressPercentage}%</span>
                <span>{daysLeft}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>

            <div className="flex justify-between items-center mb-3">
              <span className="font-medium">
                ₦{cause.raisedAmount.toLocaleString()}
              </span>
              <span className="text-sm text-gray-500">
                of ₦{cause.goalAmount.toLocaleString()}
              </span>
            </div>
          </div>
        </Link>

        {/* Donate Button - outside the Link to avoid nested links */}
        <div className="px-4 pb-4">
          <Link
            href={`/cause/${cause.id}`}
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-4 rounded-lg transition-colors"
          >
            Donate Now
          </Link>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="py-12 flex justify-center">
          <svg
            className="animate-spin h-10 w-10 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      );
    }

    const hasItems =
      activeTab === "Causes"
        ? causes.length > 0
        : activeTab === "Donations"
        ? donations.length > 0
        : false;

    if (!hasItems) {
      return renderEmptyState();
    }

    switch (activeTab) {
      case "Causes":
        return (
          <div className="px-4 py-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {causes.map(renderCauseCard)}
          </div>
        );
      case "Donations":
        return (
          <div className="px-4 py-6">
            <p className="text-center text-gray-500">
              Donations will be displayed here
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-200">
        {tabOptions.map((tab) => (
          <button
            key={tab}
            className={`flex-1 py-4 text-center font-medium ${
              activeTab === tab
                ? "text-black border-b-2 border-black"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {renderContent()}
    </div>
  );
};

export default ProfileNav;
