"use client";

import React from "react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

// Define interface for component props
interface DonationProgressProps {
  currentAmount: number;
  goalAmount: number;
}

// Functional component
const DonationProgress: React.FC<DonationProgressProps> = ({
  currentAmount,
  goalAmount,
}) => {
  // Calculate progress percentage
  const progressPercentage = Math.min((currentAmount / goalAmount) * 100, 100);

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
