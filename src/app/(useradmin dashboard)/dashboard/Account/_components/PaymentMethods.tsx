"use client";

import React, { useState, useEffect, useRef } from "react";
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
import { CreditCardForm } from "./CreditCardForm";
import { CryptoWalletForm } from "./CryptoWalletForm";
import AccountNumberForm from "./AccountNumberForm";
import { getSessionId } from "@/lib/helpers";

// Interfaces for payment methods
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
  accountType: "savings" | "current";
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

  // Fetch session ID using useEffect
  useEffect(() => {
    const fetchSessionId = async () => {
      try {
        const id = await getSessionId();
        setSessionId(id);
        console.log("Session ID:", id);
      } catch (error) {
        console.error("Error fetching session ID:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSessionId();
  }, []);

  // Fetch user payment methods when sessionId is available
  useEffect(() => {
    const fetchPaymentMethods = async () => {
      if (!sessionId) return;

      try {
        setIsLoading(true);
        // Get user data from Firebase
        const userData = await getUserById(sessionId);

        if (userData && userData.accDetails && userData.accDetails.length > 0) {
          // Convert the Firebase account details to our local format
          const accountMethods = userData.accDetails.map((acc, index) => {
            // Create an AccountNumber object from the Firebase data
            const accountMethod: AccountNumber = {
              id: Date.now() + index, // Generate a unique ID
              accountName: userData.firstName + " " + userData.lastName, // Use user's name if account name not available
              bankName: acc.subaccount_code.split("-")[0] || "Bank", // Extract bank name from subaccount_code
              accountType: acc.subaccount_code.split("-")[1] || "savings", // Extract account type from subaccount_code
              accountNumber: acc.account_number || "XXXXXXXX",
            };
            return accountMethod;
          });

          // Set the payment methods in state
          setPaymentMethods(accountMethods);
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

  const handleSubmitCryptoWallet = (data: any) => {
    const newWallet: CryptoWallet = {
      id: Date.now(),
      ...data,
    };
    setPaymentMethods((prev) => [...prev, newWallet]);
    setIsAddModalOpen(false);
  };

  const handleSubmitAccountNumber = async (data: any) => {
    if (!sessionId) {
      console.error("No session ID available");
      return;
    }

    try {
      // Create the account object for local state
      const newAccount: AccountNumber = {
        id: Date.now(),
        accountName: data.accountName,
        bankName: data.bankName,
        accountType: data.accountType,
        accountNumber: data.accountNumber || "XXXXXXXX", // Default value if not provided
      };

      // Add to local state for immediate UI update
      setPaymentMethods((prev) => [...prev, newAccount]);

      // Format the data for Firebase (matching the User type's accDetails structure)
      const accountUpdate = {
        accDetails: [
          {
            account_number: data.accountNumber,
            subaccount_code: `${data.bankName}-${data.accountType}`, // Using a combination as a placeholder
            // You can add more fields here if needed
          },
        ],
      };

      // Update the user document in Firebase
      await updateUserById(sessionId, accountUpdate);
      console.log("Account details saved to Firebase");

      // Close the modal
      setIsAddModalOpen(false);
    } catch (error) {
      console.error("Error saving account details:", error);
      // You might want to show an error message to the user here
    }
  };

  const toggleAccountDetails = (id: number) => {
    setShowAccountDetails((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleRemoveMethod = (id: number) => {
    setPaymentMethods((prev) => prev.filter((method) => method.id !== id));
  };

  const handleSubmitCreditCard = (data: any) => {
    const newCard: CreditCard = {
      id: Date.now(),
      ...data,
    };
    setPaymentMethods((prev) => [...prev, newCard]);
    setIsAddModalOpen(false);
  };

  const renderCardTitle = () => {
    // TODO
  };

  const renderPaymentMethods = (activeTab: string) => {
    // Check if there's already a payment method of the active type
    const hasAccountNumber = paymentMethods.some((method) => "accountNumber" in method);
    const hasCreditCard = paymentMethods.some((method) => "cardNumber" in method);
    const hasCryptoWallet = paymentMethods.some((method) => "address" in method);

    // Filter methods based on the active tab
    let filteredMethods: PaymentMethod[] = [];

    if (activeTab === "all") {
      filteredMethods = paymentMethods;
    } else if (activeTab === "creditCard") {
      filteredMethods = paymentMethods.filter((method) => "cardNumber" in method);
    } else if (activeTab === "cryptoWallet") {
      filteredMethods = paymentMethods.filter((method) => "address" in method);
    } else if (activeTab === "accountNumber") {
      filteredMethods = paymentMethods.filter((method) => "accountNumber" in method);
    }

    // If there are methods of the active type, show them
    if (filteredMethods.length > 0) {
      return (
        <div className="space-y-4">
          {renderExistingPaymentMethods(
            filteredMethods,
            toggleAccountDetails,
            handleRemoveMethod,
            showAccountDetails
          )}
        </div>
      );
    }

    // Otherwise, show the appropriate form if allowed
    switch (activeTab) {
      case "creditCard":
        return hasCreditCard ? (
          <div className="text-center py-6 text-muted-foreground">
            You already have a credit card. Please edit or remove it before adding another.
          </div>
        ) : (
          <CreditCardForm onSubmit={handleSubmitCreditCard} />
        );
      case "cryptoWallet":
        return hasCryptoWallet ? (
          <div className="text-center py-6 text-muted-foreground">
            You already have a crypto wallet. Please edit or remove it before adding another.
          </div>
        ) : (
          <CryptoWalletForm onSubmit={handleSubmitCryptoWallet} />
        );
      case "accountNumber":
        return hasAccountNumber ? (
          <div className="text-center py-6 text-muted-foreground">
            You already have an account number. Please edit or remove it before adding another.
          </div>
        ) : (
          <AccountNumberForm onSubmit={handleSubmitAccountNumber} />
        );
      default:
        return filteredMethods.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            No payment methods available
          </div>
        ) : null;
    }
  };

  // Function to render existing payment methods
  const renderExistingPaymentMethods = (
    methods: PaymentMethod[],
    toggleDetails: (id: number) => void,
    removeMethod: (id: number) => void,
    showDetails: Record<number, boolean>
  ) => {
    if (methods.length === 0) {
      return (
        <div className="text-center py-6 text-muted-foreground">
          No payment methods available
        </div>
      );
    }

    return (
      <div className="space-y-3">
        {methods.map((method) => (
          <Card key={method.id} className="overflow-hidden">
            {"cardNumber" in method ? (
              <div className="p-4 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
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
                      className="text-blue-600"
                    >
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <line x1="2" x2="22" y1="10" y2="10" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">{method.bankName}</p>
                    <p className="text-sm text-muted-foreground">
                      {showDetails[method.id]
                        ? method.cardNumber
                        : "**** **** **** " + method.cardNumber.slice(-4)}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleDetails(method.id)}
                  >
                    <EyeIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeMethod(method.id)}
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <Trash2Icon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : "address" in method ? (
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
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeMethod(method.id)}
                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                >
                  <Trash2Icon className="h-4 w-4" />
                </Button>
              </div>
            ) : (
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
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeMethod(method.id)}
                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                >
                  <Trash2Icon className="h-4 w-4" />
                </Button>
              </div>
            )}
          </Card>
        ))}
      </div>
    );
  };

  // Use a ref to track if we've already added test data
  const testDataAdded = React.useRef(false);

  useEffect(() => {
    // Only add test data once and only in development
    if (
      paymentMethods.length === 0 &&
      !testDataAdded.current &&
      process.env.NODE_ENV === "development"
    ) {
      testDataAdded.current = true;

      // This is just for development testing
      const testCard: CreditCard = {
        id: 1,
        name: "Test User",
        bankName: "Test Bank",
        cardNumber: "4111111111111111",
        expiry: "12/25",
        cvv: "123",
      };

      const testWallet: CryptoWallet = {
        id: 2,
        address: "0x1234567890abcdef1234567890abcdef12345678",
        network: "Ethereum",
      };

      const testAccount: AccountNumber = {
        id: 3,
        accountName: "Test Account",
        bankName: "Test Bank",
        accountType: "savings",
        accountNumber: "1234567890",
      };

      setPaymentMethods([testCard, testWallet, testAccount]);
    }
  }, [paymentMethods.length]);

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
            <DialogContent className="bg-white w-[90%] rounded-lg ">
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
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="cryptoWallet">
                      Crypto Wallet
                    </TabsTrigger>
                    <TabsTrigger value="accountNumber">
                      Account Number
                    </TabsTrigger>
                  </TabsList>

                  <div className="mt-4">
                    {selectedMethod === "cryptoWallet" && (
                      <CryptoWalletForm onSubmit={handleSubmitCryptoWallet} />
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
