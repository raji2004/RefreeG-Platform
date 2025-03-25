"use client";

import React, { useEffect, useRef, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useFormContext, useFieldArray } from "react-hook-form";

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
  uploadedImage: any;
  sections: Section[];
}

// Custom auto-resizing textarea component.
const AutoResizeTextarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ value, onChange, ...props }, ref) => {
  const internalRef = useRef<HTMLTextAreaElement>(null);
  const textareaRef =
    (ref as React.MutableRefObject<HTMLTextAreaElement>) || internalRef;

  // Stabilized function to prevent unnecessary re-renders
  const adjustHeight = useCallback(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [textareaRef]);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    adjustHeight();
    if (onChange) onChange(e);
  };

  useEffect(() => {
    adjustHeight();
  }, [adjustHeight, value]); // ✅ Fixed missing dependency warning

  return (
    <textarea
      {...props}
      ref={textareaRef}
      value={value}
      onChange={handleInput}
    />
  );
});

AutoResizeTextarea.displayName = "AutoResizeTextarea";

export const Form4 = () => {
  const router = useRouter();
  const { control, register, watch } = useFormContext<FormData>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "sections",
  });

  // Memoize sections to prevent unnecessary re-renders
  const sections = useMemo(() => watch("sections") || [], [watch]);

  useEffect(() => {
    if (fields.length === 0) {
      append({ id: 1, header: "", description: "" });
    }
  }, [fields, append]);

  useEffect(() => {
    localStorage.setItem("formSections", JSON.stringify(sections));
  }, [sections]); // ✅ Prevents unnecessary effect triggers

  const maxLength = 2000;

  const isSectionsValid =
    sections.length > 0 &&
    sections.every(
      (section) =>
        section.header.trim() !== "" && section.description.trim() !== ""
    );

  const handlePreview = () => {
    if (!isSectionsValid) return;
    router.push(
      `/See_Preview?data=${encodeURIComponent(JSON.stringify(sections))}`
    );
  };

  const addSection = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (fields.length >= 4) return;
    append({ id: fields.length + 1, header: "", description: "" });
  };

  const deleteLastSection = () => {
    if (fields.length > 1) {
      remove(fields.length - 1);
    }
  };

  return (
    <form className="flex flex-col mt-10">
      {/* Header */}
      <div className="text-[#2b2829] text-xl font-medium font-montserrat">
        Tell your story
      </div>
      <div className="mt-2 text-[#2b2829] text-sm font-normal font-montserrat">
        Your story is what connects donors to your cause. Share the inspiration
        behind it, the people it impacts, and the difference every donation will
        make.
      </div>
      <div className="mt-2 text-xs text-white border py-2 px-1 rounded bg-[#433e3f] border-[#CCCBCB]">
        In this section, try sharing what inspired you to start this cause?
        Share the personal journey or experience that led you to create it.
      </div>

      {/* Form Content */}
      <div className="flex-1 p-4">
        {fields.map((field, index) => {
          const descriptionValue = watch(`sections.${index}.description`) || "";
          return (
            <div key={field.id} className="mt-2">
              <div className="text-sm font-medium">Section {index + 1}</div>
              <div className="mt-2 border rounded px-2 py-4">
                <div>
                  <input
                    className="border-b h-14 text-xs p-2 w-full outline-none"
                    placeholder={`Header ${index + 1}`}
                    defaultValue={field.header}
                    {...register(`sections.${index}.header`)}
                  />
                  <div className="text-xs text-gray-500">
                    Hint: pick a short, attention-grabbing header.
                  </div>
                </div>
                <div className="mt-4 relative">
                  <AutoResizeTextarea
                    className="border-b text-xs p-3 w-full outline-none pr-10 pb-6"
                    placeholder="Cause Description"
                    maxLength={maxLength}
                    defaultValue={field.description}
                    {...register(`sections.${index}.description`)}
                  />
                  <div className="absolute bottom-2 right-3 text-xs text-gray-500 pointer-events-none">
                    {descriptionValue.length}/{maxLength}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Hint: Try sharing what inspired you to start this cause.
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Buttons for Adding Section & Preview */}
        <div className="mt-4 flex justify-between gap-2">
          <div className="flex">
            <button
              type="button"
              onClick={handlePreview}
              disabled={!isSectionsValid}
              className={`bg-[#433E3F] flex items-center space-x-1 text-white p-2 mr-2 rounded ${
                !isSectionsValid ? "opacity-50 cursor-not-allowed" : ""
              }`}
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
              onClick={addSection}
              disabled={fields.length >= 4}
              className={`p-2 rounded flex items-center ${
                fields.length >= 4
                  ? "bg-white cursor-not-allowed"
                  : "bg-white text-black"
              }`}
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
            {fields.length > 1 && (
              <button
                type="button"
                onClick={deleteLastSection}
                className="bg-red-500 text-white p-2 text-xs rounded"
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
