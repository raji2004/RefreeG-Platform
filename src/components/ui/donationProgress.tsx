"use client";

import React from "react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

// Define interface for component props
interface DonationProgressProps {
  progressPercentage: number;
}

// Functional component
const DonationProgress: React.FC<DonationProgressProps> = ({
  progressPercentage,
}) => {
  return (
    <div className="w-full">
      {/* Styled Progress Component */}
      <Progress
        className={cn("h-2 rounded-full bg-gray-300")}
        value={progressPercentage}
      />
    </div>
  );
};

export default DonationProgress;
