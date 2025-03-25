"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera } from "lucide-react";
import { User } from "@/lib/type";
import { updateUserById } from "@/lib/firebase/actions";
import { promises } from "dns";
import { toast } from "react-toastify";
import { uploadImage } from "@/lib/uploadimg";



export default function GeneralInfo({ user }: { user: User }) {
    const [isEditing, setIsEditing] = useState(false);
    const [currentProfileImage, setCurrentProfileImage] = useState(user.profileImage);
    const [previewImage, setPreviewImage] = useState<File | null>(null);



    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setPreviewImage(event.target.files[0]);
        }
    };

    const [formValues, setFormValues] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phoneNumber,
    });

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({
            ...prev,
            [name]: value,
        }))
    };

    const saveProfileImageToDB = async (): Promise<string> => {
        try {
            if (!previewImage) {
                return currentProfileImage || "";

            }
            console.log(previewImage)
            const uploadedImage = await uploadImage(previewImage as File, "/profileImages");
            if (uploadedImage === undefined || uploadedImage === null) {
                return "";
            }
            console.log("Uploaded Image:", uploadedImage);
            return uploadedImage;
        } catch (error) {
            console.error("Error saving profile image:", error);
            return "";
        }
    };

    const handleSaveChanges = async () => {
        updateUserById(user.id,
            {
                ...user,
                ...formValues,
                profileImage: await saveProfileImageToDB(),
                phoneNumber: formValues.phone
            });
        setIsEditing(false);
    };

    return (
        <div className="bg-[#FAFCFF] w-full flex flex-col px-4 sm:px-6 py-4 sm:py-6 items-center">
            {/* Header Section */}
            <div className="flex justify-between w-full text-sm sm:text-base md:text-lg lg:text-xl font-semibold">
                <span className={isEditing ? "text-gray-500" : "text-black"}>General Information</span>
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
                                    previewImage ? URL.createObjectURL(previewImage) : currentProfileImage || "/UserProfile/editPhoto.svg"
                                }
                                className="w-full h-full rounded-full object-cover"
                                alt="Profile Picture"
                                width={160}
                                height={160}
                            />
                            {/* Camera Icon */}
                            <div className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md">
                                <Camera size={20} className="w-5 h-5 text-gray-700" />
                            </div>
                        </Label>
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
                    <Label className="block text-sm sm:text-lg font-medium">First Name</Label>
                    <Input
                        type="text"
                        name="fullName"

                        readOnly={!isEditing}
                        defaultValue={formValues.firstName}
                        onChange={handleInputChange}
                        className={`w-full ${isEditing ? "bg-white" : "bg-gray-100"}`}
                    />
                    <Label className="block text-sm sm:text-lg font-medium">Last Name</Label>
                    <Input
                        type="text"
                        name="fullName"

                        readOnly={!isEditing}
                        defaultValue={formValues.lastName}
                        onChange={handleInputChange}
                        className={`w-full ${isEditing ? "bg-white" : "bg-gray-100"}`}
                    />

                    <Label className="block text-sm sm:text-lg font-medium">Email</Label>
                    <Input
                        type="email"
                        name="email"
                        defaultValue={formValues.email}
                        onChange={handleInputChange}

                        readOnly={!isEditing}
                        className={`w-full ${isEditing ? "bg-white" : "bg-gray-100"}`}
                    />

                    <Label className="block text-sm sm:text-lg font-medium">Phone Nos (Optional)</Label>
                    <Input
                        type="text"
                        name="phone"
                        defaultValue={formValues.phone}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                        className={`w-full ${isEditing ? "bg-white" : "bg-gray-100"}`}
                    />
                </form>
                <Button
                    onClick={() => (isEditing ? handleSaveChanges() : setIsEditing(true))}
                    variant={isEditing ? "default" : "outline"}
                    className="text-xs sm:text-sm lg:text-lg md:hidden mt-10"
                >
                    {isEditing ? "Save Changes" : "Edit Profile"}
                </Button>
            </div>
        </div>
    );
}