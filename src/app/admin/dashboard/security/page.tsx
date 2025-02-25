"use client";

import SecurityOption from "../../../../components/SecurityOption";

const Security = () => {
  const securityOptions = [
    { icon: "🔘", label: "2FA toggle switch", path: "" },
    { icon: "👁", label: "Visibility control", path: "" },
    { icon: "📧", label: "Change email", path: "/admin/dashboard/change-email" },
    { icon: "📞", label: "Change number", path: "/admin/dashboard/change-number" },
    {
      icon: "🔒",
      label: "Change password",
      path: "/admin/dashboard/change-password",
    },
    { icon: "💾", label: "Data and storage", path: "" },
  ];

  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-2xl font-semibold mb-4">Security Settings</h2>
      <div className="bg-white rounded-lg shadow p-4">
        {securityOptions.map((option, index) => (
          <SecurityOption
            key={index}
            icon={option.icon}
            label={option.label}
            path={option.path}
          />
        ))}
      </div>
    </div>
  );
};

export default Security;
