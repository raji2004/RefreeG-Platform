"use client";

import React from "react";
import Image from "next/image";
import { useFormContext, Controller } from "react-hook-form";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { DatePicker } from "@/components/ui/date-picker"; // Ensure correct import path
import { ChevronDown } from "lucide-react";

// Helper functions (if needed in future)
function numberToWords(num: number): string {
  const words = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
  ];
  return num <= 10 ? words[num] : num.toString();
}

function getTimeLeft(deadline: Date | null): string {
  if (!deadline) return "";
  const now = new Date();
  const diffTime = deadline.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays <= 0) return "Today";
  if (diffDays === 1) return "one day left";
  return `${numberToWords(diffDays)} days left`;
}

export const Form2 = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-x-3">
      <div className="mb-4">
        <h2 className="text-[#2b2829] text-xl font-medium font-montserrat">
          Help us give people information about the cause
        </h2>
        <p className="text-[#2b2829] text-sm font-normal font-montserrat">
          Choose the location where you plan to receive your funds.
        </p>
      </div>
      <div className="flex flex-col space-y-4 gap-5">
        {/* Cause Title Field */}
        <FormItem>
          <FormLabel>Cause Title</FormLabel>
          <FormControl>
            <input
              type="text"
              placeholder="Cause title"
              {...register("causeTitle")}
              className="px-[9px] py-[13px] border-b border-[#898384] w-full focus:outline-none text-[#898384] text-base font-medium font-montserrat"
            />
          </FormControl>
          {errors.causeTitle && (
            <FormMessage>{errors.causeTitle.message?.toString()}</FormMessage>
          )}
          <p className="text-[#5a5555] text-sm font-normal font-montserrat">
            *Note: Pick a short, attention-grabbing title.
          </p>
        </FormItem>

        {/* Cause Category Field */}
        <FormItem>
          <FormLabel>Cause Category</FormLabel>
          <FormControl>
            <div className="relative">
              <select
                {...register("causeCategory")}
                className="px-[9px] py-[13px] border-b border-[#898384] w-full focus:outline-none text-[#898384] text-base font-medium font-montserrat appearance-none bg-transparent"
              >
                <option value="">Cause Category</option>
                <option value="Education">Education</option>
                <option value="Health Care">Health Care</option>
                <option value="Women’s Empowerment">Women’s Empowerment</option>
                <option value="Youth Development">Youth Development</option>
                <option value="Economic Development">
                  Economic Development
                </option>
                <option value="Agriculture">Agriculture</option>
                <option value="Environment">Environment</option>
              </select>
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-[#898384]">
                <ChevronDown className="w-4 h-4" />
              </span>
            </div>
          </FormControl>
          {errors.causeCategory && (
            <FormMessage>
              {errors.causeCategory.message?.toString()}
            </FormMessage>
          )}
        </FormItem>

        {/* Deadline Field with DatePicker */}
        <FormItem>
          <FormLabel>Deadline</FormLabel>
          <FormControl>
            <Controller
              control={control}
              name="deadline"
              render={({ field }) => (
                <DatePicker
                  placeholder="Deadline"
                  defaultValue={field.value ? new Date(field.value) : undefined}
                  onChange={(selectedDate: Date | undefined) =>
                    field.onChange(
                      selectedDate
                        ? selectedDate.toISOString().split("T")[0]
                        : ""
                    )
                  }
                  className="w-full"
                />
              )}
            />
          </FormControl>
          {errors.deadline && (
            <FormMessage>{errors.deadline.message?.toString()}</FormMessage>
          )}
          <p className="text-[#5a5555] text-sm font-normal font-montserrat">
            *Note: This is when the cause will be delisted from the platform.{" "}
            <span className="inline-flex gap-1 items-center text-sm font-medium font-montserrat underline cursor-pointer">
              Learn more
              <Image
                src="/List_a_cause/BoxArrowUpRight.svg"
                alt="learn more"
                width={10}
                height={10}
              />
            </span>
          </p>
        </FormItem>

        {/* Goal Amount Field */}
        <FormItem>
          <FormLabel>Goal Amount</FormLabel>
          <FormControl>
            <Controller
              control={control}
              name="goalAmount"
              defaultValue="1000" // Start with a default value of 1000 instead of 0
              rules={{
                validate: (value) => {
                  const num = parseInt(value, 10);
                  return num >= 1 || "Goal amount must be at least 1";
                },
              }}
              render={({ field }) => {
                const goal = field.value || "1000"; // Fallback to 1000 if empty
                const incrementGoal = () => {
                  const newValue = (parseInt(goal, 10) + 1000).toString();
                  field.onChange(newValue);
                };
                const decrementGoal = () => {
                  const newValue = Math.max(
                    parseInt(goal, 10) - 1000,
                    1
                  ).toString(); // Minimum value is 1
                  field.onChange(newValue);
                };
                const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                  const value = e.target.value;
                  // Allow only numbers
                  if (value === "" || /^\d+$/.test(value)) {
                    field.onChange(value);
                  }
                };
                return (
                  <div className="relative">
                    <input
                      type="text"
                      value={goal}
                      onChange={handleInputChange}
                      placeholder="Goal Amount"
                      className="px-[9px] py-[13px] pr-20 border-b border-[#898384] w-full focus:outline-none text-[#898384] text-base font-medium font-montserrat bg-transparent"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-2 space-x-1">
                      <button
                        type="button"
                        onClick={decrementGoal}
                        className="w-7 px-2 bg-white rounded-lg border-2 border-[#b5b3b3]"
                      >
                        -
                      </button>
                      <button
                        type="button"
                        onClick={incrementGoal}
                        className="w-7 px-2 bg-white rounded-lg border-2 border-[#b5b3b3]"
                      >
                        +
                      </button>
                    </div>
                  </div>
                );
              }}
            />
          </FormControl>
          {errors.goalAmount && (
            <FormMessage>{errors.goalAmount.message?.toString()}</FormMessage>
          )}
          <p className="text-[#5a5555] text-sm font-normal font-montserrat">
            *Note: Enter the donation target you wish to achieve for your cause.
          </p>
        </FormItem>
      </div>
    </div>
  );
};
