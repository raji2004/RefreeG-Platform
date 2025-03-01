"use client";
import { useState } from "react";

export default function ChangeNumber() {
  const [step, setStep] = useState(1);
  const [currentPhone, setCurrentPhone] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [otp, setOtp] = useState("");

  const handleProceed = () => {
    if (step === 1 && currentPhone && newPhone) {
      setStep(2);
    } else if (step === 2 && otp.length === 4) {
      setStep(3);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {step === 1 && (
        <div className="w-full max-w-md">
          <label className="block text-gray-700 mb-2">
            Current phone number
          </label>
          <input
            type="text"
            placeholder="Enter your current phone number"
            value={currentPhone}
            onChange={(e) => setCurrentPhone(e.target.value)}
            className="w-full p-3 border rounded mb-4"
          />
          <label className="block text-gray-700 mb-2">New phone number</label>
          <input
            type="text"
            placeholder="Enter your new phone number"
            value={newPhone}
            onChange={(e) => setNewPhone(e.target.value)}
            className="w-full p-3 border rounded mb-4"
          />
          <button
            onClick={handleProceed}
            className="w-full bg-blue-500 text-white p-3 rounded"
          >
            Proceed →
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="w-full max-w-md">
          <label className="block text-gray-700 mb-2">
            Enter the 4-digit pin we just sent to your number
          </label>
          <input
            type="text"
            placeholder="****"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={4}
            className="w-full p-3 border rounded mb-4 text-center"
          />
          <button
            onClick={handleProceed}
            className="w-full bg-blue-500 text-white p-3 rounded"
          >
            Proceed →
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="w-full max-w-md text-center bg-white p-6 rounded shadow-md">
          <h2 className="text-lg font-semibold mb-2">
            Your number has been successfully changed
          </h2>
          <p className="text-gray-600 mb-4">
            You have successfully changed your phone number, please use the new
            one when next trying to log in to your account.
          </p>
          <button
            onClick={() => setStep(1)}
            className="bg-black text-white p-3 rounded w-full"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
