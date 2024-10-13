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

  return (
    <div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <div className="mt-2 text-sm">
        <span>{progressPercentage.toFixed(1)}% funded</span>
      </div>
    </div>
  );
};

export default DonationProgress;
