"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/firebase/config";
import { collection, addDoc } from "firebase/firestore";
import Form1 from "../Form1/Form1Component"; // Updated import path
import Form2 from "../Form2/Form2Component";
import Form3 from "../Form3/Form3Component";
import { Form4 } from "../Form4/Form4Component";

// Define the UploadedImage interface
export interface UploadedImage {
  src: string;
  name: string;
  size: number; // in KB
  progress: number;
  type: string;
}

export interface FormData {
  state: string;
  zipCode: string;
  currency: string;
  causeTitle: string;
  causeCategory: string;
  deadline: string;
  goalAmount: string;
  uploadedImage: UploadedImage | null;
}

export default function ListacauseForm() {
  const router = useRouter();

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
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
      | { target: { name: string; value: string } }
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      localStorage.setItem("formData", JSON.stringify(formData));
      const docRef = await addDoc(collection(db, "formSubmissions"), formData);
      console.log("Document written with ID: ", docRef.id);
      router.push("/List_a_cause/See_Preview/Success");
    } catch (error: any) {
      console.error("Error adding document: ", error.message);
    }
  };

  return (
    <div className="mx-auto flex flex-col">
      <div className="px-4">
        <Tabs
          value={`step-${step}`}
          onValueChange={(value) => {
            const newStep = Number(value.split("-")[1]);
            setStep(newStep);
          }}
        >
          <TabsList className="flex gap-8 my-20 md:my-8 mb-8">
            <TabsTrigger value="step-1" disabled={step < 1} />
            <TabsTrigger value="step-2" disabled={step < 2} />
            <TabsTrigger value="step-3" disabled={step < 3} />
            <TabsTrigger value="step-4" disabled={step < 4} />
          </TabsList>

          <TabsContent value="step-1">
            <Form1
              formData={formData}
              handleChange={handleChange}
              errors={errors}
            />
          </TabsContent>

          <TabsContent value="step-2">
            <Form2
              formData={formData}
              handleChange={handleChange}
              errors={errors}
            />
          </TabsContent>

          <TabsContent value="step-3">
            <Form3 formData={formData} handleImageUpload={handleImageUpload} />
            {errors.uploadedImage && (
              <p className="text-red-500 text-sm">{errors.uploadedImage}</p>
            )}
          </TabsContent>

          <TabsContent value="step-4">
            <Form4
              formData={formData}
              setFormData={setFormData}
              errors={errors}
            />
          </TabsContent>
        </Tabs>
      </div>

      <hr className="border-t border-gray-300" />
      <div className="flex justify-between p-4">
        {step > 1 && (
          <Button variant="secondary" onClick={() => setStep(step - 1)}>
            Back
          </Button>
        )}
        {step < 4 && <Button onClick={handleNext}>Next</Button>}
      </div>
    </div>
  );
}
