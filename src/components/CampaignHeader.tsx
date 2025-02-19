"use client";

import { useActiveAccount } from "thirdweb/react";
import { useState } from "react";

type CampaignHeaderProps = {
  name: string;
  owner: string;
  account: ReturnType<typeof useActiveAccount>;
  status: number;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
};

export const CampaignHeader = ({
  name,
  owner,
  account,
  status,
  isEditing,
  setIsEditing,
}: CampaignHeaderProps) => {
  return (
    <div className="flex flex-row justify-between items-center">
      <p className="text-4xl font-semibold">{name}</p>
      {owner === account?.address && (
        <div className="flex flex-row">
          {isEditing && (
            <p className="px-4 py-2 bg-gray-500 text-white rounded-md mr-2">
              Status:
              {status === 0
                ? " Active"
                : status === 1
                ? " Successful"
                : status === 2
                ? " Failed"
                : "Unknown"}
            </p>
          )}
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Done" : "Edit"}
          </button>
        </div>
      )}
    </div>
  );
};