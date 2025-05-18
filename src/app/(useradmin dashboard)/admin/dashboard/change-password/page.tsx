"use client"; // Ensure this is at the top

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // ✅ Correct import for App Router
import { auth } from "@/lib/firebase/config";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { getSessionId } from "@/lib/helpers";
import { getUserById } from "@/lib/firebase/actions";

const ChangePassword = () => {
  const router = useRouter(); // ✅ This should now work properly

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Check authentication state when component mounts
  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const sessionId = await getSessionId();
        if (sessionId) {
          const user = await getUserById(sessionId);
          if (user && user.email) {
            setUserEmail(user.email);
          } else {
            setError("User email not found");
          }
        } else {
          setError("You must be logged in to change your password");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Error fetching user data");
      }
    };

    fetchUserEmail();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    
    // Check if user email is available
    if (!userEmail) {
      setError("You must be logged in to change your password. Please log in again.");
      return;
    }
    
    // Validate passwords match
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }
    
    // Validate password strength
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const user = auth.currentUser;
      
      if (!user) {
        throw new Error("User not authenticated");
      }
      
      // Re-authenticate user with current password
      const credential = EmailAuthProvider.credential(
        userEmail,
        currentPassword
      );
      
      await reauthenticateWithCredential(user, credential);
      
      // Update password
      await updatePassword(user, newPassword);
      
      // Show success message
      setSuccess(true);
    } catch (err) {
      console.error("Error changing password:", err);
      
      if (err instanceof Error) {
        // Handle specific Firebase errors
        if (err.message.includes("auth/wrong-password")) {
          setError("Current password is incorrect.");
        } else if (err.message.includes("auth/weak-password")) {
          setError("Password is too weak. Please choose a stronger password.");
        } else if (err.message.includes("auth/requires-recent-login")) {
          setError("This operation requires recent authentication. Please log in again before retrying.");
        } else if (err.message.includes("auth/user-token-expired")) {
          setError("Your session has expired. Please log in again.");
        } else {
          setError(err.message);
        }
      } else {
        setError("Failed to change password. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-full">
      {success ? (
        <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-md">
          <h2 className="text-xl font-semibold">
            Your password has been successfully changed
          </h2>
          <p className="mt-2">
            You have successfully changed your password. Please use the new one
            when next trying to login to your account.
          </p>
          <button
            className="mt-4 bg-black text-white px-4 py-2 rounded"
            onClick={() => router.push("/admin/dashboard/security")}
          >
            Close
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
        >
          <label className="block font-medium mb-1">Current password</label>
          <input
            type="password"
            className="w-full p-2 border rounded mb-3"
            placeholder="Enter your current password here..."
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />

          <label className="block font-medium mb-1">New password</label>
          <input
            type="password"
            className="w-full p-2 border rounded mb-3"
            placeholder="Enter your new password here..."
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            minLength={6}
          />

          <label className="block font-medium mb-1">
            Re-enter new password
          </label>
          <input
            type="password"
            className="w-full p-2 border rounded mb-3"
            placeholder="Re-enter your new password here..."
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded mt-3 flex justify-center items-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                Processing...
              </>
            ) : (
              "Proceed →"
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default ChangePassword;
