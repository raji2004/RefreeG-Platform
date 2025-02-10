"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Step2Form from "./step_2";
import Image from "next/image";

export default function StepperForm() {
  const [step, setStep] = useState(1);

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 4));
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="mx-auto">
      {/* Stepper Tabs */}
      <Tabs value={`step-${step}`}>
        <TabsList className="flex justify-between mb-20">
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
            <p className="text-sm font-bormal font-montserrat">Choose the location where you plan to receive your funds.</p>
          <Step2Form />
        </TabsContent>

        {/* Step 3 */}
        <TabsContent value="step-3">
          <h2 className="text-xl font-semibold">Confirm and Submit</h2>
          <p className="mt-4">Review your inputs and submit the form.</p>
        </TabsContent>

        {/* Step 4 */}
        <TabsContent value="step-4">
          <div className="">
            {/* Centering the progress tracker */}
            <div className="flex justify-center mb-14">
              <Image 
                src="/List_a_cause/progressTracker3.svg" 
                alt="progress tracker" 
                width={200} 
                height={20} 
              />
            </div>

            <div className="pb-24">
              <div className="font-medium pb-2">Bring Your Cause to Life with Images</div>
              <div className="text-sm pb-2">
                An image can be worth a thousand words. Add photos or videos that showcase 
                the real people, places, or situations your cause supports.
              </div>
              <div className="text-sm pb-2">Upload Media</div>
              <div className="pb-2">
                <Image 
                  src="/List_a_cause/uploadImage.svg" 
                  alt="upload image" 
                  width={400} 
                  height={20} 
                />
              </div>
              <div className="flex items-center">
                <span className="text-xs underline">
                  To ensure the best experience, please follow these guidelines when uploading 
                  images or videos
                </span>
                <Image 
                  src="/list_a_cause/arrowDown.svg" 
                  alt="progress tracker" 
                  width={20} 
                  height={20} 
                />
              </div>
            </div>

            <div className="text-xs border-b-2">
              Note: Upload images that capture the spirit of your cause—a smile, a community, 
              a place in need. Add a short video to show the heart of your cause. Let donors see 
              and feel its impact.
            </div>

            <div className="flex justify-end pt-3">
              <div className="bg-[#0070E0] w-80 flex justify-center items-center h-12">
                <button className="flex items-center gap-2 text-white font-semibold">
                  <span>Proceed</span>
                  <Image 
                    src="/list_a_cause/arrowRight.svg" 
                    alt="progress tracker" 
                    width={16} 
                    height={16} 
                  />
                </button>
              </div>
            </div>

          </div>
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
