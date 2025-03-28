// components/UserProfile.tsx
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { User } from "@/lib/type";
import ProfileNav from "./ProfileNav";
import { getCausesByUserId } from "@/lib/firebase/actions";
import { VerifiedBadge } from "./ui/VerifiedBadge";

interface UserProfileProps {
  user: User;
  isOwnProfile: boolean;
  currentUserId?: string;
}

const UserProfile: React.FC<UserProfileProps> = ({
  user,
  isOwnProfile,
  currentUserId,
}) => {
  const {
    firstName,
    lastName,
    profileImage,
    bio,
    isVerified,
    followersCount = 0,
    followingCount = 0,
    causesCount: initialCausesCount = 0,
    userType = "individual",
  } = user;

  // State for causes count with initial value from props
  const [causesCount, setCausesCount] = useState(initialCausesCount);

  // Fetch causes count on component mount (for real-time updates)
  useEffect(() => {
    const fetchCausesCount = async () => {
      try {
        const causes = await getCausesByUserId(user.id);
        setCausesCount(causes.length);
      } catch (error) {
        console.error("Error fetching causes count:", error);
      }
    };

    fetchCausesCount();
  }, [user.id]);

  // Determine the correct label for causes
  const causesLabel = causesCount === 1 ? "cause" : "causes";

  // Default avatar if no photoURL is provided
  const avatarUrl = profileImage || "/images/default-avatar.png";

  return (
    <div className="max-w-screen-md mx-auto bg-white rounded-lg shadow-sm">
      {/* Header with back button */}
      <div className="p-4 flex items-center">
        <Link
          href="/"
          className="flex items-center text-gray-600 hover:text-gray-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span className="ml-2 text-sm">Go back</span>
        </Link>
      </div>

      {/* Profile Information */}
      <div className="px-6">
        <div className="flex flex-col items-center">
          {/* Larger Avatar - Updated size */}
          <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden mb-4 relative border-4 border-white shadow-md">
            <Image
              src={avatarUrl}
              alt={`${lastName}'s profile picture`}
              width={160}
              height={160}
              className="w-full h-full object-cover"
              priority
            />
          </div>

          {/* Updated Username with verification */}
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-2xl font-bold">
              {[firstName, lastName].filter(Boolean).join(" ")}
            </h1>
            {isVerified && <VerifiedBadge className="w-6 h-6" />}
          </div>

          {/* User Type Badge */}
          <div className="flex items-center text-gray-600 mb-4">
            <svg
              className="w-5 h-5 mr-1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {userType === "individual" ? (
                <>
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </>
              ) : (
                <>
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="12" cy="10" r="3" />
                  <path d="M7 21v-2a5 5 0 0 1 10 0v2" />
                </>
              )}
            </svg>
            <span className="text-sm capitalize">{userType}</span>
          </div>

          {/* Follow Button or Edit Profile */}
          {isOwnProfile ? (
            <Link
              href="/dashboard/UserProfile"
              className="px-6 py-2 mb-6 text-sm font-medium border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
            >
              Edit Profile
            </Link>
          ) : (
            <button className="px-6 py-2 mb-6 text-sm font-medium border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
              Follow
            </button>
          )}

          {/* Stats */}
          <div className="flex justify-center w-full gap-8 mb-6">
            <div className="text-center">
              <p className="text-xl font-bold">{causesCount}</p>
              <p className="text-sm text-gray-800">{causesLabel}</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold">{followersCount}</p>
              <p className="text-sm text-gray-800">followers</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold">{followingCount}</p>
              <p className="text-sm text-gray-800">following</p>
            </div>
          </div>

          {/* Bio */}
          <div className="w-full text-base text-gray-700 mb-8 px-4 text-center">
            <p>{bio || "No bio provided."}</p>
          </div>
        </div>
      </div>

      {/* Profile Navigation */}
      <ProfileNav
        isOwnProfile={isOwnProfile}
        userId={user.id}
        currentUserId={currentUserId}
        firstName={user.firstName}
        lastName={user.lastName}
      />
    </div>
  );
};

export default UserProfile;
