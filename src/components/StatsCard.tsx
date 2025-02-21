import React from "react";

interface StatsCardProps {
  title: string;
  progress: number; // Progress percentage (e.g., 90)
  amount: string; // Amount donated (e.g., "N200,000.00")
  percentageIncrease: string; // Percentage increase (e.g., "20% more than 7 days ago")
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  progress,
  amount,
  percentageIncrease,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">{title}</h3>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
        <div
          className="bg-blue-500 h-2.5 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Progress Percentage */}
      <p className="text-sm text-gray-600 mb-2">{progress}% complete</p>

      {/* Amount Donated */}
      <p className="text-2xl font-bold text-gray-900 mb-2">{amount}</p>

      {/* Percentage Increase */}
      <p className="text-sm text-green-500">{percentageIncrease}</p>
    </div>
  );
};

export default StatsCard;
