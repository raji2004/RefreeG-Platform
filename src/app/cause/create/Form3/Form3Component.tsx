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
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
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

  const handleMediaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    clearErrors("uploadedImage");
  
    if (!event.target.files || event.target.files.length === 0) {
      console.log("No file selected");
      return;
    }
  
    const file = event.target.files[0];
    console.log("Selected file:", file);
  
    // Define limits
    const maxImageSize = 5 * 1024 * 1024; // 5MB
    const maxVideoSize = 50 * 1024 * 1024; // 50MB
  
    // Allowed file types
    const allowedImageTypes = ["image/jpeg", "image/png"];
    const allowedVideoTypes = ["video/mp4"];
  
    // Validate image or video file
    if (file.type.startsWith("image/")) {
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
    } else if (file.type.startsWith("video/")) {
      if (!allowedVideoTypes.includes(file.type)) {
        const errMsg = "Invalid video format. Please upload an MP4 video.";
        console.log("Validation error:", errMsg);
        setUploadError(errMsg);
        setError("uploadedImage", { type: "manual", message: errMsg });
        return;
      }
      if (file.size > maxVideoSize) {
        const errMsg = "Video size exceeds the maximum allowed size of 50MB.";
        console.log("Validation error:", errMsg);
        setUploadError(errMsg);
        setError("uploadedImage", { type: "manual", message: errMsg });
        return;
      }
    } else {
      const errMsg = "Unsupported file type. Please upload an image or video.";
      console.log("Validation error:", errMsg);
      setUploadError(errMsg);
      setError("uploadedImage", { type: "manual", message: errMsg });
      return;
    }
  
    // Upload file to Firebase Storage
    const fileName = `${Date.now()}-${file.name}`;
    const storageRef = ref(storage, `causes/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
  
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
        };
  
        setMedia(updatedMedia);
        setValue("uploadedImage", updatedMedia);
        localStorage.setItem("uploadedImage", JSON.stringify(updatedMedia));
      }
    );
  };

  const handleRemoveMedia = () => {
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
        An image or video can be worth a thousand words. Add photos or videos
        that showcase the real people, places, or situations your cause supports.
      </p>
      <FormItem>
        <FormLabel>Upload Media</FormLabel>
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
                  // Wrap the image in a fixed-aspect ratio container (landscape 16:9)
                  <div className="relative w-[200px] h-[112.5px]">
                    <Image
                      src={media.src}
                      alt="Uploaded preview"
                      fill
                      className="object-cover rounded-lg"
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
              accept="image/*,video/*"
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
            uploading images or videos
          </p>
          <Image
            src="/List_a_cause/chevron-down-4.svg"
            alt="Toggle Guidelines"
            width={24}
            height={24}
          />
        </button>
        <p className="text-[#2b2829] text-sm font-normal font-montserrat mt-10">
          Note: Upload images that capture the spirit of your cause—a smile, a
          community, a place in need. Add a short video to show the heart of your
          cause. Let donors see and feel its impact.
        </p>
        {showGuidelines && (
          <div className="absolute left-0 mt-2 p-4 bg-white border border-gray-300 shadow-lg z-10">
            <p className="text-[12px] text-[#2b2829] font-montserrat">
              <strong>Images:</strong> Maximum size of 5 MB each
              <br />
              Recommended format: JPEG or PNG
              <br />
              Ideal resolution: 1920 x 1080 pixels
              <br />
              <br />
              <strong>Videos:</strong> Maximum size of 50 MB
              <br />
              Recommended format: MP4
              <br />
              Max resolution: 1080p (1920 x 1080)
              <br />
              Suggested length: 1-4 minutes
            </p>
          </div>
        )}
      </div>

      {media && (
        <div className="mt-4">
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
              {media.progress === 100 && (
                <span className="justify-end">
                  <Image
                    src="/List_a_cause/check.svg"
                    alt="Check"
                    width={30}
                    height={30}
                    style={{ width: "30px", height: "30px" }}
                  />
                </span>
              )}
            </div>
            <div className="flex">
              <div className="w-full mt-2 bg-gray-200 rounded-lg overflow-hidden">
                <div
                  className="bg-blue-500 h-4 transition-all duration-200"
                  style={{ width: `${media.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
          <div>
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
                <button onClick={handleRemoveMedia}>
                  <Image
                    src="/List_a_cause/trash-2.svg"
                    alt="Delete icon"
                    width={30}
                    height={30}
                    style={{ width: "30px", height: "30px" }}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
