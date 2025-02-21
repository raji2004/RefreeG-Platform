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

// Define the UploadedImage interface
export interface UploadedImage {
  src: string;
  name: string;
  size: number; // in KB
  progress: number;
}

export default function StepperForm() {
  const router = useRouter();

  interface FormData {
    state: string;
    zipCode: string;
    currency: string;
    causeTitle: string;
    causeCategory: string;
    deadline: string;
    goalAmount: string;
    uploadedImage: UploadedImage | null;
  }

  // Initialize formData from localStorage if available
  const [formData, setFormData] = useState<FormData>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("formData");
      if (saved) return JSON.parse(saved);
    }
    return {
      state: "",
      zipCode: "",
      currency: "",
      causeTitle: "",
      causeCategory: "",
      deadline: "",
      goalAmount: "",
      uploadedImage: null,
    };
  });

  // Use a separate errors state with string error messages
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );

  // Save formData to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // handleImageUpload now accepts an UploadedImage
  const handleImageUpload = (image: UploadedImage) => {
    setFormData((prev) => ({ ...prev, uploadedImage: image }));
    setErrors((prev) => ({ ...prev, uploadedImage: "" }));
  };

  const validateFields = (step: number) => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (step === 1) {
      if (!formData.state.trim()) newErrors.state = "State is required";
      if (!formData.zipCode.trim()) newErrors.zipCode = "ZIP Code is required";
      if (!formData.currency.trim())
        newErrors.currency = "Currency type is required";
    }
    if (step === 2) {
      if (!formData.causeTitle.trim())
        newErrors.causeTitle = "Cause title is required";
      if (!formData.causeCategory.trim())
        newErrors.causeCategory = "Cause category is required";
    }
    if (step === 3) {
      if (!formData.uploadedImage) {
        newErrors.uploadedImage = "Image is required";
      } else if (formData.uploadedImage.progress < 100) {
        newErrors.uploadedImage = "Image upload is incomplete";
      }
    }
    if (step === 4) {
      if (!formData.deadline.trim())
        newErrors.deadline = "Deadline is required";
      if (!formData.goalAmount.trim())
        newErrors.goalAmount = "Goal amount is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [step, setStep] = useState(1);
  const [mounted, setMounted] = useState(false);

  // Mark component as mounted so client-only content can be rendered
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleNext = () => {
    if (validateFields(step)) {
      setStep(step + 1);
    }
  };

  // Submission is now handled in the PreviewPage.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateFields(4)) return;

    try {
      // Save the latest form data to localStorage
      localStorage.setItem("formData", JSON.stringify(formData));
      // Submit the form data to Firestore (Firebase)
      const docRef = await addDoc(collection(db, "formSubmissions"), formData);
      console.log("Document written with ID: ", docRef.id);
      // After successful submission, navigate to the preview page
      router.push("/List_a_cause/See_Preview/Success");
    } catch (error: any) {
      console.error("Error adding document: ", error.message);
    }
  };

  return (
    <div className="mx-auto">
      <Tabs
        value={`step-${step}`}
        onValueChange={(value) => {
          const newStep = Number(value.split("-")[1]);
          setStep(newStep);
        }}
      >
        <TabsList className="flex gap-8 my-8 mb-8">
          <TabsTrigger value="step-1" disabled={step < 1}></TabsTrigger>
          <TabsTrigger value="step-2" disabled={step < 2}></TabsTrigger>
          <TabsTrigger value="step-3" disabled={step < 3}></TabsTrigger>
          <TabsTrigger value="step-4" disabled={step < 4}></TabsTrigger>
        </TabsList>

        <TabsContent value="step-1">
          {/* Step 1 form content */}
          <div className="p-4">
            <h2 className="text-[#2b2829] text-xl font-medium font-montserrat ">
              Where are the donations going?
            </h2>
            <p className="pl-4 text-[#2b2829] text-sm font-normal font-montserrat">
              Choose the location where you plan to receive your funds.
            </p>
            <form className="mt-4">
              <div className="flex gap-4">
                <span>
                  <label className="block text-sm font-medium">State</label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="mt-1 px-5 py-3.5 w-60 block rounded-md"
                  >
                    <option value="">Select State</option>
                    {/* State options */}
                  </select>
                  {errors.state && (
                    <p className="text-red-500 text-sm">{errors.state}</p>
                  )}
                </span>

                <span>
                  <label className="block text-sm font-medium">ZIP Code</label>
                  <input
                    type="number"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className="mt-1 px-5 py-3.5 w-60 block rounded-md no-spinners"
                    placeholder="Enter ZIP Code"
                    inputMode="numeric"
                    pattern="[0-9]*"
                  />
                  {errors.zipCode && (
                    <p className="text-red-500 text-sm">{errors.zipCode}</p>
                  )}
                </span>
              </div>

              <h2 className="text-[#2b2829] text-xl font-medium font-montserrat mt-16">
                How would you like to collect your donation?
              </h2>
              <p className="pl-4 text-[#2b2829] text-sm font-normal font-montserrat">
                Choose the currency you want to receive donations in.
              </p>
              <label className="block text-sm font-medium mt-4">
                Currency type
              </label>
              <select
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                className="mt-1 px-5 py-3.5 w-[200px] block rounded-md"
              >
                <option value="">Select Currency</option>
                <option value="Flat Currency">Flat Currency</option>
                <option value="Crypto Currency">Crypto Currency</option>
              </select>
              {errors.currency && (
                <p className="text-red-500 text-sm">{errors.currency}</p>
              )}

              {mounted && formData.currency === "Crypto Currency" && (
                <button
                  type="button"
                  className="mt-4 px-5 py-3.5 bg-blue-500 text-white rounded-md"
                  onClick={() => (window.location.href = "/crypto-donation")}
                >
                  Setup Crypto Payment
                </button>
              )}
            </form>
          </div>
        </TabsContent>

        <TabsContent value="step-2">
          <Step2Form
            formData={formData}
            handleChange={handleChange}
            errors={errors}
          />
        </TabsContent>

        <TabsContent value="step-3">
          <UploadImage
            formData={formData}
            handleImageUpload={handleImageUpload}
          />
          {errors.uploadedImage && (
            <p className="text-red-500 text-sm">{errors.uploadedImage}</p>
          )}
        </TabsContent>

        <TabsContent value="step-4">
          <Step4Form
            formData={formData}
            setFormData={setFormData}
            errors={errors}
          />
        </TabsContent>
      </Tabs>

      <div className="flex justify-between mt-6">
        {step > 1 && (
          <Button variant="secondary" onClick={() => setStep(step - 1)}>
            Back
          </Button>
        )}
        {step < 4 && <Button onClick={handleNext}>Next</Button>}
        {/* Removed the Submit button for step 4 */}
      </div>
    </div>
  );
}
