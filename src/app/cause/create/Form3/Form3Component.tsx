"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useFormContext } from "react-hook-form";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"; // Adjust the path as needed
import { UploadedImage } from "@/components/ListacauseForm";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "@/lib/firebase/config"; // Adjust the import path

export const Form3 = () => {
  const { setValue, setError, clearErrors } = useFormContext();
  const [media, setMedia] = useState<UploadedImage | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [showGuidelines, setShowGuidelines] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load saved media on mount (if any)
  useEffect(() => {
    const savedMedia = localStorage.getItem("uploadedImage");
    if (savedMedia) {
      const parsedMedia = JSON.parse(savedMedia);
      setMedia(parsedMedia);
      setValue("uploadedImage", parsedMedia);
    }
  }, [setValue]);

  // Update react-hook-form field whenever media changes
  useEffect(() => {
    setValue("uploadedImage", media);
  }, [media, setValue]);

  const handleMediaChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUploadError(null);
    clearErrors("uploadedImage");

    // If a media already exists, delete it before uploading the new one.
    if (media && media.path) {
      const oldImageRef = ref(storage, media.path);
      try {
        await deleteObject(oldImageRef);
        console.log("Old image successfully deleted from Firebase Storage.");
      } catch (error) {
        console.error("Error deleting old image:", error);
      }
      setMedia(null);
      localStorage.removeItem("uploadedImage");
      setValue("uploadedImage", null);
    }

    if (!event.target.files || event.target.files.length === 0) {
      console.log("No file selected");
      return;
    }

    const file = event.target.files[0];
    console.log("Selected file:", file);
    
    // Create a temporary object URL for preview
    const previewUrl = URL.createObjectURL(file);
    
    // Initialize media object immediately with 0% progress
    const initialMedia: UploadedImage = {
      src: previewUrl,
      name: file.name,
      size: Math.round(file.size / 1024),
      progress: 0,
      type: file.type,
    };
    
    // Set media immediately to show progress bar
    setMedia(initialMedia);
  
    // Define limits
    const maxImageSize = 5 * 1024 * 1024; // 5MB

    // Allowed image types only
    const allowedImageTypes = ["image/jpeg", "image/png"];

    // Validate file: only allow images
    if (!file.type.startsWith("image/")) {
      const errMsg = "Unsupported file type. Please upload an image.";
      console.log("Validation error:", errMsg);
      setUploadError(errMsg);
      setError("uploadedImage", { type: "manual", message: errMsg });
      return;
    }

    if (!allowedImageTypes.includes(file.type)) {
      const errMsg = "Invalid image format. Please upload a JPEG or PNG image.";
      console.log("Validation error:", errMsg);
      setUploadError(errMsg);
      setError("uploadedImage", { type: "manual", message: errMsg });
      return;
    }

    if (file.size > maxImageSize) {
      const errMsg = "Image size exceeds the maximum allowed size of 5MB.";
      console.log("Validation error:", errMsg);
      setUploadError(errMsg);
      setError("uploadedImage", { type: "manual", message: errMsg });
      return;
    }

    // Upload file to Firebase Storage
    const fileName = `${Date.now()}-${file.name}`;
    const storagePath = `causes/${fileName}`;
    const storageRef = ref(storage, storagePath);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
        setMedia((prev) => (prev ? { ...prev, progress } : null));
      },
      (error) => {
        console.error("Upload failed:", error);
        setUploadError("Upload failed. Please try again.");
      },
      async () => {
        // Retrieve download URL after successful upload
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        console.log("File available at:", downloadURL);

        const updatedMedia: UploadedImage = {
          src: downloadURL,
          name: file.name,
          size: Math.round(file.size / 1024),
          progress: 100,
          type: file.type,
          path: storagePath,
        };

        setMedia(updatedMedia);
        setValue("uploadedImage", updatedMedia);
        localStorage.setItem("uploadedImage", JSON.stringify(updatedMedia));
      }
    );
  };

  const handleRemoveMedia = async () => {
    if (media && media.path) {
      const imageRef = ref(storage, media.path);
      try {
        await deleteObject(imageRef);
        console.log("Image successfully deleted from Firebase Storage.");
      } catch (error) {
        console.error("Error deleting image from Firebase Storage:", error);
      }
    }
    setMedia(null);
    localStorage.removeItem("uploadedImage");
    setValue("uploadedImage", null);
  };

  const toggleGuidelines = () => {
    setShowGuidelines((prev) => !prev);
  };

  return (
    <div className="mt-4">
      <h2 className="text-[#2b2829] text-xl font-medium font-montserrat">
        Bring Your Cause to Life with Media
      </h2>
      <p className="text-[#2b2829] text-sm font-normal font-montserrat mb-2">
        An image can be worth a thousand words. Add a photo that showcases the real
        people, places, or situations your cause supports.
      </p>
      <FormItem>
        <FormLabel>Upload Image</FormLabel>
        <FormControl>
          <>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className={`border-dashed border-2 border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 ${
                media ? "p-0" : "py-10 px-48"
              }`}
            >
              {media ? (
                media.type.startsWith("video/") ? (
                  <video
                    src={media.src}
                    controls
                    className="object-cover rounded-lg"
                    width={200}
                    height={200}
                  />
                ) : (
                  <div className="relative w-[200px] h-[112.5px] z-0">
                    <Image
                      src={media.src}
                      alt="Uploaded preview"
                      fill
                      className="object-cover rounded-lg"
                      style={{ zIndex: 0 }}
                    />
                  </div>
                )
              ) : (
                <Image
                  src="/List_a_cause/Upload_to_Cloud.png"
                  alt="Upload"
                  width={70}
                  height={70}
                />
              )}
            </button>
            <input
              ref={fileInputRef}
              id="media-upload"
              type="file"
              accept="image/*"
              onChange={handleMediaChange}
              className="hidden"
            />
          </>
        </FormControl>
        <FormMessage />
        {uploadError && (
          <p className="text-red-500 text-sm mt-2">{uploadError}</p>
        )}
      </FormItem>

      <div className="relative mt-4">
        <button onClick={toggleGuidelines} className="flex gap-1 items-center">
          <p className="text-[#2b2829] text-[12px] font-normal font-montserrat underline">
            To ensure the best experience, please follow these guidelines when
            uploading images
          </p>
          <Image
            src="/List_a_cause/chevron-down-4.svg"
            alt="Toggle Guidelines"
            width={24}
            height={24}
          />
        </button>
        <p className="text-[#2b2829] text-sm font-normal font-montserrat mt-10">
          Note: Upload images that capture the spirit of your cause—a smile, a community, a place in need.
        </p>
        {showGuidelines && (
          <div className="absolute left-0 mt-2 p-4 bg-white border border-gray-300 shadow-lg z-10">
            <p className="text-[12px] text-[#2b2829] font-montserrat">
              <strong>Images:</strong> Maximum size of 5 MB each
              <br />
              Recommended format: JPEG or PNG
              <br />
              Ideal resolution: 1920 x 1080 pixels
            </p>
          </div>
        )}
      </div>

      {media && (
        <div className="mt-4">
          <div className="border block w-2/4 border-[#b5b3b3] py-3 px-2 mb-2">
            <div className="flex items-center justify-between">
              <div className="flex gap-2 items-center min-w-0">
                <Image
                  src="/List_a_cause/file.svg"
                  alt="File icon"
                  width={30}
                  height={30}
                  className="flex-shrink-0"
                />
                <div className="flex flex-col flex-grow min-w-0">
                  <p className="text-[#363939] text-xs font-normal truncate">
                    {media.name}
                  </p>
                  <p className="text-[#b5b3b3] text-xs">{media.size} KB</p>
                </div>
              </div>
              {media.progress >= 100 && (
                <span className="justify-end">
                  <Image
                    src="/List_a_cause/check.svg"
                    alt="Check"
                    width={24}
                    height={24}
                  />
                </span>
              )}
            </div>
            {media.progress < 100 && (
              <div className="flex">
                <div className="w-full mt-2 bg-gray-200 rounded-lg overflow-hidden">
                  <div
                    className="bg-blue-500 h-4 transition-all duration-200"
                    style={{ width: `${media.progress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
          <div className="border block w-2/4 border-[#b5b3b3] py-3 px-2">
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <Image
                  src="/List_a_cause/file.svg"
                  alt="File icon"
                  width={30}
                  height={30}
                  style={{ width: "30px", height: "30px" }}
                />
                <span>
                  <p className="text-[#363939] text-md md:text-lg font-normal">
                    {media.name}
                  </p>
                  <p className="text-[#b5b3b3] text-xs">{media.size} KB</p>
                </span>
              </div>
              <button
                onClick={handleRemoveMedia}
                className="flex-shrink-0 focus:outline-none"
              >
                <Image
                  src="/List_a_cause/trash-2.svg"
                  alt="Delete icon"
                  width={24}
                  height={24}
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
