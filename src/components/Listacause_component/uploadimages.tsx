"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { UploadedImage } from "./stepper_form";

interface UploadImageProps {
  formData: any;
  handleImageUpload: (image: UploadedImage) => void;
}

export default function UploadImage({
  formData,
  handleImageUpload,
}: UploadImageProps) {
  const [media, setMedia] = useState<UploadedImage | null>(null);
  const [showGuidelines, setShowGuidelines] = useState(false);

  // Load saved media data on mount (optional)
  useEffect(() => {
    const savedMedia = localStorage.getItem("uploadedImage");
    if (savedMedia) {
      const parsedMedia = JSON.parse(savedMedia);
      setMedia(parsedMedia);
    }
  }, []);

  // When media upload reaches 100% progress, schedule parent's update after rendering
  useEffect(() => {
    if (media && media.progress === 100) {
      // Using setTimeout defers the call until after rendering completes
      setTimeout(() => {
        handleImageUpload(media);
      }, 0);
    }
  }, [media, handleImageUpload]);

  const handleMediaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;
    const file = event.target.files[0];
    const sizeInKB = Math.round(file.size / 1024);
    const newMedia: UploadedImage = {
      src: URL.createObjectURL(file),
      name: file.name,
      size: sizeInKB,
      progress: 0,
      type: file.type, // Now valid, because it's defined in the interface
    };

    setMedia(newMedia);
    localStorage.setItem("uploadedImage", JSON.stringify(newMedia));

    // Simulate upload progress
    const interval = setInterval(() => {
      setMedia((prev) => {
        if (!prev) return null;
        const updatedProgress = Math.min(prev.progress + 10, 100);
        const updatedMedia = { ...prev, progress: updatedProgress };
        localStorage.setItem("uploadedImage", JSON.stringify(updatedMedia));
        if (updatedProgress === 100) {
          clearInterval(interval);
          // Removed direct call to handleImageUpload here; it's called via useEffect.
        }
        return updatedMedia;
      });
    }, 200);
  };

  const handleRemoveMedia = () => {
    setMedia(null);
    localStorage.removeItem("uploadedImage");
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
        that showcase the real people, places, or situations your cause
        supports.
      </p>
      <label
        htmlFor="media-upload"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Upload Media
      </label>
      <button
        type="button"
        onClick={() => document.getElementById("media-upload")?.click()}
        className={`border-dashed border-2 border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 ${
          media ? "p-0" : "py-10 px-48"
        }`}
      >
        {media ? (
          media.type && media.type.startsWith("video/") ? (
            <video
              src={media.src}
              controls
              className="object-cover rounded-lg"
              width={200}
              height={200}
            />
          ) : (
            <Image
              src={media.src}
              alt="Uploaded preview"
              width={200}
              height={200}
              className="object-cover rounded-lg"
            />
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

      {/* Guidelines button with dropdown */}
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

      <input
        id="media-upload"
        type="file"
        accept="image/*,video/*"
        onChange={handleMediaChange}
        className="hidden"
      />

      {media && (
        <div className="mt-4">
          <div className="border block w-full border-[#b5b3b3] py-3 px-2">
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <Image
                  src="/List_a_cause/file.svg"
                  alt="File icon"
                  width={30}
                  height={30}
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
                    width={20}
                    height={20}
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
          <button
            onClick={handleRemoveMedia}
            className="text-red-500 text-sm underline mt-6"
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
}
