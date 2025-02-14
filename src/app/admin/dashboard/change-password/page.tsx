import { useState } from "react";
import { useRouter } from "next/router";
import Topbar from "../../../../components/Topbar";
import Sidebar from "../../../../components/Sidebar";

const ChangePassword = () => {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      // Simulate API call for password change
      setTimeout(() => setSuccess(true), 1000);
    } else {
      alert("New passwords do not match.");
    }
  };

  if (success) {
    return (
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Topbar />
          <div className="flex justify-center items-center h-full">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-md">
              <h2 className="text-xl font-semibold">
                Your password has been successfully changed
              </h2>
              <p className="mt-2">
                You have successfully changed your password. Please use the new
                one when next trying to login to your account.
              </p>
              <button
                className="mt-4 bg-black text-white px-4 py-2 rounded"
                onClick={() => router.push("/security")}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <div className="flex justify-center items-center h-full">
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
            />

            <label className="block font-medium mb-1">New password</label>
            <input
              type="password"
              className="w-full p-2 border rounded mb-3"
              placeholder="Enter your new password here..."
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
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
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded mt-3"
            >
              Proceed →
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
