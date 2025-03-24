// components/profile/UserProfile.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { User } from "@/lib/type";
import ProfileNav from "./ProfileNav";
// import { formatDate } from "@/lib/utils";

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
    causesCount = 0,
    userType,
  } = user;

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
          {/* Avatar */}
          <div className="w-20 h-20 rounded-full overflow-hidden mb-3 relative">
            <Image
              src={avatarUrl}
              alt={`${lastName}'s profile picture`}
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Username with verification */}
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-semibold">{firstName || lastName}</h1>
            {isVerified && (
              <span className="text-blue-500" aria-label="Verified account">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-5-5 1.41-1.41L11 14.17l7.59-7.59L20 8l-9 9z"
                  />
                </svg>
              </span>
            )}
          </div>
          {/* User Type Badge */}
          <div className="flex items-center text-gray-600 mb-3">
            <svg
              className="w-4 h-4 mr-1"
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
              className="px-4 py-1 mb-4 text-sm border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
            >
              Edit Profile
            </Link>
          ) : (
            <button className="px-4 py-1 mb-4 text-sm border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
              Follow
            </button>
          )}
          {/* Stats */}
          <div className="flex justify-center w-full gap-6 mb-4">
            <div className="text-center">
              <p className="font-semibold">{causesCount}</p>
              <p className="text-sm text-gray-500">causes</p>
            </div>
            <div className="text-center">
              <p className="font-semibold">{followersCount}</p>
              <p className="text-sm text-gray-500">followers</p>
            </div>
            <div className="text-center">
              <p className="font-semibold">{followingCount}</p>
              <p className="text-sm text-gray-500">following</p>
            </div>
          </div>
          {/* Bio */}
          <div className="w-full text-sm text-gray-700 mb-6">
            <p>{bio || "No bio provided."}</p>
          </div>
        </div>
      </div>

      {/* Profile Navigation */}
      <ProfileNav
        isOwnProfile={isOwnProfile}
        userId={user.id}
        currentUserId={currentUserId}
        firstName={user.firstName} // Pass the first name
        lastName={user.lastName} // Pass the last name
      />
    </div>
  );
};

export default UserProfile;
