"use client";

import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

const Security = () => {
  const router = useRouter();

  const securityOptions = [
    { icon: "🔘", label: "2FA toggle switch", path: "" },
    { icon: "👁", label: "Visibility control", path: "" },
    { icon: "📧", label: "Change email", path: "" },
    { icon: "📞", label: "Change number", path: "" },
    {
      icon: "🔒",
      label: "Change password",
      path: "/admin/dashboard/change-password",
    },
    { icon: "💾", label: "Data and storage", path: "" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Topbar (Navbar) */}
      <Topbar />

      {/* Main Content Area */}
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Security Settings */}
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Security Settings</h2>
          <div className="bg-white rounded-lg shadow p-4">
            {securityOptions.map((option, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border-b last:border-b-0 cursor-pointer hover:bg-gray-100 rounded-md"
                onClick={() => option.path && router.push(option.path)}
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
