import React from "react";

interface DonationProgressProps {
  currentAmount: number;
  goalAmount: number;
}

const DonationProgress: React.FC<DonationProgressProps> = ({
  currentAmount,
  goalAmount,
}) => {
  const progressPercentage = (currentAmount / goalAmount) * 100;

  // Determine progress bar style based on progress
  const isGoalReached = progressPercentage >= 100;
  const progressBarColor = isGoalReached
    ? "bg-red-600"
    : progressPercentage > 50
    ? "bg-gradient-to-r from-blue-500 to-blue-800"
    : "bg-blue-600";

  // Limit the width to 100% if the goal is reached
  const progressBarWidth = isGoalReached ? "100%" : `${progressPercentage}%`;

  return (
    <div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`${progressBarColor} h-2.5 rounded-full`}
          style={{ width: progressBarWidth }}
        ></div>
      </div>
    </div>
  );
};

export default DonationProgress;
