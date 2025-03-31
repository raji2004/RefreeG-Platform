"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase/config";
import { RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, updatePhoneNumber, multiFactor, PhoneMultiFactorGenerator } from "firebase/auth";
import { updateUserById } from "@/lib/firebase/actions";
import { getSessionId } from "@/lib/helpers";
import { getUserById } from "@/lib/firebase/actions";

// Helper to initialize recaptcha once
let recaptchaVerifier: RecaptchaVerifier | null = null;
let verificationId: string | null = null;

export default function ChangeNumber() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [currentPhone, setCurrentPhone] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserPhone = async () => {
      try {
        const sessionId = await getSessionId();
        if (sessionId) {
          const user = await getUserById(sessionId);
          if (user && user.phoneNumber) {
            setCurrentPhone(user.phoneNumber);
          }
        }
      } catch (error) {
        console.error("Error fetching user phone:", error);
      }
    };

    fetchUserPhone();
  }, []);

  const setupRecaptcha = () => {
    if (!recaptchaVerifier) {
      recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        }
      });
    }
  };

  const handleSendOTP = async () => {
    setIsLoading(true);
    setError("");
    
    try {
      // Format phone number to E.164 format if needed
      const formattedPhone = newPhone.startsWith('+') ? newPhone : `+${newPhone}`;
      
      setupRecaptcha();
      
      if (!recaptchaVerifier) {
        throw new Error("reCAPTCHA not initialized");
      }

      // Send verification code
      const confirmationResult = await signInWithPhoneNumber(
        auth, 
        formattedPhone,
        recaptchaVerifier
      );
      
      // Save the verification ID for later use
      verificationId = confirmationResult.verificationId;
      
      // Move to OTP verification step
      setStep(2);
    } catch (error) {
      console.error("Error sending verification code:", error);
      
      // Check for specific Firebase errors
      if (error instanceof Error) {
        const errorMessage = error.message || "";
        
        if (errorMessage.includes("auth/operation-not-allowed")) {
          setError("Phone authentication is not enabled in Firebase. Please contact the administrator.");
        } else if (errorMessage.includes("auth/invalid-phone-number")) {
          setError("The phone number format is incorrect. Please enter a valid phone number with country code (e.g., +1234567890).");
        } else if (errorMessage.includes("auth/quota-exceeded")) {
          setError("SMS quota exceeded. Please try again later.");
        } else {
          setError(error.message || "Failed to send verification code");
        }
      } else {
        setError("Failed to send verification code");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    setIsLoading(true);
    setError("");
    
    try {
      if (!verificationId) {
        throw new Error("Verification ID not found");
      }

      const user = auth.currentUser;
      if (!user) {
        throw new Error("User not authenticated");
      }

      // Create credential with the verification ID and OTP
      const credential = PhoneAuthProvider.credential(verificationId, otp);
      
      // Update phone number in Firebase Auth
      await updatePhoneNumber(user, credential);
      
      // Update phone number in Firestore
      await updateUserById(user.uid, { phoneNumber: newPhone });
      
      // Move to success step
      setStep(3);
    } catch (error) {
      console.error("Error verifying code:", error);
      setError(error instanceof Error ? error.message : "Failed to verify code");
    } finally {
      setIsLoading(false);
    }
  };

  const handleProceed = () => {
    if (step === 1 && currentPhone && newPhone) {
      handleSendOTP();
    } else if (step === 2 && otp.length === 4) {
      handleVerifyOTP();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {/* Invisible reCAPTCHA container */}
      <div id="recaptcha-container"></div>
      
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
            disabled={isLoading}
            className="w-full bg-blue-500 text-white p-3 rounded flex justify-center items-center"
          >
            {isLoading ? (
              <>
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                Sending...
              </>
            ) : (
              "Proceed →"
            )}
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
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
            disabled={isLoading}
            className="w-full bg-blue-500 text-white p-3 rounded flex justify-center items-center"
          >
            {isLoading ? (
              <>
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                Verifying...
              </>
            ) : (
              "Proceed →"
            )}
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
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
            onClick={() => router.push("/admin/dashboard")}
            className="bg-black text-white p-3 rounded w-full"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
