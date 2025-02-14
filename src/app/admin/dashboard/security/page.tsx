"use client";

import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

const Security = () => {
  const router = useRouter();

  const securityOptions = [
    { icon: "🔘", label: "2FA toggle switch" },
    { icon: "👁", label: "Visibility control" },
    { icon: "📧", label: "Change email" },
    { icon: "📞", label: "Change number" },
    { icon: "🔒", label: "Change password" },
    { icon: "💾", label: "Data and storage" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex flex-col w-full">
        {/* Topbar */}
        <Topbar />

        {/* Security Settings */}
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Security Settings</h2>
          <div className="bg-white rounded-lg shadow p-4">
            {securityOptions.map((option, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border-b last:border-b-0 cursor-pointer hover:bg-gray-100 rounded-md"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{option.icon}</span>
                  <span className="text-gray-800">{option.label}</span>
                </div>
                <span className="text-gray-500">➔</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Security;
