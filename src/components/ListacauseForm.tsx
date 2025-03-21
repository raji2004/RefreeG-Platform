"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form1 } from "@/app/cause/create/Form1/Form1Component";
import { Form2 } from "@/app/cause/create/Form2/Form2Component";
import { Form3 } from "@/app/cause/create/Form3/Form3Component";
import { Form4 } from "@/app/cause/create/Form4/Form4Component";

// Define the UploadedImage interface
export interface UploadedImage {
  src: string;
  name: string;
  size: number;
  progress: number;
  type: string;
  path?: string; // Optional path property
}

// Define the complete form data interface and Zod schema
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

const fullSchema = z.object({
  state: z.string().nonempty({ message: "State is required" }),
  zipCode: z.string().nonempty({ message: "ZIP Code is required" }),
  currency: z.string().nonempty({ message: "Currency type is required" }),
  causeTitle: z.string().nonempty({ message: "Cause title is required" }),
  causeCategory: z.string().nonempty({ message: "Cause category is required" }),
  deadline: z
    .string()
    .nonempty({ message: "Deadline is required" })
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Deadline must be a valid date",
    }),
  goalAmount: z.preprocess(
    (val) => {
      if (typeof val === "string") return parseFloat(val);
      return val;
    },
    z
      .number({ invalid_type_error: "Goal amount must be a number" })
      .min(1000, { message: "Goal amount must be at least 1000" })
      .transform((num) => num.toString())
  ),
  uploadedImage: z
    .object({
      src: z.string(),
      name: z.string(),
      size: z.number(),
      progress: z.number(),
      type: z.string(),
    })
    .nullable()
    .refine((img) => img !== null && img.progress >= 100, {
      message: "Image is required and must be fully uploaded",
    }),
});

// (Optional) Create step‑specific schemas if you need them
const step1Schema = fullSchema.pick({
  state: true,
  zipCode: true,
  currency: true,
});
const step2Schema = fullSchema.pick({
  causeTitle: true,
  causeCategory: true,
  deadline: true,
  goalAmount: true,
});
const step3Schema = z.object({
  uploadedImage: fullSchema.shape.uploadedImage,
});
const step4Schema = fullSchema.pick({ deadline: true, goalAmount: true });

export default function ListacauseForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [mounted, setMounted] = useState(false);
  const [cryptoSetupDone, setCryptoSetupDone] = useState<boolean>(false);

  // Retrieve initial data from localStorage if available
  const initialValues: FormData = (() => {
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
  })();

  const methods = useForm<FormData>({
    resolver: zodResolver(fullSchema),
    defaultValues: initialValues,
    mode: "onBlur",
  });

  const {
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = methods;

  // Save formData to localStorage on change
  useEffect(() => {
    const subscription = watch((value) => {
      localStorage.setItem("formData", JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  // Read cryptoSetupDone flag on mount
  useEffect(() => {
    const flag = localStorage.getItem("cryptoSetupDone");
    setCryptoSetupDone(flag === "true");
  }, []);

  // Mark component as mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  // Validate fields for the current step before advancing
  const handleNext = async () => {
    if (
      step === 1 &&
      watch("currency") === "Crypto Currency" &&
      !cryptoSetupDone
    ) {
      alert("Please setup your crypto donation before proceeding.");
      return;
    }
    let fieldNames: (keyof FormData)[] = [];
    if (step === 1) fieldNames = ["state", "zipCode", "currency"];
    if (step === 2)
      fieldNames = ["causeTitle", "causeCategory", "deadline", "goalAmount"];
    if (step === 3) fieldNames = ["uploadedImage"];
    if (step === 4) fieldNames = ["deadline", "goalAmount"];

    const valid = await trigger(fieldNames);
    if (valid) {
      setStep(step + 1);
    }
  };

  const onSubmit = async (data: FormData) => {
    console.log("Data ready for preview:", data);
    // Add your submit logic here.
  };

  if (!mounted) return null;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto flex flex-col">
        <div className="px-4">
          <Tabs
            value={`step-${step}`}
            onValueChange={(value) => {
              const newStep = Number(value.split("-")[1]);
              setStep(newStep);
            }}
          >
            <TabsList className="flex gap-8 my-20 md:my-8 mb-8">
              <TabsTrigger
                value="step-1"
                disabled={step < 1}
                completed={step > 1}
              ></TabsTrigger>
              <TabsTrigger
                value="step-2"
                disabled={step < 2}
                completed={step > 2}
              ></TabsTrigger>
              <TabsTrigger
                value="step-3"
                disabled={step < 3}
                completed={step > 3}
              ></TabsTrigger>
              <TabsTrigger value="step-4" disabled={step < 4}></TabsTrigger>
            </TabsList>

            <TabsContent value="step-1">
              <Form1 />
            </TabsContent>

            <TabsContent value="step-2">
              <Form2 />
            </TabsContent>

            <TabsContent value="step-3">
              <Form3 />
              {errors.uploadedImage && (
                <p className="text-red-500 text-sm">
                  {errors.uploadedImage.message as string}
                </p>
              )}
            </TabsContent>

            <TabsContent value="step-4">
              <Form4 />
            </TabsContent>
          </Tabs>
        </div>

        <hr className="border-t border-gray-300" />
        <div className="flex justify-between p-4">
          {step > 1 && (
            <Button
              type="button"
              variant="secondary"
              onClick={() => setStep(step - 1)}
            >
              Back
            </Button>
          )}
          {step < 4 && (
            <Button type="button" onClick={handleNext}>
              Next
            </Button>
          )}
        </div>
      </form>
    </FormProvider>
  );
}
