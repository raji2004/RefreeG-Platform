
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase config settings
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase app
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

// Function to record transactions
export async function recordTransaction(paymentResponse: any, donorDetails: any, amount: number, isRecurring: boolean, causeId: string) {
  const transactionRef = doc(db, 'transactions', paymentResponse.transactionId);
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
  const causeRef = doc(db, 'causes', causeId);
  const causeDoc = await getDoc(causeRef);

  if (causeDoc.exists()) {
    const causeData = causeDoc.data();
    return causeData.fundingTarget;
  } else {
    throw new Error('Cause not found');
  }
}

// Refund logic for unmet targets
export async function issueRefund(transactionId: string) {
  const transactionRef = doc(db, 'transactions', transactionId);
  const transactionDoc = await getDoc(transactionRef);

  if (transactionDoc.exists()) {
    const transactionData = transactionDoc.data();
    // Here you would integrate your refund logic with Paystack/Stripe
    return { status: 'success', refunded: true };
  } else {
    throw new Error('Transaction not found');
  }
}

export { auth, db, app };
