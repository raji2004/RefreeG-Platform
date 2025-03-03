"use client";  // ✅ This makes it a Client Component

import { LucideRefreshCw } from "lucide-react";

export default function RefreshButton() {
  return (
    <LucideRefreshCw 
      className="cursor-pointer w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8" 
      onClick={() => window.location.reload()} 
    />
  );
}
