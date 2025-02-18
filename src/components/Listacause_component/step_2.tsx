import React, { useState } from "react";
import Image from "next/image";

export default function Step2Form({ formData = {}, handleChange }) {
  const [dateValue, setDateValue] = useState(formData.deadline || "");
  const [goalAmount, setGoalAmount] = useState(formData.goalAmount || "0");

  const handleDateChange = (e) => {
    setDateValue(e.target.value);
    handleChange(e);
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
          <input
            type="text"
            name="deadline"
            value={dateValue}
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => {
              if (!e.target.value) e.target.type = "text";
            }}
            onChange={handleDateChange}
            placeholder="Deadline"
            className="px-[9px] py-[13px] border-b border-[#898384] w-full focus:outline-none text-[#898384] text-base font-medium font-montserrat bg-transparent"
          />
          <p className="text-[#5a5555] text-sm font-normal font-montserrat">
            *Note: This is when the cause will be delisted from the platform.
            <span className="text-sm font-medium font-montserrat underline cursor-pointer">
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
        <div className="relative flex items-center">
          <input
            type="text"
            name="goalAmount"
            value={goalAmount}
            onChange={(e) => {
              setGoalAmount(e.target.value);
              handleChange(e);
            }}
            placeholder="Goal Amount"
            className="px-[9px] py-[13px] border-b border-[#898384] w-full focus:outline-none text-[#898384] text-base font-medium font-montserrat bg-transparent"
          />
          <button
            type="button"
            onClick={decrementGoal}
            className="px-2 bg-white rounded-lg border-2 border-[#b5b3b3] mr-4"
          >
            -
          </button>
          <button
            type="button"
            onClick={incrementGoal}
            className="px-2 bg-white rounded-lg border-2 border-[#b5b3b3]"
          >
            +
          </button>
        </div>
      </form>
    </div>
  );
}
