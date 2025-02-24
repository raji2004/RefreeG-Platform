"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Listacause_component/navbar";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
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
    router.push("/List_a_cause");
  };

  // Submit form data to Firestore and then navigate to success page
  const handleSubmit = async () => {
    if (!formData) return;
    try {
      localStorage.setItem("formData", JSON.stringify(formData));
      const docRef = await addDoc(collection(db, "formSubmissions"), formData);
      console.log("Document written with ID: ", docRef.id);
      router.push("/List_a_cause/See_Preview/Success");
    } catch (error: any) {
      console.error("Error adding document: ", error.message);
    }
  };

  // Helper function to compute days left from the deadline.
  function getDaysLeft(deadline: string): string {
    const deadlineDate = new Date(deadline);
    const now = new Date();
    const diffTime = deadlineDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays <= 0) return "Past due";
    const words = [
      "zero",
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
      "ten",
    ];
    const dayWord = diffDays <= 10 ? words[diffDays] : diffDays.toString();
    return `${dayWord} day${diffDays > 1 ? "s" : ""} left`;
  }

  return (
    <div>
      <Navbar />
      <div className="p-4 flex flex-col md:flex-row justify-between">
        {/* Left Column */}
        <div className="mt-16 w-full md:w-1/2">
          {formData ? (
            <>
              <h1 className="text-2xl font-bold mb-2 text-center md:text-left">
                {formData.causeTitle}
              </h1>
              {uploadedImage ? (
                <div className="mb-6 w-full">
                  <Image
                    src={uploadedImage.src}
                    alt={uploadedImage.name}
                    className="mx-auto md:ml-[100px] w-[90%] md:w-[68%] h-auto object-cover rounded-lg"
                    width={867}
                    height={732}
                  />
                </div>
              ) : (
                <div className="mb-6 text-center">No image uploaded</div>
              )}
              <div className="flex flex-col md:flex-row gap-2 mt-9 items-center justify-center md:justify-start">
                <span className="text-sm bg-gray-200 rounded-full px-3 py-1 flex items-center">
                  <FaHeartbeat className="mr-1" /> {formData.causeCategory}
                </span>
                <span className="text-sm bg-gray-200 rounded-full px-3 py-1 flex items-center">
                  <FaMapMarkerAlt className="mr-1" /> {formData.state} State
                </span>
              </div>
              <p className="flex mt-4 font-semibold text-sm justify-center md:justify-start">
                <FaGlobe className="mr-1" /> United Nations International Children&apos;s Emergency Fund
              </p>
              {sections.length > 0 &&
                sections.map((section) => (
                  <div key={section.id} className="mb-6 w-full text-justify">
                    <h2 className="text-base font-medium mb-2">
                      {section.header || `Section ${section.id}`}
                    </h2>
                    <p className="w-full md:w-11/12 text-sm">
                      {section.description || "No description provided."}
                    </p>
                  </div>
                ))}
              
            </>
          ) : (
            <p className="text-center">Loading...</p>
          )}
        </div>
        {/* Right Column */}
        <div className="mt-16 w-full md:w-[40%] flex flex-col items-center md:items-end">
          <div className="bg-gray-100 p-4 rounded-md shadow-md w-full md:max-w-sm">
            <h2 className="text-xl font-bold">₦0 raised</h2>
            <p>of ₦{formData?.goalAmount} goal</p>
            <div className="flex flex-col md:flex-row mt-4 text-sm items-center justify-center">
              <span className="bg-gray-200 rounded-full px-3 py-1 mb-2 md:mb-0 md:mr-1">
                - Donations
              </span>
              <span className="bg-gray-200 rounded-full px-3 py-1">
                {formData?.deadline
                  ? `${formData.deadline} | ${getDaysLeft(formData.deadline)}`
                  : "N/A"}
              </span>
            </div>
          </div>
          <div className="mt-4 flex flex-col md:flex-row gap-2 w-full md:max-w-sm">
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
          <div className="flex flex-col md:flex-row mt-6 gap-4 justify-center md:justify-start">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={handleBackToForm}
                  aria-label="Back to Form"
                >
                  Back to Form
                </button>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded"
                  onClick={handleSubmit}
                  aria-label="Submit Form"
                >
                  Submit
                </button>
              </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewPage;
