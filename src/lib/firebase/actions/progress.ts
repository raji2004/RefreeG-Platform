// lib/firebase/progress.ts
import { db } from "@/lib/firebase/config";
import { doc, updateDoc, increment, getDoc } from "firebase/firestore";

/**
 * Updates the raised amount for a specific cause in Firestore
 * @param causeId - ID of the cause to update
 * @param amount - Amount to increment the raisedAmount by
 * @throws Error if the update fails
 */
export async function updateCauseRaisedAmount(causeId: string, amount: number) {
  try {
    const causeRef = doc(db, "causes", causeId);
    await updateDoc(causeRef, {
      raisedAmount: increment(amount),
    });
  } catch (error) {
    console.error("Error updating cause raised amount:", error);
    throw error;
  }
}

/**
 * Gets the current raised amount for a cause
 * @param causeId - ID of the cause to check
 * @returns The current raised amount
 */
export async function getCauseRaisedAmount(causeId: string): Promise<number> {
  try {
    const causeRef = doc(db, "causes", causeId);
    const causeSnap = await getDoc(causeRef);

    if (causeSnap.exists()) {
      return causeSnap.data().raisedAmount || 0;
    }
    return 0;
  } catch (error) {
    console.error("Error getting cause raised amount:", error);
    return 0;
  }
}

/**
 * Calculates the progress percentage for a cause
 * @param raisedAmount - Amount raised so far
 * @param goalAmount - Total fundraising goal
 * @returns Percentage of goal achieved (0-100)
 */
export function calculateProgressPercentage(
  raisedAmount: number,
  goalAmount: number
): number {
  if (goalAmount <= 0) return 0;
  const percentage = (raisedAmount / goalAmount) * 100;
  return Math.min(percentage, 100); // Cap at 100%
}

export const updateCauseDonationStats = async (
  causeId: string,
  amount: number
) => {
  const causeRef = doc(db, "causes", causeId);
  await updateDoc(causeRef, {
    raisedAmount: increment(amount),
    donationCount: increment(1),
  });
};
