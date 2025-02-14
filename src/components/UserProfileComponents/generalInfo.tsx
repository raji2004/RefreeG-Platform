"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface GeneralInfoProps {
  profileImage: string;
  setProfileImage: React.Dispatch<React.SetStateAction<string>>;
}

export default function GeneralInfo({ profileImage, setProfileImage }: GeneralInfoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState<File | null>(null); // To hold selected image for preview

  // Check if there's a profile image in localStorage
  useEffect(() => {
    const savedProfileImage = localStorage.getItem('profileImage');
    if (savedProfileImage) {
      setProfileImage(savedProfileImage);
    }
  }, []);

  // Handle image change
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setPreviewImage(file); // Set the selected image for preview
    }
  };

  // Save the profile image after editing
  const handleSaveChanges = () => {
    if (previewImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setProfileImage(imageUrl); // Update profile image with selected image
        localStorage.setItem('profileImage', imageUrl); // Save to localStorage
      };
      reader.readAsDataURL(previewImage); // Convert file to base64 URL
    }
    setIsEditing(false); // Switch off edit mode after saving
  };

  return (
    <div className="bg-[#FAFCFF] w-full flex flex-col px-6 py-4 items-center">
      {/* Header Section */}
      <div className="flex justify-between w-full">
        <div className="text-2xl font-semibold">
          <span className={isEditing ? "text-gray-500" : "text-black"}>
            General Information
          </span>
          {isEditing && <span className="text-black"> &gt; Edit Profile</span>}
        </div>
        <div>
          <button
            onClick={() => {
              if (isEditing) {
                handleSaveChanges(); // Save changes when in edit mode
              } else {
                setIsEditing(true); // Enable editing mode
              }
            }}
            className={`border rounded p-2 text-lg transition-all duration-300 
              ${isEditing ? "bg-blue-600 text-white border-blue-600" : "border-[#036] text-[#036]"}`}
          >
            {isEditing ? "Save Changes" : "Edit Profile"}
          </button>
        </div>
      </div>

      {/* Profile Content */}
      <div className="flex flex-col items-center w-full max-w-5xl p-6 relative">
        {/* Profile Image */}
        <div className="relative w-40 h-40">
          {/* Only allow image change in edit mode */}
          {isEditing ? (
            <label htmlFor="fileInput" className="cursor-pointer">
              <Image
                src={previewImage ? URL.createObjectURL(previewImage) : "/UserProfile/editPhoto.svg"}
                className="w-40 h-40 rounded-full object-cover"
                alt="Profile Picture"
                width={160}
                height={160}
              />
            </label>
          ) : (
            <Image
              src={profileImage || "/UserProfile/defaultProfile.svg"} // Fallback to default image if no profile image is found
              className="w-40 h-40 rounded-full object-cover"
              alt="Profile Picture"
              width={160}
              height={160}
            />
          )}

          <input
            type="file"
            id="fileInput"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>

        {/* Display selected image preview when editing */}
        {isEditing && previewImage && (
          <div className="mt-4">
            <span className="text-lg">Hint: Click within image to edit.</span>
            <Image
              src={URL.createObjectURL(previewImage)}
              className="w-20 h-20 rounded-full object-cover hidden mt-2"
              alt="Selected Image Preview"
              width={80}
              height={80}
            />
          </div>
        )}

        <form className="space-y-4 w-full mt-4">
          <label className="block text-lg font-medium">Full Name</label>
          <input
            type="text"
            defaultValue="Angulu Adeiza Julius"
            readOnly={!isEditing}
            className={`w-full border outline-none p-2 rounded-md h-16 transition-all duration-300 
              ${isEditing ? "bg-white border-gray-400 text-black" : "bg-gray-100 text-gray-600 border-[#E3E3E3]"}`}
          />

          <label className="block text-lg font-medium">Email</label>
          <input
            type="email"
            defaultValue="personal@gmail.com"
            readOnly={!isEditing}
            className={`w-full border outline-none p-2 rounded-md h-16 transition-all duration-300 
              ${isEditing ? "bg-white border-gray-400 text-black" : "bg-gray-100 text-gray-600 border-[#E3E3E3]"}`}
          />

          <label className="block text-lg font-medium">Phone Nos (Optional)</label>
          <input
            type="text"
            defaultValue="+234 567 890 1234"
            readOnly={!isEditing}
            className={`w-full border outline-none p-2 rounded-md h-16 transition-all duration-300 
              ${isEditing ? "bg-white border-gray-400 text-black" : "bg-gray-100 text-gray-600 border-[#E3E3E3]"}`}
          />
        </form>
      </div>
    </div>
  );
}

