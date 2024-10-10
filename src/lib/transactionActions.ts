// transactionActions.ts
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase/config"; // Ensure you import db from your config

// Function to record transactions
export async function recordTransaction(
  paymentResponse: any,
  donorDetails: any,
  amount: number,
  isRecurring: boolean,
  causeId: string
) {
  const transactionRef = doc(db, "transactions", paymentResponse.transactionId);
  await setDoc(transactionRef, {
    donorDetails,
    amount,
    isRecurring,
    causeId,
    paymentStatus: paymentResponse.status,
    transactionDate: new Date().toISOString(),
  });
}

// Function to check funding targets
export async function checkFundingTargets(causeId: string) {
  const causeRef = doc(db, "causes", causeId);
  const causeDoc = await getDoc(causeRef);

  if (causeDoc.exists()) {
    const causeData = causeDoc.data();
    return causeData.fundingTarget;
  } else {
    throw new Error("Cause not found");
  }
}

// Refund logic for unmet targets
export async function issueRefund(transactionId: string) {
  const transactionRef = doc(db, "transactions", transactionId);
  const transactionDoc = await getDoc(transactionRef);

  if (transactionDoc.exists()) {
    const transactionData = transactionDoc.data();
    // Here you would integrate your refund logic with Paystack/Stripe
    return { status: "success", refunded: true };
  } else {
    throw new Error("Transaction not found");
  }
}
