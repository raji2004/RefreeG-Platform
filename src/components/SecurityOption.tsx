// components/SecurityOption.tsx
"use client";

import { useRouter } from "next/navigation";

interface SecurityOptionProps {
  icon: string;
  label: string;
  path: string;
}

const SecurityOption = ({ icon, label, path }: SecurityOptionProps) => {
  const router = useRouter();

  return (
    <div
      className="flex items-center justify-between p-4 border-b last:border-b-0 cursor-pointer hover:bg-gray-100 rounded-md"
      onClick={() => path && router.push(path)}
    >
      <div className="flex items-center gap-3">
        <span className="text-xl">{icon}</span>
        <span className="text-gray-800">{label}</span>
      </div>
      <span className="text-gray-500">➔</span>
    </div>
  );
};

export default SecurityOption;
