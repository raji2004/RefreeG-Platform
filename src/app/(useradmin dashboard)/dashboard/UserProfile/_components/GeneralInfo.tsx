"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera } from "lucide-react";
import { User } from "@/lib/type";
import { updateUserById } from "@/lib/firebase/actions";
import { toast } from "react-toastify";
import { uploadImage } from "@/lib/uploadimg";
import { useRouter } from "next/navigation";

export default function GeneralInfo({ user }: { user: User }) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [currentProfileImage, setCurrentProfileImage] = useState(
    user.profileImage
  );
  const [previewImage, setPreviewImage] = useState<File | null>(null);

  const [formValues, setFormValues] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phoneNumber,
    bio: user.bio || "",
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setPreviewImage(event.target.files[0]);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveProfileImageToDB = async (): Promise<string> => {
    try {
      if (!previewImage) {
        return currentProfileImage || "";
      }
      const uploadedImage = await uploadImage(
        previewImage as File,
        "/profileImages"
      );
      return uploadedImage || "";
    } catch (error) {
      console.error("Error saving profile image:", error);
      return "";
    }
  };

  const handleSaveChanges = async () => {
    try {
      await updateUserById(user.id, {
        ...user,
        ...formValues,
        profileImage: await saveProfileImageToDB(),
        phoneNumber: formValues.phone,
        bio: formValues.bio,
      });
      setIsEditing(false);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="bg-[#FAFCFF] w-full flex flex-col px-4 sm:px-6 py-4 sm:py-6 items-center">
      {/* Header Section */}
      <div className="flex justify-between w-full text-sm sm:text-base md:text-lg lg:text-xl font-semibold">
        <span className={isEditing ? "text-gray-500" : "text-black"}>
          General Information
        </span>
        {isEditing && <span className="text-black"> &gt; Edit Profile</span>}
        <Button
          onClick={() => (isEditing ? handleSaveChanges() : setIsEditing(true))}
          variant={isEditing ? "default" : "outline"}
          className="text-xs sm:text-sm lg:text-lg hidden md:block"
        >
          {isEditing ? "Save Changes" : "Edit Profile"}
        </Button>
      </div>

      {/* Profile Image and Form Section */}
      <div className="flex flex-col items-center w-full max-w-5xl p-4 sm:p-6 md:p-8 relative">
        {/* Profile Image */}
        <div className="relative w-32 h-32 sm:w-40 sm:h-40">
          {isEditing ? (
            <Label htmlFor="fileInput" className="cursor-pointer">
              <Image
                src={
                  previewImage
                    ? URL.createObjectURL(previewImage)
                    : currentProfileImage || "/UserProfile/defaultProfile.svg"
                }
                className="w-full h-full rounded-full object-cover"
                alt="Profile Picture"
                width={160}
                height={160}
              />
              <div className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md">
                <Camera size={20} className="w-5 h-5 text-gray-700" />
              </div>
            </Label>
          ) : (
            <Image
              src={currentProfileImage || "/UserProfile/defaultProfile.svg"}
              className="w-full h-full rounded-full object-cover"
              alt="Profile Picture"
              width={160}
              height={160}
              unoptimized
            />
          )}
          <Input
            type="file"
            id="fileInput"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>

        {/* Form Fields */}
        <form className="space-y-3 sm:space-y-4 w-full mt-4">
          <Label className="block text-sm sm:text-lg font-medium">
            First Name
          </Label>
          <Input
            type="text"
            name="firstName"
            readOnly={!isEditing}
            value={formValues.firstName}
            onChange={handleInputChange}
            className={`w-full ${isEditing ? "bg-white" : "bg-gray-100"}`}
          />

          <Label className="block text-sm sm:text-lg font-medium">
            Last Name
          </Label>
          <Input
            type="text"
            name="lastName"
            readOnly={!isEditing}
            value={formValues.lastName}
            onChange={handleInputChange}
            className={`w-full ${isEditing ? "bg-white" : "bg-gray-100"}`}
          />

          <Label className="block text-sm sm:text-lg font-medium">Email</Label>
          <Input
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleInputChange}
            readOnly={!isEditing}
            className={`w-full ${isEditing ? "bg-white" : "bg-gray-100"}`}
          />

          <Label className="block text-sm sm:text-lg font-medium">
            Phone (Optional)
          </Label>
          <Input
            type="text"
            name="phone"
            value={formValues.phone}
            onChange={handleInputChange}
            readOnly={!isEditing}
            className={`w-full ${isEditing ? "bg-white" : "bg-gray-100"}`}
          />

          {/* Bio Field */}
          <Label className="block text-sm sm:text-lg font-medium">Bio</Label>
          {isEditing ? (
            <div className="relative">
              <textarea
                name="bio"
                value={formValues.bio}
                onChange={handleInputChange}
                className="w-full bg-white min-h-[120px] py-2 px-4 text-base border border-gray-300 rounded-lg 
                          focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-y"
                placeholder="Tell us about yourself..."
                style={{ height: "120px" }}
              />
              <div className="absolute bottom-2 right-2 text-xs text-gray-500">
                {formValues.bio.length}/500
              </div>
            </div>
          ) : (
            <div
              className={`w-full p-4 rounded-lg ${
                formValues.bio
                  ? "bg-gray-100 text-gray-800"
                  : "bg-gray-100 text-gray-400 italic"
              }`}
            >
              {formValues.bio || "No bio provided"}
            </div>
          )}
        </form>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4 w-full mt-6">
          {!isEditing && (
            <Button
              onClick={() => router.push(`/profile/${user.id}`)}
              variant="outline"
              className="w-full"
            >
              View Profile
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
