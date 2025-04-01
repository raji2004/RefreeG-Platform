"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Navbar from "../cause/create/_components/navbar";
import { getSessionId } from "@/lib/helpers";
import {
  FaExclamationTriangle,
  FaHeartbeat,
  FaMapMarkerAlt,
  FaGlobe,
} from "react-icons/fa";
import { addCause } from "@/lib/firebase/actions";
import { getDaysLeft } from "@/lib/utils";
import { generateKeywords } from "@/lib/utils";

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
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(
    null
  );
  const [formData, setFormData] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Retrieve form data
    const savedFormData = localStorage.getItem("formData");
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
    // Retrieve sections
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

  // Validate that all required fields are provided.
  const isFormValid = () => {
    if (!formData) return false;
    if (
      !formData.state.trim() ||
      !formData.zipCode.trim() ||
      !formData.currency.trim() ||
      !formData.causeTitle.trim() ||
      !formData.causeCategory.trim() ||
      !formData.deadline.trim() ||
      !formData.goalAmount.trim() ||
      !uploadedImage
    ) {
      return false;
    }
    if (!sections || sections.length === 0) return false;
    for (const section of sections) {
      if (!section.header.trim() || !section.description.trim()) return false;
    }
    return true;
  };

  const handleBackToForm = () => {
    router.push("/cause/create");
  };

  const handleSubmit = async () => {
    console.log("Submitting form...");
    if (!isFormValid()) {
      setErrorMessage("Please fill out all required fields before submitting.");
      return;
    }
    setErrorMessage("");

    try {
      const currentUser = await getSessionId();

      if (currentUser === undefined) router.push("/login");
      console.log("Current User: ", currentUser);

      // Generate keywords from the cause title
      const keywords = generateKeywords(formData.causeTitle);

      // Combine the formData, sections, and uploadedImage into one object.
      const finalData = {
        ...formData,
        sections,
        img: uploadedImage?.src,
        userId: currentUser,
        raisedAmount: 0,
        goalAmount: parseInt(formData.goalAmount),
        keywords, // Add the generated keywords
      };

      const causeId = await addCause(finalData);
      console.log("Document saved with ID:", causeId);
      router.push(`/See_Preview/Success?id=${causeId}`);
    } catch (error: any) {
      console.error("Error adding document:", error.message);
      setErrorMessage(
        "There was an error submitting the form. Please try again."
      );
    }
  };

  return (
    <div>
      <Navbar />
      <div className="p-4 flex flex-col md:flex-row justify-between">
        {/* Left Column */}
        <div className="mt-16 w-full md:w-1/2">
          {formData ? (
            <>
              <h1 className="text-black text-[40px] font-bold font-montserrat md:text-left">
                {formData.causeTitle}
              </h1>
              {uploadedImage ? (
                <div className="mb-6 w-full">
                  {/* Image container with enforced aspect ratio */}
                  <div className="relative md:ml-[100px] w-[90%] md:w-[68%] aspect-video rounded-lg overflow-hidden">
                    <Image
                      src={uploadedImage.src}
                      alt={uploadedImage.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              ) : (
                <div className="mb-6 text-center">No image uploaded</div>
              )}
              <div className="flex md:flex-row gap-2 mt-9 items-center justify-start md:justify-start">
                <span className="text-sm bg-gray-200 rounded-full px-3 py-1 flex items-center">
                  <FaHeartbeat className="mr-1" /> {formData.causeCategory}
                </span>
                <span className="text-sm bg-gray-200 rounded-full px-3 py-1 flex items-center">
                  <FaMapMarkerAlt className="mr-1" /> {formData.state}, Nigeria
                </span>
              </div>
              <p className="flex items-center mt-4 mb-4 font-semibold text-sm justify-start md:justify-start">
                <FaGlobe className="mr-1" /> United Nations International
                Childrens Emergency Fund
              </p>
              {sections.length > 0 &&
                sections.map((section) => (
                  <div key={section.id} className="mb-6 w-full text-justify">
                    <h2 className="text-black text-xl font-bold font-montserrat mb-2">
                      {section.header || `Section ${section.id}`}
                    </h2>
                    <p className="w-full md:w-11/12 text-black text-lg font-normal font-montserrat">
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
        <div className="mt-16 w-full md:w-1/2 flex flex-col items-center md:items-end">
          <div className="bg-gray-100 p-4 rounded-md shadow-md w-full">
            <h2 className="text-xl font-bold">₦0 raised</h2>
            <p>of ₦{formData?.goalAmount} goal</p>
            <div className="flex md:flex-row mt-4 text-sm items-center justify-start">
              <span className="bg-gray-200 rounded-full px-3 py-1 mb-2 md:mb-0 md:mr-1">
                NIL - Donations
              </span>
              <span className="bg-gray-200 rounded-full px-3 py-1">
                {formData?.deadline
                  ? `${formData.deadline} | ${getDaysLeft(formData.deadline)}`
                  : "N/A"}
              </span>
            </div>
          </div>
          <div className="mt-4 flex flex-col md:flex-row gap-2 w-full">
            <button
              className="flex-grow bg-white text-[#0070e0] border border-[#0070e0] py-2 hover:bg-[#0070e0] hover:text-white transition-colors duration-300"
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
          <div className="flex w-full mt-6 gap-4 justify-between">
            <button
              className="bg-black text-white px-4 py-2 rounded"
              onClick={handleBackToForm}
              aria-label="Back to Form"
            >
              Back
            </button>
            <button
              className="bg-[#0070e0] text-white px-4 py-2 rounded"
              onClick={handleSubmit}
              aria-label="Submit Form"
            >
              Proceed
            </button>
          </div>
          {errorMessage && (
            <div className="mt-4 text-red-500 text-sm flex items-center">
              <FaExclamationTriangle className="mr-1" /> {errorMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewPage;
