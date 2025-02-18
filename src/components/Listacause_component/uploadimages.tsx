"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { UploadedImage } from "./stepper_form";

interface UploadImageProps {
  formData: any;
  handleImageUpload: (image: UploadedImage) => void;
}

export default function UploadImage({ formData, handleImageUpload }: UploadImageProps) {
  const [image, setImage] = useState<UploadedImage | null>(null);

  // Load saved image data on mount (optional)
  useEffect(() => {
    const savedImage = localStorage.getItem("uploadedImage");
    if (savedImage) {
      const parsedImage = JSON.parse(savedImage);
      setImage(parsedImage);
      if (parsedImage.progress === 100) {
        handleImageUpload(parsedImage);
      }
    }
  }, []);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;
    const file = event.target.files[0];
    const sizeInKB = Math.round(file.size / 1024);
    const newImage: UploadedImage = {
      src: URL.createObjectURL(file),
      name: file.name,
      size: sizeInKB,
      progress: 0,
    };
    setImage(newImage);
    localStorage.setItem("uploadedImage", JSON.stringify(newImage));

    // Simulate upload progress
    const interval = setInterval(() => {
      setImage((prev) => {
        if (!prev) return null;
        const updatedProgress = Math.min(prev.progress + 10, 100);
        const updatedImage = { ...prev, progress: updatedProgress };
        localStorage.setItem("uploadedImage", JSON.stringify(updatedImage));
        if (updatedProgress === 100) {
          clearInterval(interval);
          // Notify parent that the upload is complete
          handleImageUpload(updatedImage);
        }
        return updatedImage;
      });
    }, 200);
  };

  const handleRemoveImage = () => {
    setImage(null);
    localStorage.removeItem("uploadedImage");
  };

  return (
    <div className="mt-4">
      <label htmlFor="image-upload" className="block text-sm font-medium text-gray-700 mb-2">
        Upload Media
      </label>
      <button
        type="button"
        onClick={() => document.getElementById("image-upload")?.click()}
        className={`border-dashed border-2 border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 ${image ? "p-0" : "py-10 px-48"}`}
      >
        {image ? (
          <Image src={image.src} alt="Uploaded preview" width={200} height={200} className="object-cover rounded-lg" />
        ) : (
          <Image src="/List_a_cause/Upload_to_Cloud.png" alt="Upload" width={70} height={70} />
        )}
      </button>
      <input id="image-upload" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
      {image && (
        <div className="mt-4">
          <div className="border block w-full border-[#b5b3b3] py-3 px-2">
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <Image src="/List_a_cause/file.svg" alt="Img file" width={30} height={30} />
                <span>
                  <p className="text-[#363939] text-md md:text-lg font-normal">{image.name}</p>
                  <p className="text-[#b5b3b3] text-xs">{image.size} KB</p>
                </span>
              </div>
              {image.progress === 100 && (
                <span className="justify-end">
                  <Image src="/List_a_cause/check.svg" alt="Check" width={20} height={20} />
                </span>
              )}
            </div>
            <div className="flex">
              <div className="w-full mt-2 bg-gray-200 rounded-lg overflow-hidden">
                <div className="bg-blue-500 h-4 transition-all duration-200" style={{ width: `${image.progress}%` }}></div>
              </div>
            </div>
          </div>
          <button onClick={handleRemoveImage} className="text-red-500 text-sm underline mt-6">
            Remove
          </button>
        </div>
      )}
    </div>
  );
}
