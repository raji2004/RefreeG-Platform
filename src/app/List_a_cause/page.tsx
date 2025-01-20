import React from "react";
import Image from "next/image";
import StepperForm from "@/components/Listacause_component/stepper_form";

export default function Listacause() {
  return (
    <div className="w-full md:flex md:flex-row">
      <div className="w-5/12 md:px-14 md:py-20 px-4 py-4 bg-[#f3f7fc]">
        <div className="mb-80">
          <h3 className="text-[#2b2829] text-xl font-semibold font-montserrat">
            Welcome to the RefreeG cause listing!
          </h3>
          <p className="text-[#2b2829] text base font-montserrat">
            Let’s get your cause started :)
          </p>
        </div>
        <div>
          <p className="mb-6 text-[#0a0a0b] text-base font-medium font-montserrat">
            "Every act of giving brings us closer to a brighter, more united
            future. Your support isn’t just a donation—it’s a catalyst for
            change"
          </p>
          <div className="flex gap-3 items-center">
            <Image
              src="/List_a_cause/UserImg.svg"
              alt=""
              width={50}
              height={50}
            />
            <span>
              <h4>Unoagu Amadike Nomso</h4>
              <p>Developer, Refreeg</p>
            </span>
          </div>
        </div>
      </div>

      <div className="w-7/12 md:px-14 md:py-20 px-4 py-4">
        <StepperForm />
      </div>
    </div>
  );
}
