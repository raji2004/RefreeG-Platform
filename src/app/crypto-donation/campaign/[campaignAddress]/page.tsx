"use client";
import { client } from "../../client";
import { TierCard } from "../../../../components/TierCard";
import { useParams } from "next/navigation";
import { useState } from "react";
import { getContract, ThirdwebContract } from "thirdweb";
import { polygonAmoy } from "thirdweb/chains";
import { useActiveAccount, useReadContract } from "thirdweb/react";
import { CampaignHeader } from "@/components/CampaignHeader";
import { CampaignProgress } from "@/components/CampaignProgress";
import { CreateCampaignModal } from "@/components/CreateCampaignModal"; // Import the new component

export default function CampaignPage() {
  const account = useActiveAccount();
  const { campaignAddress } = useParams();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const contract = getContract({
    client: client,
    chain: polygonAmoy,
    address: campaignAddress as string,
  });

  // Name of the campaign
  const { data: name, isLoading: isLoadingName } = useReadContract({
    contract: contract,
    method: "function name() view returns (string)",
    params: [],
  });

  // Description of the campaign
  const { data: description } = useReadContract({
    contract,
    method: "function description() view returns (string)",
    params: [],
  });

  // Campaign deadline
  const { data: deadline, isLoading: isLoadingDeadline } = useReadContract({
    contract: contract,
    method: "function deadline() view returns (uint256)",
    params: [],
  });
  // Convert deadline to a date
  const deadlineDate = new Date(
    parseInt(deadline?.toString() as string) * 1000
  );
  // Check if deadline has passed
  const hasDeadlinePassed = deadlineDate < new Date();

  // Goal amount of the campaign
  const { data: goal, isLoading: isLoadingGoal } = useReadContract({
    contract: contract,
    method: "function goal() view returns (uint256)",
    params: [],
  });

  // Total funded balance of the campaign
  const { data: balance, isLoading: isLoadingBalance } = useReadContract({
    contract: contract,
    method: "function getContractBalance() view returns (uint256)",
    params: [],
  });

  // Calulate the total funded balance percentage
  const totalBalance = balance?.toString();
  const totalGoal = goal?.toString();
  let balancePercentage =
    (parseInt(totalBalance as string) / parseInt(totalGoal as string)) * 100;

  // If balance is greater than or equal to goal, percentage should be 100
  if (balancePercentage >= 100) {
    balancePercentage = 100;
  }

  // Get tiers for the campaign
  const { data: tiers, isLoading: isLoadingTiers } = useReadContract({
    contract: contract,
    method:
      "function getTiers() view returns ((string name, uint256 amount, uint256 backers)[])",
    params: [],
  });

  // Get owner of the campaign
  const { data: owner, isLoading: isLoadingOwner } = useReadContract({
    contract: contract,
    method: "function owner() view returns (address)",
    params: [],
  });

  // Get status of the campaign
  const { data: status } = useReadContract({
    contract,
    method: "function state() view returns (uint8)",
    params: [],
  });

  return (
    <div className="mx-auto max-w-7xl px-2 mt-4 sm:px-6 lg:px-8">
      <CampaignHeader
        name={name as string}
        owner={owner as string}
        account={account}
        status={status as number}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />
      <div className="my-4">
        <p className="text-lg font-semibold">Description:</p>
        <p>{description}</p>
      </div>
      <div className="mb-4">
        <p className="text-lg font-semibold">Deadline</p>
        {!isLoadingDeadline && <p>{deadlineDate.toDateString()}</p>}
      </div>
      {!isLoadingBalance && (
        <CampaignProgress
          goal={goal?.toString() as string}
          balance={balance?.toString() as string}
          balancePercentage={balancePercentage}
        />
      )}
      <div>
        <p className="text-lg font-semibold">Tiers:</p>
        <div className="grid grid-cols-3 gap-4">
          {isLoadingTiers ? (
            <p>Loading...</p>
          ) : tiers && tiers.length > 0 ? (
            tiers.map((tier, index) => (
              <TierCard
                key={index}
                tier={tier}
                index={index}
                contract={contract}
                isEditing={isEditing}
              />
            ))
          ) : (
            !isEditing && <p>No tiers available</p>
          )}
          {isEditing && (
            <button
              className="max-w-sm flex flex-col text-center justify-center items-center font-semibold p-6 bg-blue-500 text-white border border-slate-100 rounded-lg shadow"
              onClick={() => setIsModalOpen(true)}
            >
              + Add Tier
            </button>
          )}
        </div>
      </div>

      {isModalOpen && (
        <CreateCampaignModal
          setIsModalOpen={setIsModalOpen}
          contract={contract}
        />
      )}
    </div>
  );
}