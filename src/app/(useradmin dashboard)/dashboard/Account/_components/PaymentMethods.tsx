"use client";

import React, { useState, useEffect } from "react";
import { EyeIcon, Trash2Icon, PlusIcon } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { updateUserById, getUserById } from "@/lib/firebase/actions";
import AccountNumberForm from "./AccountNumberForm";
import { getSessionId } from "@/lib/helpers";
import Paystack from "@/lib/services/paystack";
import { ConnectWalletButton } from "./ConnectWalletButton";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { User } from "@/lib/type";
import { DisconnectWalletButton } from "./DisconnectWalletButton";

interface CreditCard {
  id: number;
  name: string;
  bankName: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
}

interface CryptoWallet {
  id: number;
  address: string;
  network: string;
}

interface AccountNumber {
  id: number;
  accountName: string;
  bankName: string;
  accountType: string;
  accountNumber: string;
}

type PaymentMethod = CreditCard | CryptoWallet | AccountNumber;

export default function PaymentMethods() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [showAccountDetails, setShowAccountDetails] = useState<
    Record<number, boolean>
  >({});
  const [activeTab, setActiveTab] = useState<string>("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [walletNetwork, setWalletNetwork] = useState<string>("Polygon");

  useEffect(() => {
    const fetchSessionId = async () => {
      try {
        const id = await getSessionId();
        setSessionId(id);
      } catch (error) {
        console.error("Error fetching session ID:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSessionId();
  }, []);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      if (!sessionId) return;

      try {
        setIsLoading(true);
        const userData = (await getUserById(sessionId)) as User;

        if (userData) {
          const methods: PaymentMethod[] = [];

          // Add bank accounts
          if (userData.accDetails && userData.accDetails.length > 0) {
            userData.accDetails.forEach((acc, index) => {
              methods.push({
                id: Date.now() + index,
                accountName: `${userData.firstName} ${userData.lastName}`,
                bankName: acc.bank_name,
                accountType: acc.subaccount_code.split("-")[1] || "savings",
                accountNumber: acc.account_number || "XXXXXXXX",
              });
            });
          }

          // Add crypto wallets if they exist (type-safe check)
          if (userData.cryptoWallets) {
            Object.entries(userData.cryptoWallets).forEach(
              ([network, address]) => {
                if (typeof address === "string") {
                  methods.push({
                    id: Date.now() + Math.random(),
                    address,
                    network,
                  });
                  setWalletAddress(address);
                  setWalletNetwork(network);
                }
              }
            );
          }

          setPaymentMethods(methods);
        }
      } catch (error) {
        console.error("Error fetching payment methods:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaymentMethods();
  }, [sessionId]);

  const handleMethodChange = (value: string) => {
    setSelectedMethod(value);
  };

  const handleWalletConnected = async (
    address: string,
    network: string = "Polygon"
  ) => {
    try {
      setWalletAddress(address);
      setWalletNetwork(network);

      // Add to local state
      const newWallet: CryptoWallet = {
        id: Date.now(),
        address,
        network,
      };

      setPaymentMethods((prev) => [...prev, newWallet]);

      // Save to Firebase
      if (sessionId) {
        await setDoc(
          doc(db, "users", sessionId),
          {
            cryptoWallets: {
              [network]: address,
            },
          },
          { merge: true }
        );
      }
    } catch (error) {
      console.error("Error handling wallet connection:", error);
    }
  };

  const handleSubmitAccountNumber = async (data: any) => {
    if (!sessionId) {
      console.error("No session ID available");
      return;
    }

    try {
      const newAccount: AccountNumber = {
        id: Date.now(),
        accountName: data.accountName,
        bankName: data.bankName,
        accountType: data.accountType,
        accountNumber: data.accountNumber || "XXXXXXXX",
      };

      setPaymentMethods((prev) => [...prev, newAccount]);

      const paystackdata = {
        bank_code: data.bankName,
        account_number: data.accountNumber,
        percentage_charge: 0,
        business_name: data.accountName,
      };

      const subaccount = await Paystack.createSubaccount(paystackdata);
      const accountUpdate = {
        accDetails: [
          {
            account_number: data.accountNumber,
            account_name: data.accountName,
            bank_name: data.bankName,
            subaccount_code: subaccount.subaccount_code,
          },
        ],
      };

      await updateUserById(sessionId, accountUpdate);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error("Error saving account details:", error);
    }
  };

  const toggleAccountDetails = (id: number) => {
    setShowAccountDetails((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleRemoveMethod = (id: number) => {
    setPaymentMethods((prev) => prev.filter((method) => method.id !== id));
  };

  const handleRemoveCryptoWallet = async (wallet: CryptoWallet) => {
    if (!sessionId) return;

    try {
      // Remove from Firebase
      await updateDoc(doc(db, "users", sessionId), {
        [`cryptoWallets.${wallet.network}`]: null,
      });

      // Remove from local state
      setPaymentMethods((prev) =>
        prev.filter(
          (method) => !("address" in method) || method.id !== wallet.id
        )
      );

      // Clear wallet connection if it's the currently connected one
      if (walletAddress === wallet.address) {
        setWalletAddress(null);
        setWalletNetwork("Polygon");
      }
    } catch (error) {
      console.error("Error removing wallet:", error);
      throw error;
    }
  };

  const renderPaymentMethods = (activeTab: string) => {
    const filteredMethods = paymentMethods.filter((method) => {
      if (activeTab === "all") return true;
      if (activeTab === "cryptoWallet") return "address" in method;
      if (activeTab === "accountNumber") return "accountNumber" in method;
      return false;
    });

    if (filteredMethods.length === 0 && activeTab !== "cryptoWallet") {
      return (
        <div className="text-center py-6 text-muted-foreground">
          No payment methods available
        </div>
      );
    }

    return (
      <div className="space-y-3">
        {filteredMethods.map((method) => (
          <Card key={method.id} className="overflow-hidden">
            {"address" in method ? (
              <div className="p-4 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-purple-600"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                      <line x1="9" x2="9.01" y1="9" y2="9" />
                      <line x1="15" x2="15.01" y1="9" y2="9" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">{method.network}</p>
                    <p className="text-sm text-muted-foreground truncate max-w-md">
                      {method.address}
                    </p>
                  </div>
                </div>
                <DisconnectWalletButton
                  walletAddress={method.address}
                  onDisconnect={() => handleRemoveCryptoWallet(method)}
                />
              </div>
            ) : "accountNumber" in method ? (
              <div className="p-4 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-green-600"
                    >
                      <path d="M2 17h2v4h-2z" />
                      <path d="M6 17h2v4H6z" />
                      <path d="M10 17h2v4h-2z" />
                      <path d="M14 17h2v4h-2z" />
                      <path d="M18 17h2v4h-2z" />
                      <path d="M4 21h16" />
                      <path d="M4 3h16" />
                      <path d="M12 7v8" />
                      <path d="m8 9 4-2 4 2" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">{method.bankName}</p>
                    <p className="text-sm text-muted-foreground">
                      {method.accountName} • {method.accountType}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {showAccountDetails[method.id]
                        ? method.accountNumber
                        : "**** **** " + method.accountNumber.slice(-4)}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleAccountDetails(method.id)}
                  >
                    <EyeIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveMethod(method.id)}
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <Trash2Icon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : null}
          </Card>
        ))}

        {/* Show connected wallet if not already in paymentMethods */}
        {activeTab === "cryptoWallet" &&
          walletAddress &&
          !paymentMethods.some(
            (m) => "address" in m && m.address === walletAddress
          ) && (
            <Card className="overflow-hidden">
              <div className="p-4 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-purple-600"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                      <line x1="9" x2="9.01" y1="9" y2="9" />
                      <line x1="15" x2="15.01" y1="9" y2="9" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">{walletNetwork}</p>
                    <p className="text-sm text-muted-foreground truncate max-w-md">
                      {walletAddress}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          )}
      </div>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Payment Methods</CardTitle>
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <PlusIcon className="h-4 w-4 mr-2" />
                Add Method
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white w-[90%] rounded-lg">
              <DialogHeader>
                <DialogTitle>Add Payment Method</DialogTitle>
              </DialogHeader>

              <div className="mt-4">
                <Tabs
                  defaultValue="creditCard"
                  value={selectedMethod || "creditCard"}
                  onValueChange={handleMethodChange}
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="cryptoWallet">
                      Crypto Wallet
                    </TabsTrigger>
                    <TabsTrigger value="accountNumber">
                      Account Number
                    </TabsTrigger>
                  </TabsList>

                  <div className="mt-4">
                    {selectedMethod === "cryptoWallet" && (
                      <div className="space-y-4">
                        {walletAddress ? (
                          <div className="p-4 border rounded-lg bg-gray-50">
                            <p className="font-medium">Connected Wallet:</p>
                            <p className="text-sm text-gray-600 mt-1 truncate">
                              {walletAddress}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Network: {walletNetwork}
                            </p>
                          </div>
                        ) : (
                          <ConnectWalletButton
                            onConnected={handleWalletConnected}
                          />
                        )}
                      </div>
                    )}

                    {selectedMethod === "accountNumber" && (
                      <AccountNumberForm onSubmit={handleSubmitAccountNumber} />
                    )}
                  </div>
                </Tabs>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs
          defaultValue="all"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full bg-white"
        >
          <TabsList className="mb-4 bg-white">
            <TabsTrigger
              value="all"
              className="flex-1 bg-white sm:flex-none text-xs sm:text-sm lg:text-base px-2 sm:px-4 py-1 sm:py-2"
            >
              All Methods
            </TabsTrigger>
            <TabsTrigger
              value="cryptoWallet"
              className="flex-1 sm:flex-none text-xs sm:text-sm lg:text-base px-2 sm:px-4 py-1 sm:py-2"
            >
              Crypto Wallets
            </TabsTrigger>
            <TabsTrigger
              value="accountNumber"
              className="flex-1 sm:flex-none text-xs sm:text-sm lg:text-base px-2 sm:px-4 py-1 sm:py-2"
            >
              Account Numbers
            </TabsTrigger>
          </TabsList>

          <div className="mt-4 space-y-4">
            {renderPaymentMethods(activeTab)}
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
