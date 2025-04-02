"use client";

import { useState, useEffect } from "react";
import { BrowserProvider, ethers } from "ethers";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { db } from "@/lib/firebase/config";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import Link from "next/link";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import { updateCauseRaisedAmount } from "@/lib/firebase/actions/progress";
import { getSessionId } from "@/lib/helpers";

const DEFAULT_MATIC_TO_NAIRA_RATE = 302.51;

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

interface MaticDonationButtonProps {
  causeId: string;
  onDonationSuccess?: (amountInNaira: number) => void;
}

export default function MaticDonationButton({
  causeId,
  onDonationSuccess,
}: MaticDonationButtonProps) {
  const [donationAmount, setDonationAmount] = useState<string>("0.1");
  const [nairaEquivalent, setNairaEquivalent] = useState<string>("30.25");
  const [exchangeRate] = useState<number>(DEFAULT_MATIC_TO_NAIRA_RATE);
  const [isDonating, setIsDonating] = useState<boolean>(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [recipientAddress, setRecipientAddress] = useState<string | null>(null);
  const [isLoadingAddress, setIsLoadingAddress] = useState<boolean>(true);
  const params = useParams();

  useEffect(() => {
    const amount = parseFloat(donationAmount);
    if (!isNaN(amount) && amount > 0) {
      const nairaValue = (amount * exchangeRate).toFixed(2);
      setNairaEquivalent(nairaValue);
    } else {
      setNairaEquivalent("0.00");
    }
  }, [donationAmount, exchangeRate]);

  useEffect(() => {
    const fetchRecipientAddress = async () => {
      try {
        const causeDocRef = doc(db, "causes", causeId);
        const causeDoc = await getDoc(causeDocRef);

        if (!causeDoc.exists()) {
          throw new Error("Cause not found");
        }

        const causeData = causeDoc.data();
        const creatorId = causeData.userId;

        const userDocRef = doc(db, "users", creatorId);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
          throw new Error("Creator not found");
        }

        const userData = userDoc.data();

        if (userData.cryptoWallets?.["matic"]) {
          setRecipientAddress(userData.cryptoWallets["matic"]);
        } else {
          setRecipientAddress(null);
        }
      } catch (err) {
        console.error("Error fetching recipient address:", err);
        setError("Failed to load recipient wallet information");
        setRecipientAddress(null);
      } finally {
        setIsLoadingAddress(false);
      }
    };

    fetchRecipientAddress();
  }, [causeId]);

  const logTransaction = async (
    causeId: string,
    txHash: string,
    amountInMatic: number,
    amountInNaira: number,
    walletAddress: string,
    recipientAddress: string
  ) => {
    try {
      const userId = await getSessionId();
      if (!userId) {
        console.error("User not logged in - transaction not logged");
        return;
      }

      const transactionsRef = collection(db, "transactions");
      const newTransactionRef = doc(transactionsRef);

      await setDoc(newTransactionRef, {
        causeId,
        txHash,
        amountInMatic,
        amountInNaira,
        walletAddress,
        recipientAddress,
        userId,
        paymentMethod: "MATIC",
        status: "completed",
        timestamp: serverTimestamp(),
        network: "Polygon Mainnet",
        currency: "MATIC",
      });

      console.log(
        "Transaction logged with recipient address:",
        recipientAddress
      );
    } catch (error) {
      console.error("Error logging transaction:", error);
    }
  };

  const switchToPolygonNetwork = async () => {
    try {
      await window.ethereum?.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x89" }], // Polygon Mainnet chain ID
      });
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        try {
          await window.ethereum?.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0x89",
                chainName: "Polygon Mainnet",
                nativeCurrency: {
                  name: "MATIC",
                  symbol: "MATIC",
                  decimals: 18,
                },
                rpcUrls: ["https://polygon-rpc.com/"],
                blockExplorerUrls: ["https://polygonscan.com/"],
              },
            ],
          });
        } catch (addError) {
          console.error("Failed to add Polygon network:", addError);
          throw new Error(
            "Please add Polygon Mainnet network to MetaMask manually"
          );
        }
      } else {
        console.error("Failed to switch to Polygon network:", switchError);
        throw new Error("Failed to switch to Polygon Mainnet");
      }
    }
  };

  const handleDonate = async () => {
    if (!recipientAddress) {
      setError("Recipient wallet address not available");
      return;
    }

    if (!window.ethereum) {
      setError("Please install MetaMask to donate with MATIC");
      return;
    }

    setIsDonating(true);
    setError(null);
    setTxHash(null);

    try {
      const amount = parseFloat(donationAmount);
      if (isNaN(amount) || amount <= 0) {
        throw new Error("Please enter a valid donation amount");
      }

      await window.ethereum.request({ method: "eth_requestAccounts" });

      try {
        await switchToPolygonNetwork();
      } catch (networkError) {
        console.error("Network error:", networkError);
        throw new Error(
          networkError instanceof Error
            ? networkError.message
            : "Network switch failed. Please ensure you're on Polygon Mainnet"
        );
      }

      const provider = new BrowserProvider(window.ethereum as any);
      const signer = await provider.getSigner();
      const walletAddress = await signer.getAddress();
      const balance = await provider.getBalance(walletAddress);
      const amountInWei = ethers.parseEther(donationAmount);

      if (balance < amountInWei) {
        throw new Error("Insufficient balance in your wallet");
      }

      const tx = await signer.sendTransaction({
        to: recipientAddress,
        value: amountInWei,
      });

      setTxHash(tx.hash);
      toast.success("Transaction submitted!");

      const receipt = await tx.wait();
      toast.success("Transaction confirmed!");

      const nairaAmount = parseFloat(nairaEquivalent);
      const maticAmount = parseFloat(donationAmount);

      await Promise.all([
        updateCauseRaisedAmount(causeId, nairaAmount),
        logTransaction(
          causeId,
          tx.hash,
          maticAmount,
          nairaAmount,
          walletAddress,
          recipientAddress
        ),
      ]);

      if (onDonationSuccess) {
        onDonationSuccess(nairaAmount);
      }
    } catch (err) {
      console.error("Donation error:", err);

      if (
        (err as any).code === 4001 ||
        (err as any).code === "ACTION_REJECTED"
      ) {
        setError("Transaction was rejected");
        toast.warning("You rejected the transaction");
      } else if ((err as any).code === "NETWORK_ERROR") {
        setError("Network error. Please check your connection");
        toast.error("Network error occurred");
      } else {
        const errorMessage =
          err instanceof Error ? err.message : "Donation failed";
        setError(errorMessage);
        toast.error(errorMessage);
      }
    } finally {
      setIsDonating(false);
    }
  };

  if (isLoadingAddress) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <p>Loading wallet information...</p>
      </div>
    );
  }

  if (!recipientAddress) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Donate with MATIC
        </h2>
        <div className="mt-4 p-3 bg-yellow-50 text-yellow-700 rounded-md">
          <p>The creator hasn&apos;t set up a Polygon wallet address.</p>
          <p className="mt-2">
            <Link
              href={`/cause/${params.cause_id}/payment`}
              className="text-purple-600 hover:underline"
            >
              Please use another payment method
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Donate with MATIC
      </h2>

      <div className="mb-4">
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Amount (MATIC)
        </label>
        <input
          type="number"
          id="amount"
          min="0.01"
          step="0.01"
          value={donationAmount}
          onChange={(e) => setDonationAmount(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          disabled={isDonating}
        />
        <div className="mt-2 text-sm text-gray-600">
          ≈ ₦{nairaEquivalent} Naira
        </div>
        <p className="mt-1 text-xs text-gray-500">Using Polygon Mainnet</p>
      </div>

      <button
        onClick={handleDonate}
        disabled={isDonating}
        className={`w-full py-2 px-4 rounded-md text-white font-medium ${
          isDonating ? "bg-blue-400" : "bg-purple-600 hover:bg-blue-700"
        } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors`}
      >
        {isDonating ? "Processing..." : "Donate with MATIC"}
      </button>

      {error && (
        <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {txHash && (
        <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-md">
          <p>Thank you for your donation!</p>
          <p className="mt-1 text-sm">
            Transaction:{" "}
            <a
              href={`https://polygonscan.com/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-green-800"
            >
              View on PolygonScan
            </a>
          </p>
        </div>
      )}
    </div>
  );
}
