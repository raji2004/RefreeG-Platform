"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface GeneralInfoProps {
  profileImage: string;
}

export default function GeneralInfo({ profileImage }: GeneralInfoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentProfileImage, setCurrentProfileImage] = useState(profileImage);
  const [previewImage, setPreviewImage] = useState<File | null>(null);

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await fetch("/api/profile/getProfileImage");
        const data = await response.json();
        if (data.profileImage) setCurrentProfileImage(data.profileImage);
      } catch (error) {
        console.error("Failed to fetch profile image:", error);
      }
    };
    fetchProfileImage();
  }, []);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setPreviewImage(event.target.files[0]);
    }
  };

  const saveProfileImageToDB = async (imageUrl: string) => {
    try {
      const response = await fetch("/api/profile/updateImage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profileImage: imageUrl }),
      });
      if (!response.ok) throw new Error("Failed to save image");
    } catch (error) {
      console.error("Error saving profile image:", error);
    }
  };

  const handleSaveChanges = async () => {
    if (previewImage) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const imageUrl = reader.result as string;
        setCurrentProfileImage(imageUrl);
        await saveProfileImageToDB(imageUrl);
      };
      reader.readAsDataURL(previewImage);
    }
    setIsEditing(false);
  };

  return (
    <div className="bg-[#FAFCFF] w-full flex flex-col px-4 sm:px-6 py-4 sm:py-6 items-center">
      <div className="flex justify-between w-full text-sm sm:text-base md:text-lg lg:text-xl font-semibold">
        <span className={isEditing ? "text-gray-500" : "text-black"}>General Information</span>
        {isEditing && <span className="text-black"> &gt; Edit Profile</span>}
        <button
          onClick={() => (isEditing ? handleSaveChanges() : setIsEditing(true))}
          className={`border rounded p-2 sm:p-3 lg:text-lg text-xs sm:text-sm transition-all duration-300 ${
            isEditing ? "bg-blue-600 text-white border-blue-600" : "border-[#036] text-[#036]"
          }`}
        >
          {isEditing ? "Save Changes" : "Edit Profile"}
        </button>
      </div>

      <div className="flex flex-col items-center w-full max-w-5xl p-4 sm:p-6 md:p-8 relative">
        <div className="relative w-32 h-32 sm:w-40 sm:h-40">
          {isEditing ? (
            <label htmlFor="fileInput" className="cursor-pointer">
              <Image
                src={
                  previewImage ? URL.createObjectURL(previewImage) : currentProfileImage || "/UserProfile/editPhoto.svg"
                }
                className="w-full h-full rounded-full object-cover"
                alt="Profile Picture"
                width={160}
                height={160}
              />
            </label>
          ) : (
            <Image
              src={currentProfileImage || "/UserProfile/editPhoto.svg"}
              className="w-full h-full rounded-full object-cover"
              alt="Profile Picture"
              width={160}
              height={160}
              unoptimized
            />
          )}
          <input type="file" id="fileInput" accept="image/*" className="hidden" onChange={handleImageChange} />
        </div>

        {isEditing && previewImage && (
          <div className="mt-4">
            <span className="text-sm sm:text-lg">Hint: Click within image to edit.</span>
            <Image
              src={URL.createObjectURL(previewImage)}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover mt-2"
              alt="Selected Image Preview"
              width={80}
              height={80}
            />
          </div>
        )}

        <form className="space-y-3 sm:space-y-4 w-full mt-4">
          <label className="block text-sm sm:text-lg font-medium">Full Name</label>
          <input
            type="text"
            defaultValue="Angulu Adeiza Julius"
            readOnly={!isEditing}
            className={`w-full border outline-none p-2 rounded-md h-12 sm:h-16 transition-all duration-300 ${
              isEditing ? "bg-white border-gray-400 text-black" : "bg-gray-100 text-gray-600 border-[#E3E3E3]"
            }`}
          />

          <label className="block text-sm sm:text-lg font-medium">Email</label>
          <input
            type="email"
            defaultValue="personal@gmail.com"
            readOnly={!isEditing}
            className={`w-full border outline-none p-2 rounded-md h-12 sm:h-16 transition-all duration-300 ${
              isEditing ? "bg-white border-gray-400 text-black" : "bg-gray-100 text-gray-600 border-[#E3E3E3]"
            }`}
          />

          <label className="block text-sm sm:text-lg font-medium">Phone Nos (Optional)</label>
          <input
            type="text"
            defaultValue="+234 567 890 1234"
            readOnly={!isEditing}
            className={`w-full border outline-none p-2 rounded-md h-12 sm:h-16 transition-all duration-300 ${
              isEditing ? "bg-white border-gray-400 text-black" : "bg-gray-100 text-gray-600 border-[#E3E3E3]"
            }`}
          />
        </form>
      </div>
    </div>
  );
}
