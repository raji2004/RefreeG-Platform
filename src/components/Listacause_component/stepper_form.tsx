"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Step2Form from "./step_2";
import Image from "next/image";

interface Section {
  id: number;
  header: string;
  description: string;
}

export default function StepperForm() {
  const [step, setStep] = useState(1);
  const [sections, setSections] = useState<Section[]>([
    { id: 1, header: "", description: "" }
  ]);
  const maxLength = 2000;

  const addSection = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Prevent form submission
  
    if (sections.length >= 4) return; // Max 4 sections
  
    setSections([
      ...sections,
      { id: sections.length + 1, header: "", description: "" }
    ]);
  };

  const deleteLastSection = () => {
    if (sections.length > 1) {
      setSections(sections.slice(0, -1)); // Removes the last section
    }
  };

  const handleInputChange = (id: number, field: "header" | "description", value: string) => {
    setSections(
      sections.map((section) =>
        section.id === id ? { ...section, [field]: value } : section
      )
    );
  };

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 4));
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="mx-auto">
      {/* Stepper Tabs */}
      <Tabs value={`step-${step}`}>
        <TabsList className="flex justify-between mb-10">
          <TabsTrigger value="step-1" disabled={step < 1}>
            Step 1
          </TabsTrigger>
          <TabsTrigger value="step-2" disabled={step < 2}>
            Step 2
          </TabsTrigger>
          <TabsTrigger value="step-3" disabled={step < 3}>
            Step 3
          </TabsTrigger>
          <TabsTrigger value="step-4" disabled={step < 4}>
            Step 4
          </TabsTrigger>
        </TabsList>

        {/* Step 1 */}
        <TabsContent value="step-1">
          <h2 className="text-xl font-semibold font-montserrat">
            Where are the donations going?
          </h2>
          <p className="text-sm font-bormal font-montserrat">
            Choose the location where you plan to receive your funds.
          </p>
          <form className="mt-4 items-center">
            <div className="flex gap-4">
              <span>
                <label className="block text-sm font-medium">State</label>
                <select className="mt-1 px-5 py-3.5 w-[200px] block rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200">
                  <option>F.C.T Abuja</option>
                  <option>Lagos</option>
                  <option>Kano</option>
                </select>
              </span>
              <span>
                <label className="block text-sm font-medium">ZIP Code</label>
                <input
                  type="text"
                  className="mt-1 px-5 py-3.5 block w-[200px] rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                  placeholder="Enter ZIP Code"
                />
              </span>
            </div>

            <h2 className="text-xl font-semibold font-montserrat mt-16">
              How would you like to collect your donation?
            </h2>
            <p className="text-sm font-bormal font-montserrat">
              Choose the currency you want to receive donations in.
            </p>
            <label className="block text-sm font-medium mt-4">
              Currency type
            </label>
            <select className="mt-1 px-5 py-3.5 w-[200px] block rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200">
              <option>Flat Currency</option>
              <option>Crypto Currency</option>
            </select>
          </form>
        </TabsContent>

        {/* Step 2 */}
        <TabsContent value="step-2">
          <h2 className="text-xl font-medium font-montserrat">
            Help us give people information about the cause
          </h2>
            <p className="text-sm font-bormal font-montserrat">
              Choose the location where you plan to receive your funds.
            </p>
          <Step2Form />
        </TabsContent>

        {/* Step 3 */}
        <TabsContent value="step-3">
          <h2 className="text-xl font-semibold">Confirm and Submit</h2>
          <p className="mt-4">Review your inputs and submit the form.</p>
        </TabsContent>

        {/* Step 4 */}
        <TabsContent value="step-4">
          <form className="flex flex-col h-screen">
            <div className="text-base font-semibold">Tell your story</div>
            <div className="mt-2 text-xs">
              Your story is what connects donors to your cause. 
              Share the inspiration behind it, the people it impacts, 
              and the difference every donation will make.
            </div>
            <div className="mt-2 text-xs border py-2 px-1 rounded bg-[#FAFAFA] border-[#CCCBCB]">
              In this section, try sharing what inspired you to start this cause? 
              Share the personal journey or experience that led you to create it.
            </div>
            {/* Scrollable Form Content */}
              <div className="flex-1 overflow-y-auto p-4 scrollbar-none">
                {sections.map((section, index) => (
                  <div key={section.id} className="mt-2">
                    <div className="text-sm font-medium">Section {section.id}</div>
                    <div className="mt-2 border rounded px-2 py-4">
                      <div>
                        <input
                          className="border-b h-14 text-xs p-2 w-full outline-none"
                          placeholder={`Header ${index + 1}`} // Dynamic placeholder
                          value={section.header}
                          onChange={(e) => handleInputChange(section.id, "header", e.target.value)}
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
                          onChange={(e) => handleInputChange(section.id, "description", e.target.value)}
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
                <div className="mt-4 flex gap-2">
                  <button type="button" className="bg-gray-300 p-2 rounded">See preview</button>
                  <button
                    type="button"
                    className={`p-2 rounded ${sections.length >= 4 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"}`}
                    onClick={addSection}
                    disabled={sections.length >= 4}
                  >
                    Add a Section
                  </button>

                  {/* Conditionally Show Delete Button */}
                  {sections.length > 1 && (
                    <button
                      type="button"
                      className="bg-red-500 text-white p-2 rounded"
                      onClick={deleteLastSection}
                    >
                      Delete Section
                    </button>
                  )}
                </div>
              </div>

              {/* Fixed Bottom Action Bar */}
              <div className="bg-white p-4 shadow-md border-t sticky bottom-0 w-full flex justify-end">
                <button type="submit" className="bg-green-500 text-white p-3 rounded-lg">Proceed</button>
              </div>
            </form>

        </TabsContent>
      </Tabs>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        {step > 1 && (
          <Button variant="secondary" onClick={handleBack}>
            Back
          </Button>
        )}
        {step < 4 && <Button onClick={handleNext}>Next</Button>}
        {step === 4 && (
          <Button onClick={() => alert("Form Submitted!")}>Submit</Button>
        )}
      </div>
    </div>
  );
}
