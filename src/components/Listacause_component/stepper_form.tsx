"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { Step4Form } from "./step_4";
import Step2Form from "./step_2";
import UploadImage from "./uploadimages";

export default function StepperForm() {
  const [step, setStep] = useState(1);
  const router = useRouter();

  interface FormData {
    state: string;
    zipCode: string;
    currency: string;
    causeTitle: string;
    causeCategory: string;
    deadline: string;
    goalAmount: string;
    uploadedImage: File | null;
  }

  const [formData, setFormData] = useState<FormData>({
    state: "",
    zipCode: "",
    currency: "",
    causeTitle: "",
    causeCategory: "",
    deadline: "",
    goalAmount: "",
    uploadedImage: null,
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  useEffect(() => {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    // Clear error when user starts typing
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleImageUpload = (image: File) => {
    setFormData((prev) => ({ ...prev, uploadedImage: image }));
    setErrors((prev) => ({ ...prev, uploadedImage: "" }));
  };

  const validateFields = (step: number) => {
    const newErrors: Partial<FormData> = {};

    if (step === 1) {
      if (!formData.state) newErrors.state = "State is required";
      if (!formData.zipCode) newErrors.zipCode = "ZIP Code is required";
      if (!formData.currency) newErrors.currency = "Currency type is required";
    }

    if (step === 2) {
      if (!formData.causeTitle) newErrors.causeTitle = "Cause title is required";
      if (!formData.causeCategory) newErrors.causeCategory = "Cause category is required";
    }

    if (step === 3) {
      if (!formData.uploadedImage) newErrors.uploadedImage = "Image is required";
    }

    if (step === 4) {
      if (!formData.deadline) newErrors.deadline = "Deadline is required";
      if (!formData.goalAmount) newErrors.goalAmount = "Goal amount is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateFields(step)) {
      setStep(step + 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateFields(4)) return;

    try {
      localStorage.setItem("formData", JSON.stringify(formData));

      // Add data to Firestore
      const docRef = await addDoc(collection(db, "formSubmissions"), formData);
      console.log("Document written with ID: ", docRef.id);

      // Navigate to preview page
      router.push("/preview");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="mx-auto ">
      {/* Stepper Tabs */}
      <Tabs value={`step-${step}`}>
        <TabsList className="flex justify-between my-20 mb-10">
          <TabsTrigger value="step-1" disabled={step < 1}>
            
          </TabsTrigger>
          <TabsTrigger value="step-2" disabled={step < 2}>
            
          </TabsTrigger>
          <TabsTrigger value="step-3" disabled={step < 3}>
            
          </TabsTrigger>
          <TabsTrigger value="step-4" disabled={step < 4}>
           
          </TabsTrigger>
        </TabsList>

        <TabsContent value="step-1">
         <div className="p-4">
            <div className="space-y-2 w-full">
              <h2 className="text-2xl font-semibold font-montserrat">
                Where are the donations going?
              </h2>
              <p className="text-sm font-bormal font-montserrat">
                Choose the location where you plan to receive your funds.
              </p>
            </div>
            <form className="mt-4 items-center">
              <div className="flex gap-4">
                <span>
                  <label className="block text-sm font-medium">State</label>
                  <select className="mt-1 px-5 py-3.5 w-24 block rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200">
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

              <h2 className=" text-xl font-semibold font-montserrat mt-16">
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
         </div>
        </TabsContent>

        <TabsContent value="step-2">
          <Step2Form formData={formData} handleChange={handleChange} />
        </TabsContent>

        <TabsContent value="step-3">
          <UploadImage formData={formData} handleImageUpload={handleImageUpload} />
          {errors.uploadedImage && <p className="text-red-500 text-sm">{errors.uploadedImage}</p>}
        </TabsContent>

        <TabsContent value="step-4">
          <Step4Form formData={formData} setFormData={setFormData} />
        </TabsContent>
      </Tabs>

      <div className="flex justify-between mt-6">
        {step > 1 && (
          <Button variant="secondary" onClick={() => setStep(step - 1)}>
            Back
          </Button>
        )}
        {step < 4 && <Button onClick={handleNext}>Next</Button>}
        {step === 4 && (
          <Button onClick={handleSubmit} disabled={Object.keys(errors).length > 0}>
            Submit
          </Button>
        )}
      </div>
    </div>
  );
}
