import React from "react";
import { getCauseTransactions } from "@/lib/firebase/actions";
import DonationListClient from "./DonationListClient";

async function DonationList({ causeId }: { causeId: string }) {
  const causeTransactions = await getCauseTransactions(causeId);
  const donations = causeTransactions.map(transaction => {
    const transactionTime = new Date(transaction.timestamp);
    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
    const isRecent = transactionTime > twoHoursAgo;

    return {
      name: transaction.customer_name || "Anonymous",
      amount: `₦${transaction.amount.toLocaleString()}`,
      badgeText: isRecent ? "Recent" : "Transaction",
    };
  });

  return <DonationListClient donations={donations} totalCount={causeTransactions.length} />;
}

export default DonationList;
