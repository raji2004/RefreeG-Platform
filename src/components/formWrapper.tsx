"use client"; // Add this line

import { useRouter } from "next/navigation";
import Image from "next/image";
import { FormProgressBar } from "./progressBar";
import { Button } from "./ui/button";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function FormWrapper({
  step,
  children,
  hideProgressBar,
  login ,
  hideSidebar
}: {
  step?: number;
  children: ReactNode;
  hideProgressBar?: boolean;
  login?: boolean;
  hideSidebar?:boolean;
}) {
  const router = useRouter(); // Initialize useRouter for navigation

  const handleLoginClick = () => {
    if (!login) {
      router.push("/login"); // Navigate to login page
    } else {
      router.push("/signup"); // Navigate to signup if it's in the 'Join Refreeg today!' state
    }
  };

  return (
    <div className="flex">
      { !hideSidebar &&
      <div className="hidden md:block w-[35%] p-6 bg-primaryShades-100/30 h-screen">
        <Image src="/logo.svg" alt="logo" width={100} height={100} />

        <div className="flex items-center gap-1 mt-14">
          <Image src="/signin/welcome.svg" alt="icon" width={130} height={130} />
          <h1 className="text-2xl font-bold text-neutral-700">Welcome to RefreeG</h1>
        </div>
        <p className="text-palette-baseBlack mt-5">
          Start your journey with RefreeG today—empower lives, support causes, and make a lasting impact. Your account is the first step towards creating positive change!
        </p>

        <p className="font-semibold text-palette-baseBlack mt-14">
          {'“Join us in building a better tomorrow. Your support can spark the change we need.”'}
        </p>
        <div className="flex gap-2 mt-3">
          <Image src="/signin/ceo.svg" alt="quote" width={60} height={60} />
          <div className="w-36">
            <p className="text-xs font-semibold">Angulu Adeiza Julius</p>
            <p className="text-xs">Chief Executive Officer of Refreeg</p>
          </div>
        </div>
      </div>
}
      <div className={cn("w-full md:w-[65%] p-6 flex flex-col items-center", hideSidebar && ' md:w-full ')}>
        <div className="w-full flex items-center justify-center">
          {!hideProgressBar && step !== undefined && (
            <FormProgressBar currentStep={step} totalSteps={5} className="w-[50%] ml-auto" />
          )}

          {/* Handle login/signup navigation on button click */}
          <Button variant={"outline"} className="ml-auto" onClick={handleLoginClick}>
            {login ? "Join Refreeg today!" : "Login"}
          </Button>
        </div>

        <div className={`flex-grow flex justify-center  items-center w-full md:w-fit h-screen md:h-fit ${hideSidebar ? 'md:w-full  md:h-screen' : ''}`}>{children}</div>
      </div>
    </div>
  );
};
