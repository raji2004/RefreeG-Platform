"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera } from "lucide-react";

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

    const [formValues, setFormValues] = useState({
        fullName: "Angulu Adeiza Julius",
        email: "personal@gmail.com",
        phone: "+234 567 890 1234",
    });

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({
            ...prev,
            [name]: value,
        }))
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
                    <Label className="block text-sm sm:text-lg font-medium">Full Name</Label>
                    <Input
                        type="text"
                        name="fullName"
                        defaultValue="Angulu Adeiza Julius"
                        readOnly={!isEditing}
                        value={formValues.fullName}
                        onChange={handleInputChange}
                        className={`w-full ${isEditing ? "bg-white" : "bg-gray-100"}`}
                    />

                    <Label className="block text-sm sm:text-lg font-medium">Email</Label>
                    <Input
                        type="email"
                        name="email"
                        value={formValues.email}
                        onChange={handleInputChange}
                        defaultValue="personal@gmail.com"
                        readOnly={!isEditing}
                        className={`w-full ${isEditing ? "bg-white" : "bg-gray-100"}`}
                    />

                    <Label className="block text-sm sm:text-lg font-medium">Phone Nos (Optional)</Label>
                    <Input
                        type="text"
                        name="phone"
                        value={formValues.phone}
                        onChange={handleInputChange}
                        defaultValue="+234 567 890 1234"
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