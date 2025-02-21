"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Section {
  id: number;
  header: string;
  description: string;
}

export interface FormData {
  state: string;
  zipCode: string;
  currency: string;
  causeTitle: string;
  causeCategory: string;
  deadline: string;
  goalAmount: string;
  uploadedImage: any; // Use your UploadedImage interface if needed
}

interface Step4FormProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  errors: Partial<Record<keyof FormData, string>>;
}

export const Step4Form = ({ formData, setFormData, errors }: Step4FormProps) => {
  const router = useRouter();

  // Initialize sections from localStorage if available, otherwise use default
  const [sections, setSections] = useState<Section[]>(() => {
    if (typeof window !== "undefined") {
      const savedSections = localStorage.getItem("formSections");
      if (savedSections) {
        return JSON.parse(savedSections);
      }
    }
    return [{ id: 1, header: "", description: "" }];
  });

  const maxLength = 2000;

  // Sync sections to localStorage on every change
  useEffect(() => {
    localStorage.setItem("formSections", JSON.stringify(sections));
  }, [sections]);

  const addSection = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (sections.length >= 4) return;
    setSections((prevSections) => [
      ...prevSections,
      { id: prevSections.length + 1, header: "", description: "" },
    ]);
  };

  const deleteLastSection = () => {
    if (sections.length > 1) {
      setSections((prevSections) => prevSections.slice(0, -1));
    }
  };

  const handleInputChange = (
    id: number,
    field: "header" | "description",
    value: string
  ) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === id ? { ...section, [field]: value } : section
      )
    );
  };

  const handlePreview = () => {
    // Save sections to localStorage before previewing
    localStorage.setItem("formSections", JSON.stringify(sections));
    router.push(`/preview?data=${encodeURIComponent(JSON.stringify(sections))}`);
  };

  return (
    <form className="flex flex-col h-screen mt-10">
      <div className="text-base font-semibold">Tell your story</div>
      <div className="mt-2 text-xs">
        Your story is what connects donors to your cause. Share the inspiration
        behind it, the people it impacts, and the difference every donation will
        make.
      </div>
      <div className="mt-2 text-xs border py-2 px-1 rounded bg-[#FAFAFA] border-[#CCCBCB]">
        In this section, try sharing what inspired you to start this cause? Share
        the personal journey or experience that led you to create it.
      </div>

      {/* Scrollable Form Content */}
      <div className="flex-1 overflow-y-auto p-4 scrollbar-hide">
        {sections.map((section, index) => (
          <div key={section.id} className="mt-2">
            <div className="text-sm font-medium">Section {section.id}</div>
            <div className="mt-2 border rounded px-2 py-4">
              <div>
                <input
                  className="border-b h-14 text-xs p-2 w-full outline-none"
                  placeholder={`Header ${index + 1}`}
                  value={section.header}
                  onChange={(e) =>
                    handleInputChange(section.id, "header", e.target.value)
                  }
                />
                <div className="text-xs text-gray-500">
                  Hint: pick a short, attention-grabbing header.
                </div>
              </div>
              <div className="mt-4 relative">
                <textarea
                  className="border-b h-14 text-xs p-3 w-full outline-none resize-none pr-10 pb-6"
                  placeholder="Cause Description"
                  maxLength={maxLength}
                  value={section.description}
                  onChange={(e) =>
                    handleInputChange(section.id, "description", e.target.value)
                  }
                />
                <div className="absolute bottom-2 right-3 text-xs text-gray-500 pointer-events-none">
                  {section.description.length}/{maxLength}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Hint: Try sharing what inspired you to start this cause.
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Buttons for Adding Section & Preview */}
        <div className="mt-4 flex justify-between gap-2">
          <div className="flex">
            <button
              type="button"
              className="bg-[#433E3F] flex items-center space-x-1 text-white p-2 mr-2 rounded"
              onClick={handlePreview}
            >
              <span className="text-xs">See preview</span>
              <Image
                src="/list_a_cause/whiterightarrow.svg"
                alt="Right arrow"
                width={11}
                height={11}
              />
            </button>
            <button
              type="button"
              className={`p-2 rounded flex items-center ${
                sections.length >= 4
                  ? "bg-white cursor-not-allowed"
                  : "bg-white text-black"
              }`}
              onClick={addSection}
              disabled={sections.length >= 4}
            >
              <span className="flex items-center">
                <Image
                  src="/list_a_cause/plus.svg"
                  alt="Plus icon"
                  width={15}
                  height={15}
                />
                <span className="text-xs">Add a Section</span>
              </span>
            </button>
          </div>

          <div>
            {/* Conditionally Show Delete Button */}
            {sections.length > 1 && (
              <button
                type="button"
                className="bg-red-500 text-white p-2 text-xs rounded"
                onClick={deleteLastSection}
              >
                <span className="flex items-center gap-1">
                  <Image
                    src="/list_a_cause/trash.svg"
                    alt="Trash icon"
                    width={15}
                    height={15}
                  />
                  <span className="text-xs">Delete Section</span>
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};
