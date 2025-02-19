"use client";

type CampaignProgressProps = {
  goal: string;
  balance: string;
  balancePercentage: number;
};

export const CampaignProgress = ({
  goal,
  balance,
  balancePercentage,
}: CampaignProgressProps) => {
  return (
    <div className="mb-4">
      <p className="text-lg font-semibold">Campaign Goal: ${goal}</p>
      <div className="relative w-full h-6 bg-gray-200 rounded-full dark:bg-gray-700">
        <div
          className="h-6 bg-blue-600 rounded-full dark:bg-blue-500 text-right"
          style={{ width: `${balancePercentage?.toString()}%` }}
        >
          <p className="text-white dark:text-white text-xs p-1">${balance}</p>
        </div>
        <p className="absolute top-0 right-0 text-white dark:text-white text-xs p-1">
          {balancePercentage >= 100 ? "" : `${balancePercentage?.toString()}%`}
        </p>
      </div>
    </div>
  );
};