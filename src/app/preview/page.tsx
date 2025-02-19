"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Listacause_component/navbar";
import {
  FaExclamationTriangle,
  FaHeartbeat,
  FaMapMarkerAlt,
  FaGlobe,
} from "react-icons/fa";

interface Section {
  id: number;
  header: string;
  description: string;
}

interface UploadedImage {
  src: string;
  name: string;
  size: number;
}

const PreviewPage = () => {
  const router = useRouter();
  const [sections, setSections] = useState<Section[]>([]);
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null);
  const [formData, setFormData] = useState<any>(null);

  useEffect(() => {
    // Retrieve form data (Steps 1 and 2)
    const savedFormData = localStorage.getItem("formData");
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
    // Retrieve sections (Steps 3 or 4 data)
    const savedSections = localStorage.getItem("formSections");
    if (savedSections) {
      setSections(JSON.parse(savedSections));
    }
    // Retrieve uploaded image
    const imageData = localStorage.getItem("uploadedImage");
    if (imageData) {
      setUploadedImage(JSON.parse(imageData));
    }
  }, []);

  const handleBackToForm = () => {
    // Simply navigate back without overwriting localStorage
    router.push("/List_a_cause"); // Update with your actual form route if needed
  };

  return (
    <div>
      <Navbar />
      <div className="p-4 flex flex-row justify-between">
        <div className="mt-16 w-full md:w-2/4">
          {formData ? (
            <>
              <h1 className="text-2xl font-bold mb-2">{formData.causeTitle}</h1>
              <p className="text-red-600 font-medium flex items-center">
                <FaExclamationTriangle className="mr-2" />
                {formData.causeCategory}
              </p>
              {uploadedImage ? (
                <div className="mb-6 w-full">
                  <Image
                    src={uploadedImage.src}
                    alt={uploadedImage.name}
                    className="ml-[70px] md:ml-[100px] w-[68%] h-[65%] object-cover rounded-lg"
                    width={867}
                    height={732}
                  />
                </div>
              ) : (
                <div className="mb-6 text-center">No image uploaded</div>
              )}
              <div className="flex space-x-2 mt-9">
                <span className="text-sm bg-gray-200 rounded-full px-3 py-1 flex items-center">
                  <FaHeartbeat className="mr-1" /> Healthcare
                </span>
                <span className="text-sm bg-gray-200 rounded-full px-3 py-1 flex items-center">
                  <FaMapMarkerAlt className="mr-1" /> {formData.state}
                </span>
              </div>
              <p className="flex mt-4 font-semibold text-sm">
                <FaGlobe className="mr-1" /> United Nations International Children&apos;s Emergency Fund
              </p>
              {sections.length > 0 &&
                sections.map((section) => (
                  <div key={section.id} className="mb-6 w-full text-justify">
                    <h2 className="text-base font-medium mb-2">
                      {section.header || `Section ${section.id}`}
                    </h2>
                    <p className="w-11/12 text-sm">
                      {section.description || "No description provided."}
                    </p>
                  </div>
                ))}
              <button
                className="mt-6 bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleBackToForm}
                aria-label="Back to Form"
              >
                Back to Form
              </button>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div className="mt-16 md:w-[40%] mr-10 flex flex-col">
          <div className="bg-gray-100 p-4 rounded-md shadow-md">
            <h2 className="text-xl font-bold">₦0 raised</h2>
            <p>of ₦{formData?.goalAmount} goal</p>
            <div className="flex mt-4 text-sm">
              <span className="bg-gray-200 rounded-full px-3 py-1 mr-1">
                2.4k Donations
              </span>
              <span className="bg-gray-200 rounded-full px-3 py-1 mr-1">
                {formData?.deadline}
              </span>
            </div>
          </div>
          <div className="mt-4 flex space-x-2">
            <button
              className="flex-grow bg-gray-300 text-blue py-2 rounded-md hover:bg-gray-400 transition-colors duration-300"
              aria-label="Share the cause"
            >
              Share
            </button>
            <button
              className="flex-grow bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
              aria-label="Donate now"
            >
              Donate ₦{formData?.goalAmount}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewPage;
