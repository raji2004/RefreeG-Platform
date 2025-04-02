"use client";

import { useState } from "react";
import { BrowserProvider } from "ethers";
import { getSessionId } from "@/lib/helpers";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { Button } from "@/components/ui/button";

interface ConnectWalletButtonProps {
  onConnected?: (address: string, network?: string) => void;
}

export function ConnectWalletButton({ onConnected }: ConnectWalletButtonProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connectWallet = async () => {
    setIsConnecting(true);
    setError(null);

    try {
      if (!window.ethereum) {
        throw new Error("Please install MetaMask or another Web3 wallet");
      }

      const accounts = await window.ethereum.request<string[]>({
        method: "eth_requestAccounts",
      });

      if (!accounts || accounts.length === 0) {
        throw new Error("No accounts found");
      }

      const address = accounts[0];
      if (!address) {
        throw new Error("No address found");
      }

      const provider = new BrowserProvider(window.ethereum);
      const network = await provider.getNetwork();
      const signer = await provider.getSigner();

      const userId = await getSessionId();
      if (!userId) {
        throw new Error("User session not found");
      }

      await setDoc(
        doc(db, "users", userId),
        {
          cryptoWallets: {
            [network.name]: address,
          },
        },
        { merge: true }
      );

      if (onConnected) {
        onConnected(address, network.name);
      }

      return { address, network: network.name };
    } catch (err) {
      console.error("Wallet connection error:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Failed to connect wallet";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="space-y-4">
      <Button
        onClick={connectWallet}
        disabled={isConnecting}
        className="w-full"
      >
        {isConnecting ? "Connecting..." : "Connect Wallet"}
      </Button>

      {error && <div className="text-sm text-red-500 mt-2">{error}</div>}
    </div>
  );
}
