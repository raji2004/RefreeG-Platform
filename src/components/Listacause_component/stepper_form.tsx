"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Use Next.js router
import { useRouter } from "next/router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/firebase/config"; // Import Firebase config
import { collection, addDoc } from "firebase/firestore"; // Import Firestore functions
import { Step4Form } from "./step_4";
import Step2Form from "./step_2";
import UploadImage from "./uploadimages";

interface Section {
  id: number;
  header: string;
  description: string;
}

export default function StepperForm() {
  const [step, setStep] = useState(1);
  const router = useRouter(); // Use Next.js router for navigation
  const [formData, setFormData] = useState({
    state: "",
    zipCode: "",
    currency: "",
    causeTitle: "",
    causeCategory: "",
    deadline: "",
    goalAmount: "",
  });

  // Load saved data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const docRef = await addDoc(collection(db, "formSubmissions"), formData);
      console.log("Document written with ID: ", docRef.id);

      localStorage.removeItem("formData"); // Clear storage on submit
      router.push("/preview"); // Navigate to preview page
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="mx-auto">
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
          <h2 className="text-xl font-semibold">Where are the donations going?</h2>
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="flex gap-4">
              <span>
                <label className="block text-sm font-medium">State</label>
                <select name="state" value={formData.state} onChange={handleChange} className="mt-1 px-5 py-3.5 w-[200px] block rounded-md border-gray-300">
                  <option value="">Select State</option>
                  <option>F.C.T Abuja</option>
                  <option>Lagos</option>
                  <option>Kano</option>
                </select>
              </span>
              <span>
                <label className="block text-sm font-medium">ZIP Code</label>
                <input name="zipCode" type="text" value={formData.zipCode} onChange={handleChange} placeholder="Enter ZIP Code"
                  className="mt-1 px-5 py-3.5 block w-[200px] rounded-md border-gray-300" />
              </span>
            </div>

            <label className="block text-sm font-medium mt-4">Currency type</label>
            <select name="currency" value={formData.currency} onChange={handleChange} className="mt-1 px-5 py-3.5 w-[200px] block rounded-md border-gray-300">
              <option value="">Select Currency</option>
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
          <UploadImage formData={formData} handleChange={handleChange} />
        </TabsContent>

        {/* Step 4 */}
        <TabsContent value="step-4">
          <Step4Form />

        </TabsContent>
      </Tabs>

      <div className="flex justify-between mt-6">
        {step > 1 && <Button variant="secondary" onClick={handleBack}>Back</Button>}
        {step < 4 && <Button onClick={handleNext}>Next</Button>}
        {step === 4 && <Button onClick={handleSubmit}>Submit</Button>}
      </div>
    </div>
  );
}
