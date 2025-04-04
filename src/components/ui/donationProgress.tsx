"use client";

import React from "react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface DonationProgressProps {
  progressPercentage: number;
  isLoading?: boolean;
}

const DonationProgress: React.FC<DonationProgressProps> = ({
  progressPercentage,
  isLoading = false,
}) => {
  const hasReachedGoal = progressPercentage >= 100;

  return (
    <div className="w-full relative">
      <div className="relative h-10">
        <div
          className="absolute top-0 flex justify-center"
          style={{
            left: `${Math.min(progressPercentage, 97)}%`,
            transform: "translateX(-50%)",
            transition: "left 0.3s ease-out",
          }}
        >
          <span
            className={cn(
              "text-sm font-semibold px-2 py-1 rounded-md",
              isLoading
                ? "text-gray-500 bg-gray-100"
                : hasReachedGoal
                ? "text-green-600 bg-green-100"
                : "text-primary bg-primary-foreground shadow-sm"
            )}
          >
            {isLoading ? "..." : `${Math.round(progressPercentage)}%`}
          </span>
        </div>
        <div className="absolute bottom-0 w-full">
          {isLoading && (
            <div className="absolute inset-0 h-3 bg-gray-200 animate-pulse rounded-full"></div>
          )}

          <Progress
            className={cn("h-3 rounded-full", isLoading ? "opacity-70" : "")}
            value={hasReachedGoal ? 100 : progressPercentage}
            indicatorColor={
              isLoading
                ? "bg-gray-200"
                : hasReachedGoal
                ? "bg-green-500"
                : "bg-blue-600"
            }
          />
        </div>
      </div>
    </div>
  );
};

export default DonationProgress;