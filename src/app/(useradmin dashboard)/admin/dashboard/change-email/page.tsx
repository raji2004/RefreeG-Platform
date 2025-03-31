"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  verifyBeforeUpdateEmail,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { updateUserById } from "@/lib/firebase/actions";
import { auth } from "@/lib/firebase/config";
import { getSessionId } from "@/lib/helpers";
import { getUserById } from "@/lib/firebase/actions";

export default function ChangeEmail() {
  const router = useRouter();
  const [currentEmail, setCurrentEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [step, setStep] = useState(1);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const sessionId = await getSessionId();
        if (sessionId) {
          const user = await getUserById(sessionId);
          if (user && user.email) {
            setCurrentEmail(user.email);
          }
        }
      } catch (error) {
        console.error("Error fetching user email:", error);
      }
    };

    fetchUserEmail();
  }, []);

  const handleProceed = () => {
    if (currentEmail && newEmail) {
      setStep(2); // Move to password step
    }
  };

  const handleVerifyPassword = async () => {
    setIsLoading(true);
    setError("");

    try {
      const user = auth.currentUser;
      console.log(user);
      if (!user) {
        throw new Error("User not authenticated");
      }

      // Reauthenticate with current password
      const credential = EmailAuthProvider.credential(
        user.email || currentEmail,
        password
      );
      await reauthenticateWithCredential(user, credential);

      console.log("User reauthenticated");

      // Send verification email to the new email address
      await verifyBeforeUpdateEmail(user, newEmail);

      // Update email in database
      // Note: The auth email won't actually change until the user clicks the verification link
      await updateUserById(user.uid, { email: newEmail });

      // Move to verification step
      setStep(3);
    } catch (error) {
      console.error("Error updating email:", error);
      setError(
        error instanceof Error ? error.message : "Failed to update email"
      );
    } finally {
      setIsLoading(false);
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
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      )}

      {step === 2 && (
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">
            Enter your password to confirm
          </h2>
          <input
            type="password"
            placeholder="Password"
            className="w-full border p-2 rounded mb-4 text-center text-lg tracking-widest"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleVerifyPassword}
            disabled={isLoading}
            className="w-full bg-blue-600 text-white p-3 rounded-lg flex justify-center items-center"
          >
            {isLoading ? (
              <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
            ) : null}
            {isLoading ? "Processing..." : "Proceed ➜"}
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      )}

      {step === 3 && (
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow text-center">
          <h2 className="text-lg font-semibold">Verification email sent</h2>
          <p className="mt-2 text-gray-600">
            A verification email has been sent to {newEmail}. Please check your
            inbox and click the verification link to complete the email change
            process.
          </p>
          <button
            onClick={() => router.push("/admin/dashboard")}
            className="w-full bg-black text-white p-3 rounded-lg mt-4"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
