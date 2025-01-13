"use client";

import { useState } from "react";
import Image from "next/image";

interface UploadedImage {
  src: string;
  name: string;
  progress: number;
}

export default function UploadImage() {
  const [image, setImage] = useState<UploadedImage | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;

    const file = event.target.files[0];

    const newImage = {
      src: URL.createObjectURL(file),
      name: file.name,
      progress: 0,
    };

    setImage(newImage);

    // Simulate upload progress
    const interval = setInterval(() => {
      setImage((prev) => {
        if (!prev) return null;

        const updatedProgress = Math.min(prev.progress + 10, 100);
        if (updatedProgress === 100) clearInterval(interval);

        return { ...prev, progress: updatedProgress };
      });
    }, 200); // Update progress every 200ms
  };

  const handleRemoveImage = () => {
    setImage(null);
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
          {/* Display image name */}
          <p className="text-sm text-gray-700 mb-2">{image.name}</p>

          {/* Show progress bar if upload is not complete */}
          <div className="relative w-full h-4 bg-gray-200 rounded-lg overflow-hidden mb-2">
            <div
              className="bg-blue-500 h-full rounded-lg"
              style={{ width: `${image.progress}%` }}
            ></div>
          </div>

          {/* Delete button */}
          <button
            onClick={handleRemoveImage}
            className="text-red-500 text-sm underline"
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
}
