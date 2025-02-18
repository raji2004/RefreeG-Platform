import React, { useState } from "react";
import Image from "next/image";

export default function Step2() {
  const [dateValue, setDateValue] = useState("");
  const [goalAmount, setGoalAmount] = useState("0"); // State to track goal amount

  const incrementGoal = () => setGoalAmount((prev) => prev + 1);
  const decrementGoal = () =>
    setGoalAmount((prev) => {
      const newValue = Math.max(parseInt(prev, 10) - 1, 0);
      return newValue.toString();
    });

  return (
    <div className="space-x-3">
      <form action="" className="flex flex-col space-y-4 gap-5">
        <div>
          <input
            type="text"
            placeholder="Cause title"
            className="px-[9px] py-[13px] border-b border-[#898384] w-full focus:outline-none text-[#898384] text-base font-medium font-montserrat"
          />
          <p className="text-[#5a5555] text-sm font-normal font-montserrat">
            *Note: pick a short, attention-grabbing title.
          </p>
        </div>
        <div className="relative">
          <select className="px-[9px] py-[13px] border-b border-[#898384] w-full focus:outline-none text-[#898384] text-base font-medium font-montserrat appearance-none bg-transparent">
            <option value="" disabled selected>
              Cause Category
            </option>
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
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => {
              if (!e.target.value) e.target.type = "text";
            }}
            value={dateValue}
            onChange={(e) => setDateValue(e.target.value)}
            placeholder="Deadline"
            className="px-[9px] py-[13px] border-b border-[#898384] w-full focus:outline-none text-[#898384] text-base font-medium font-montserrat bg-transparent"
          />
          <p className="text-[#5a5555] text-sm font-normal font-montserrat gap-1 flex">
            *Note: This is when the cause will be delisted from the platform.
            <span className="text-sm font-medium font-montserrat underline cursor-pointer flex gap-1">
              Learn more{" "}
              <Image
                src="/List_a_cause/BoxArrowUpRight.svg"
                alt="learn more"
                width={10}
                height={10}
              />{" "}
            </span>
          </p>
        </div>
        {/* Goal Amount Input */}
        <div className="relative flex items-center">
          <input
            type="text"
            value={goalAmount}
            onChange={(e) => setGoalAmount(e.target.value)}
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
