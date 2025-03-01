"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ChangeEmail() {
  const router = useRouter();
  const [currentEmail, setCurrentEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");

  const handleProceed = () => {
    if (currentEmail && newEmail) {
      setStep(2); // Move to OTP step
    }
  };

  const handleVerifyOtp = () => {
    if (otp.length === 4) {
      setStep(3); // Move to success step
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {step === 1 && (
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Current email</h2>
          <input
            type="email"
            placeholder="Enter your current email"
            className="w-full border p-2 rounded mb-4"
            value={currentEmail}
            onChange={(e) => setCurrentEmail(e.target.value)}
          />
          <h2 className="text-lg font-semibold mb-4">New email</h2>
          <input
            type="email"
            placeholder="Enter your new email"
            className="w-full border p-2 rounded mb-4"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <button
            onClick={handleProceed}
            className="w-full bg-blue-600 text-white p-3 rounded-lg"
          >
            Proceed ➜
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">
            Enter the 4-digit pin we sent to your new email
          </h2>
          <input
            type="text"
            placeholder="****"
            className="w-full border p-2 rounded mb-4 text-center text-lg tracking-widest"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={4}
          />
          <button
            onClick={handleVerifyOtp}
            className="w-full bg-blue-600 text-white p-3 rounded-lg"
          >
            Proceed ➜
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow text-center">
          <h2 className="text-lg font-semibold">
            Your email has been successfully changed
          </h2>
          <p className="mt-2 text-gray-600">
            You have successfully changed your email, please use the new one
            when logging in.
          </p>
          <button
            onClick={() => router.push("/profile")}
            className="w-full bg-black text-white p-3 rounded-lg mt-4"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
