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
    uploadedImage: UploadedImage | null;
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Now handleImageUpload receives an UploadedImage object
  const handleImageUpload = (image: UploadedImage) => {
    setFormData((prev) => ({ ...prev, uploadedImage: image }));
    setErrors((prev) => ({ ...prev, uploadedImage: "" }));
  };

  const validateFields = (step: number) => {
    const newErrors: Partial<FormData> = {};

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

  const handleNext = () => {
    const valid = validateFields(step);
    console.log("Step", step, "validation:", valid, "Errors:", errors);
    if (valid) {
      setStep(step + 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateFields(4)) return;

    try {
      localStorage.setItem("formData", JSON.stringify(formData));
      const docRef = await addDoc(collection(db, "formSubmissions"), formData);
      console.log("Document written with ID: ", docRef.id);
      router.push("/preview");
    } catch (error) {
      console.error("Error adding document: ", error);
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
        <TabsList className="flex justify-between my-20 mb-10">
          <TabsTrigger value="step-1" disabled={step < 1}>
            <span className="invisible">Step 1</span>
          </TabsTrigger>
          <TabsTrigger value="step-2" disabled={step < 2}>
            <span className="invisible">Step 2</span>
          </TabsTrigger>
          <TabsTrigger value="step-3" disabled={step < 3}>
            <span className="invisible">Step 3</span>
          </TabsTrigger>
          <TabsTrigger value="step-4" disabled={step < 4}>
            <span className="invisible">Step 4</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="step-1">
          {/* Step 1 content */}
          <div className="p-4">
            <h2 className="text-2xl font-semibold">
              Where are the donations going?
            </h2>
            <p className="text-sm">
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
                    className="mt-1 px-5 py-3.5 w-24 block rounded-md"
                  >
                    <option value="">Select State</option>
                    <option value="F.C.T Abuja">F.C.T Abuja</option>
                    <option value="Lagos">Lagos</option>
                    <option value="Kano">Kano</option>
                  </select>
                  {errors.state && (
                    <p className="text-red-500 text-sm">{errors.state}</p>
                  )}
                </span>
                <span>
                  <label className="block text-sm font-medium">ZIP Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className="mt-1 px-5 py-3.5 w-[200px] block rounded-md"
                    placeholder="Enter ZIP Code"
                  />
                  {errors.zipCode && (
                    <p className="text-red-500 text-sm">{errors.zipCode}</p>
                  )}
                </span>
              </div>
              <h2 className="text-xl font-semibold mt-16">
                How would you like to collect your donation?
              </h2>
              <p className="text-sm">
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
        {step === 4 && <Button onClick={handleSubmit}>Submit</Button>}
      </div>
    </div>
  );
}
