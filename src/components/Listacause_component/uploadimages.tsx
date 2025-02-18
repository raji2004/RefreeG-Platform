"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface UploadedImage {
  src: string;
  name: string;
  size: number; // Size in KB
  progress: number;
}

export default function UploadImage() {
  const [image, setImage] = useState<UploadedImage | null>(null);

  // Load saved image data when the component mounts
  useEffect(() => {
    const savedImage = localStorage.getItem("uploadedImage");
    if (savedImage) {
      setImage(JSON.parse(savedImage));
    }
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;

    const file = event.target.files[0];
    const sizeInKB = Math.round(file.size / 1024);

    const newImage = {
      src: URL.createObjectURL(file),
      name: file.name,
      size: sizeInKB,
      progress: 0,
    };

    setImage(newImage);

    // Save image data to localStorage immediately
    localStorage.setItem("uploadedImage", JSON.stringify(newImage));

    // Simulate upload progress
    const interval = setInterval(() => {
      setImage((prev) => {
        if (!prev) return null;

        const updatedProgress = Math.min(prev.progress + 10, 100);
        if (updatedProgress === 100) clearInterval(interval);

        const updatedImage = { ...prev, progress: updatedProgress };

        // Save updated image progress to localStorage
        localStorage.setItem("uploadedImage", JSON.stringify(updatedImage));

        return updatedImage;
      });
    }, 200); // Update progress every 200ms
  };

  const handleRemoveImage = () => {
    setImage(null);
    localStorage.removeItem("uploadedImage"); // Remove image data from localStorage
  };

  return (
    <div className="mt-4">
      <label
        htmlFor="image-upload"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Upload Media
      </label>

      {/* Button to trigger file upload */}
      <button
        type="button"
        onClick={() => document.getElementById("image-upload")?.click()}
        className={`border-dashed border-2 border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 ${
          image ? "p-0" : "py-10 px-48"
        }`}
      >
        {image ? (
          <Image
            src={image.src}
            alt="Uploaded preview"
            width={200}
            height={200}
            className="object-cover rounded-lg"
          />
        ) : (
          <Image
            src="/List_a_cause/Upload_to_Cloud.png"
            alt="Upload"
            width={70}
            height={70}
          />
        )}
      </button>

      {/* Hidden file input */}
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />

      {/* Display uploaded image name, progress, and delete button */}
      {image && (
        <div className="mt-4">
          {/* Display image name and size */}
          <div className="border block w-full border-[#b5b3b3] py-3 px-2">
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <Image
                  src="/List_a_cause/file.svg"
                  alt="Img file"
                  width={30}
                  height={30}
                />
                <span>
                  <p className="text-[#363939] text-md md:text-lg font-normal font-montserrat">{image.name}</p>
                  <p className="text-[#b5b3b3] text-xs font-normal font-montserrat">{image.size} KB</p>
                </span>
              </div>
              {image.progress === 100 && (
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

            {/* Progress bar */}
            <div className="flex">
              <div className="w-full mt-2 bg-gray-200 rounded-lg overflow-hidden">
                <div
                  className="bg-blue-500 h-4 transition-all duration-200"
                  style={{ width: `${image.progress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-700 mt-1">
                {image.progress === 100 ? "100%" : `${image.progress}%`}
              </p>
            </div>
          </div>

          <div>
            {/* Delete button */}
            <button
              onClick={handleRemoveImage}
              className="text-red-500 text-sm underline mt-6"
            >
              Remove
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
