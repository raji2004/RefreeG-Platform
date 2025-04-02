// components/MaticDonationButton.tsx
"use client";

import { useState, useEffect } from "react";
import { BrowserProvider, ethers } from "ethers";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { getCauseById } from "@/lib/firebase/actions";
import { db } from "@/lib/firebase/config";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

// Default exchange rate (will be updated via API)
const DEFAULT_MATIC_TO_NAIRA_RATE = 302.51; // 1 MATIC = 302.51 Naira

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

interface MaticDonationButtonProps {
  causeId: string;
}

export default function MaticDonationButton({
  causeId,
}: MaticDonationButtonProps) {
  const [donationAmount, setDonationAmount] = useState<string>("0.1");
  const [nairaEquivalent, setNairaEquivalent] = useState<string>("120.00");
  const [exchangeRate, setExchangeRate] = useState<number>(
    DEFAULT_MATIC_TO_NAIRA_RATE
  );
  const [isFetchingRate, setIsFetchingRate] = useState<boolean>(false);
  const [isDonating, setIsDonating] = useState<boolean>(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [recipientAddress, setRecipientAddress] = useState<string | null>(null);
  const [isLoadingAddress, setIsLoadingAddress] = useState<boolean>(true);
  const params = useParams();

  // Fetch current exchange rate
  useEffect(() => {
    const fetchExchangeRate = async () => {
      setIsFetchingRate(true);
      try {
        // Replace with your actual API endpoint
        const response = await fetch(
          "https://api.example.com/crypto-rates/matic"
        );
        const data = await response.json();
        if (data?.rate) {
          setExchangeRate(data.rate);
        }
      } catch (err) {
        console.error("Failed to fetch exchange rate:", err);
        // Fallback to default rate if API fails
        setExchangeRate(DEFAULT_MATIC_TO_NAIRA_RATE);
      } finally {
        setIsFetchingRate(false);
      }
    };

    fetchExchangeRate();
  }, []);

  // Update Naira equivalent when MATIC amount or rate changes
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

        if (userData.cryptoWallets?.["matic-amoy"]) {
          setRecipientAddress(userData.cryptoWallets["matic-amoy"]);
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

  const switchToAmoyNetwork = async () => {
    try {
      await window.ethereum?.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x13882",
            chainName: "Polygon Amoy Testnet",
            nativeCurrency: {
              name: "MATIC",
              symbol: "MATIC",
              decimals: 18,
            },
            rpcUrls: ["https://rpc-amoy.polygon.technology/"],
            blockExplorerUrls: ["https://amoy.polygonscan.com/"],
          },
        ],
      });
    } catch (err) {
      console.error("Failed to switch network:", err);
      throw new Error("Failed to switch to Polygon Amoy network");
    }
  };

  const handleDonate = async () => {
    if (!recipientAddress) {
      setError("Recipient wallet address not available");
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

      if (!window.ethereum) {
        toast.error("Please install MetaMask to donate with MATIC.");
        setIsDonating(false);
        return;
      }

      await window.ethereum.request({ method: "eth_requestAccounts" });

      const provider = new BrowserProvider(window.ethereum as any);
      const signer = await provider.getSigner();
      const walletAddress = await signer.getAddress();
      const balance = await provider.getBalance(walletAddress);
      const amountInWei = ethers.parseEther(donationAmount);

      // Check if balance is sufficient
      if (balance < amountInWei) {
        toast.error("Insufficient balance in your wallet.");
        setIsDonating(false);
        return;
      }

      const tx = await signer.sendTransaction({
        to: recipientAddress,
        value: amountInWei,
      });

      setTxHash(tx.hash);
      toast.success("Donation successful! Transaction submitted.");
    } catch (err) {
      console.error("Donation error:", err);

      if (
        (err as any).code !== 4001 &&
        (err as any).code !== "ACTION_REJECTED"
      ) {
        setError(
          err instanceof Error ? err.message : "Failed to process donation"
        );
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
          Donate with MATIC (Testnet)
        </h2>
        <div className="mt-4 p-3 bg-yellow-50 text-yellow-700 rounded-md">
          <p>The creator hasn't set up a Polygon wallet address.</p>
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
        Donate with MATIC (Testnet)
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
        <div className="mt-2 text-sm text-gray-600 flex items-center">
          ≈ ₦{nairaEquivalent} Naira
          {isFetchingRate && (
            <span className="ml-2 text-xs text-gray-400">
              (Updating rate...)
            </span>
          )}
        </div>
        <p className="mt-1 text-xs text-gray-500">Using Polygon Amoy Testnet</p>
      </div>

      <button
        onClick={handleDonate}
        disabled={isDonating || isFetchingRate}
        className={`w-full py-2 px-4 rounded-md text-white font-medium ${
          isDonating || isFetchingRate
            ? "bg-blue-400"
            : "bg-purple-600 hover:bg-blue-700"
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
              href={`https://amoy.polygonscan.com/tx/${txHash}`}
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
