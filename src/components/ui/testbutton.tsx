// components/TestProfileLink.tsx
"use client";

import { useRouter } from "next/navigation";
import { getSessionId } from "@/lib/helpers";
import { useEffect, useState } from "react";

export function TestProfileLink() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await getSessionId();
      setUserId(id);
    };
    fetchUserId();
  }, []);

  const handleClick = () => {
    if (userId) {
      router.push(`/profile/${userId}`);
    } else {
      alert("Please log in first");
    }
  };

  return (
    <button
      onClick={handleClick}
      className=" bg-blue-500 text-white px-4 py-2 rounded-md z-50"
    >
      View Profile
    </button>
  );
}
