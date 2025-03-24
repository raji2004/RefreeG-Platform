// components/profile/ProfileNav.tsx
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { getCausesByUserId } from "@/lib/firebase/actions";
import { getDonationsByUserId } from "@/lib/firebase/actions/donation";
import { useRouter } from "next/navigation";
import { Cause } from "@/lib/type";

interface ProfileNavProps {
  isOwnProfile: boolean;
  userId: string;
  currentUserId?: string;
  firstName?: string; // Add these
  lastName?: string; // Add these
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

  // Define tabs based on view type
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
        // Add other tab data fetching as needed
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
    // Use firstName if available, otherwise fall back to lastName
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

    // Check if there's data to display
    const hasItems =
      activeTab === "Causes"
        ? causes.length > 0
        : activeTab === "Donations"
        ? donations.length > 0
        : false;

    if (!hasItems) {
      return renderEmptyState();
    }

    // Render actual content for each tab
    switch (activeTab) {
      case "Causes":
        return (
          <div className="px-4 py-6">
            {/* Display list of causes */}
            <p className="text-center text-gray-500">
              Causes will be displayed here
            </p>
          </div>
        );
      case "Donations":
        return (
          <div className="px-4 py-6">
            {/* Display list of donations */}
            <p className="text-center text-gray-500">
              Donations will be displayed here
            </p>
          </div>
        );
      case "Drafts":
        return (
          <div className="px-4 py-6">
            {/* Display list of draft causes */}
            <p className="text-center text-gray-500">
              Draft causes will be displayed here
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
