import React, { useState } from "react";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Step2Form({ formData = {}, handleChange }) {
  // Initialize dateValue as a Date object if provided, or null
  const initialDate = formData.deadline ? new Date(formData.deadline) : null;
  const [dateValue, setDateValue] = useState(initialDate);
  const [goalAmount, setGoalAmount] = useState(formData.goalAmount || "0");

  const handleDateChange = (date) => {
    setDateValue(date);
    // Convert date to ISO string for consistency; adjust if needed
    handleChange({
      target: { name: "deadline", value: date ? date.toISOString() : "" },
    });
  };

  const incrementGoal = () => {
    const newValue = (parseInt(goalAmount, 10) + 1000).toString();
    setGoalAmount(newValue);
    handleChange({ target: { name: "goalAmount", value: newValue } });
  };

  const decrementGoal = () => {
    const newValue = Math.max(parseInt(goalAmount, 10) - 1000, 0).toString();
    setGoalAmount(newValue);
    handleChange({ target: { name: "goalAmount", value: newValue } });
  };

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
      <form action="" className="flex flex-col space-y-4 gap-5">
        <div>
          <input
            type="text"
            name="causeTitle"
            value={formData.causeTitle}
            onChange={handleChange}
            placeholder="Cause title"
            className="px-[9px] py-[13px] border-b border-[#898384] w-full focus:outline-none text-[#898384] text-base font-medium font-montserrat"
          />
          <p className="text-[#5a5555] text-sm font-normal font-montserrat">
            *Note: Pick a short, attention-grabbing title.
          </p>
        </div>

        <div className="relative">
          <select
            name="causeCategory"
            value={formData.causeCategory}
            onChange={handleChange}
            className="px-[9px] py-[13px] border-b border-[#898384] w-full focus:outline-none text-[#898384] text-base font-medium font-montserrat appearance-none bg-transparent"
          >
            <option value="">Cause Category</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-[#898384]">
            ▼
          </span>
        </div>

        <div className="relative">
          <DatePicker
            selected={dateValue}
            onChange={handleDateChange}
            dateFormat="MM/dd/yyyy"
            placeholderText="Deadline"
            className="px-[9px] py-[13px] border-b border-[#898384] w-full focus:outline-none text-[#898384] text-base font-medium font-montserrat bg-transparent"
          />
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
        </div>

        {/* Goal Amount Input */}
        <div className="relative">
          <input
            type="text"
            name="goalAmount"
            value={goalAmount}
            onChange={(e) => {
              setGoalAmount(e.target.value);
              handleChange(e);
            }}
            placeholder="Goal Amount"
            className="px-[9px] py-[13px] pr-20 border-b border-[#898384] w-full focus:outline-none text-[#898384] text-base font-medium font-montserrat bg-transparent"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-2 space-x-1">
            <button
              type="button"
              onClick={decrementGoal}
              className="w-7 px-2 bg-white rounded-lg border-2 border-[#b5b3b3]"
            >
              +
            </button>
            <button
              type="button"
              onClick={incrementGoal}
              className="w-7 px-2 bg-white rounded-lg border-2 border-[#b5b3b3]"
            >
              -
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
