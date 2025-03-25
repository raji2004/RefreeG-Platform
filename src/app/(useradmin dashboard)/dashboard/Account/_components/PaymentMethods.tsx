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
import { CreditCardForm } from "./CreditCardForm";
import { CryptoWalletForm } from "./CryptoWalletForm";
import AccountNumberForm from "./AccountNumberForm";

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

  console.log(activeTab);

  const handleMethodChange = (value: string) => {
    setSelectedMethod(value);
  };

  const handleSubmitCreditCard = (data: any) => {
    const newCard: CreditCard = {
      id: Date.now(),
      ...data,
    };
    setPaymentMethods((prev) => [...prev, newCard]);
    setIsAddModalOpen(false);
  };

  const handleSubmitCryptoWallet = (data: any) => {
    const newWallet: CryptoWallet = {
      id: Date.now(),
      ...data,
    };
    setPaymentMethods((prev) => [...prev, newWallet]);
    setIsAddModalOpen(false);
  };

  const handleSubmitAccountNumber = (data: any) => {
    const newAccount: AccountNumber = {
      id: Date.now(),
      accountName: data.accountName,
      bankName: data.bankName,
      accountType: data.accountType,
      accountNumber: data.accountNumber || "XXXXXXXX", // Default value if not provided
    };
    setPaymentMethods((prev) => [...prev, newAccount]);
    setIsAddModalOpen(false);
  };

  const toggleAccountDetails = (id: number) => {
    setShowAccountDetails((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleRemoveMethod = (id: number) => {
    setPaymentMethods((prev) => prev.filter((method) => method.id !== id));
  };

  const renderCardTitle = () => {
    // TODO
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
                    <TabsTrigger value="creditCard">Credit Card</TabsTrigger>
                    <TabsTrigger value="cryptoWallet">
                      Crypto Wallet
                    </TabsTrigger>
                    <TabsTrigger value="accountNumber">
                      Account Number
                    </TabsTrigger>
                  </TabsList>

                  <div className="mt-4">
                    {selectedMethod === "creditCard" && (
                      <CreditCardForm onSubmit={handleSubmitCreditCard} />
                    )}

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
          className="w-full"
        >
          <TabsList className="mb-4">
            <TabsTrigger
              value="all"
              className="flex-1 sm:flex-none text-xs sm:text-sm lg:text-base px-2 sm:px-4 py-1 sm:py-2"
            >
              All Methods
            </TabsTrigger>
            <TabsTrigger
              value="creditCard"
              className="flex-1 sm:flex-none text-xs sm:text-sm lg:text-base px-2 sm:px-4 py-1 sm:py-2"
            >
              Credit Cards
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

function renderPaymentMethods(activeTab: string) {
  switch (activeTab) {
    case "creditCard":
      return <CreditCardForm />;
    case "cryptoWallet":
      return <CryptoWalletForm />;
    case "accountNumber":
      return <AccountNumberForm />;
  }
}
