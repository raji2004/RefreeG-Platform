"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form1 } from "@/app/cause/create/Form1/Form1Component";
import { Form2 } from "@/app/cause/create/Form2/Form2Component";
import { Form3 } from "@/app/cause/create/Form3/Form3Component";
import { Form4 } from "@/app/cause/create/Form4/Form4Component";
import { ChevronRight } from "lucide-react";

// Define the UploadedImage interface
export interface UploadedImage {
  src: string;
  name: string;
  size: number;
  progress: number;
  type: string;
  path?: string;
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
    .refine((img) => img !== null && img!.progress >= 100, {
      message: "Image is required and must be fully uploaded",
    }),
});

// Step-specific schemas (if needed)
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
const step3Schema = z.object({ uploadedImage: fullSchema.shape.uploadedImage });
const step4Schema = fullSchema.pick({ deadline: true, goalAmount: true });

export default function ListacauseForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [mounted, setMounted] = useState(false);

  // Retrieve initial data from localStorage
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

  // Persist form data to localStorage on change
  useEffect(() => {
    const subscription = watch((value) => {
      localStorage.setItem("formData", JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  // Mark component as mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  // Validate fields for the current step before advancing
  const handleNext = async () => {
    let fieldNames: (keyof FormData)[] = [];
    if (step === 1) fieldNames = ["state", "zipCode"];
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
            {/* Custom step indicators instead of TabsList/TabsTrigger */}
            <div className="flex gap-8 my-20 md:my-8 mb-8 justify-start">
              <div 
                onClick={() => step >= 1 && setStep(1)}
                className={`w-10 h-2 rounded-md cursor-pointer transition-colors ${step >= 1 ? (step === 1 ? 'bg-blue-600' : 'bg-[#E6EEF8]') : 'bg-[#E6EEF8] cursor-not-allowed'}`}
              />
              <div 
                onClick={() => step >= 2 && setStep(2)}
                className={`w-10 h-2 rounded-md cursor-pointer transition-colors ${step >= 2 ? (step === 2 ? 'bg-blue-600' : 'bg-gray-300') : 'bg-gray-200 cursor-not-allowed'}`}
              />
              <div 
                onClick={() => step >= 3 && setStep(3)}
                className={`w-10 h-2 rounded-md cursor-pointer transition-colors ${step >= 3 ? (step === 3 ? 'bg-blue-600' : 'bg-gray-300') : 'bg-gray-200 cursor-not-allowed'}`}
              />
              <div 
                onClick={() => step >= 4 && setStep(4)}
                className={`w-10 h-2 rounded-md cursor-pointer transition-colors ${step >= 4 ? (step === 4 ? 'bg-blue-600' : 'bg-gray-300') : 'bg-gray-200 cursor-not-allowed'}`}
              />
            </div>

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
            <Button
            type="button"
            onClick={handleNext}
            variant="ghost"                       
            className="
              bg-[#0070E0]                        
              hover:bg-[#005BB5]                  
              text-white                          
              px-20 py-5                          
              flex items-center gap-2            
            "
          >
            Proceed
            <Image
              src="/List_a_cause/chevronRight2.svg"
              alt="Proceed"
              width={20}
              height={20}
              className="filter invert"           
            />
          </Button>
          
          )}
        </div>
      </form>
    </FormProvider>
  );
}
