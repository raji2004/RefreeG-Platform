// components/MaticDonationButton.tsx
"use client";

import { useState, useEffect } from "react";
import { BrowserProvider, ethers } from "ethers";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { getCauseById } from "@/lib/firebase/actions"; // Changed from getCausesByUserId
import { db } from "@/lib/firebase/config";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import { useParams } from "next/navigation";

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
  const [isDonating, setIsDonating] = useState<boolean>(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [recipientAddress, setRecipientAddress] = useState<string | null>(null);
  const [isLoadingAddress, setIsLoadingAddress] = useState<boolean>(true);
  const params = useParams();

  useEffect(() => {
    const fetchRecipientAddress = async () => {
      try {
        // Get the cause directly by ID instead of by user ID
        const causeDocRef = doc(db, "causes", causeId);
        const causeDoc = await getDoc(causeDocRef);

        if (!causeDoc.exists()) {
          throw new Error("Cause not found");
        }

        const causeData = causeDoc.data();
        const creatorId = causeData.userId;

        // Get the creator's user document
        const userDocRef = doc(db, "users", creatorId);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
          throw new Error("Creator not found");
        }

        const userData = userDoc.data();

        // Check if the user has a MATIC wallet address (using the correct field name)
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
            chainId: "0x13882", // 80002 in hexadecimal (Amoy testnet)
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
      // Validate amount
      const amount = parseFloat(donationAmount);
      if (isNaN(amount) || amount <= 0) {
        throw new Error("Please enter a valid donation amount");
      }

      // Check if MetaMask is installed
      if (!window.ethereum) {
        throw new Error("Please install MetaMask to donate with MATIC");
      }

      // Request account access
      await window.ethereum.request({ method: "eth_requestAccounts" });

      // Check current network and switch if needed
      const chainId = await window.ethereum.request({ method: "eth_chainId" });
      if (chainId !== "0x13882") {
        // 0x13882 is Amoy testnet
        try {
          await switchToAmoyNetwork();
        } catch (switchError) {
          // This error code indicates that the chain has not been added to MetaMask
          if ((switchError as any).code === 4902) {
            throw new Error("Please add Polygon Amoy Testnet to your wallet");
          }
          throw switchError;
        }
      }

      // Ethers v6 syntax
      const provider = new BrowserProvider(window.ethereum as any);
      const signer = await provider.getSigner();

      // Convert amount to wei (1 MATIC = 10^18 wei) - Ethers v6 syntax
      const amountInWei = ethers.parseEther(donationAmount);

      // Send transaction
      const tx = await signer.sendTransaction({
        to: recipientAddress,
        value: amountInWei,
      });

      setTxHash(tx.hash);
      console.log("Transaction hash:", tx.hash);
    } catch (err) {
      console.error("Donation error:", err);
      setError(
        err instanceof Error ? err.message : "Failed to process donation"
      );
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
        <p className="mt-1 text-xs text-gray-500">Using Polygon Amoy Testnet</p>
      </div>

      <button
        onClick={handleDonate}
        disabled={isDonating}
        className={`w-full py-2 px-4 rounded-md text-white font-medium ${
          isDonating ? "bg-purple-400" : "bg-purple-600 hover:bg-purple-700"
        } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors`}
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

      <div className="mt-4 text-xs text-gray-500">
        <p className="font-medium">Testnet Instructions:</p>
        <ul className="list-disc pl-5 mt-1 space-y-1">
          <li>Ensure you're connected to Polygon Amoy Testnet</li>
          <li>
            Get test MATIC from{" "}
            <a
              href="https://faucet.polygon.technology/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Polygon Faucet
            </a>
          </li>
          <li>This is for testing only - no real funds</li>
        </ul>
      </div>
    </div>
  );
}
