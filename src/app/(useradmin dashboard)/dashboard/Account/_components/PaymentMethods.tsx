"use client";

import React, { useState } from "react";
import { EyeIcon, Trash2Icon, PlusIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { CreditCardForm } from "./CreditCardForm";
import { CryptoWalletForm } from "./CryptoWalletForm";

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

type PaymentMethod = CreditCard | CryptoWallet;

export default function PaymentMethods() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [showAccountDetails, setShowAccountDetails] = useState<Record<number, boolean>>({});
  const [activeTab, setActiveTab] = useState<string>("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [selectedMethod, setSelectedMethod] = useState<string>("");

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

  const toggleAccountDetails = (id: number) => {
    setShowAccountDetails((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleRemoveMethod = (id: number) => {
    setPaymentMethods((prev) => prev.filter((method) => method.id !== id));
  };

  const filteredMethods = paymentMethods.filter((method) => {
    if (activeTab === "creditCard") return "cardNumber" in method;
    if (activeTab === "cryptoWallet") return "address" in method;
    return true;
  });

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
                  value={selectedMethod}
                  onValueChange={handleMethodChange}
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="creditCard" >Credit Card</TabsTrigger>
                    <TabsTrigger value="cryptoWallet">Crypto Wallet</TabsTrigger>
                  </TabsList>

                  <TabsContent value="creditCard">
                    <CreditCardForm onSubmit={handleSubmitCreditCard} />
                  </TabsContent>

                  <TabsContent value="cryptoWallet">
                    <CryptoWalletForm onSubmit={handleSubmitCryptoWallet} />
                  </TabsContent>
                </Tabs>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="all" className="flex-1 sm:flex-none text-xs sm:text-sm lg:text-base px-2 sm:px-4 py-1 sm:py-2">All Methods</TabsTrigger>
            <TabsTrigger value="creditCard" className="flex-1 sm:flex-none text-xs sm:text-sm lg:text-base px-2 sm:px-4 py-1 sm:py-2">Credit Cards</TabsTrigger>
            <TabsTrigger value="cryptoWallet" className="flex-1 sm:flex-none text-xs sm:text-sm lg:text-base px-2 sm:px-4 py-1 sm:py-2">Crypto Wallets</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {renderPaymentMethods(filteredMethods, toggleAccountDetails, handleRemoveMethod, showAccountDetails)}
          </TabsContent>

          <TabsContent value="creditCard" className="space-y-4">
            {renderPaymentMethods(filteredMethods, toggleAccountDetails, handleRemoveMethod, showAccountDetails)}
          </TabsContent>

          <TabsContent value="cryptoWallet" className="space-y-4">
            {renderPaymentMethods(filteredMethods, toggleAccountDetails, handleRemoveMethod, showAccountDetails)}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

function renderPaymentMethods(
  methods: PaymentMethod[],
  toggleDetails: (id: number) => void,
  removeMethod: (id: number) => void,
  showDetails: Record<number, boolean>
) {
  if (methods.length === 0) {
    return (
      <div className="text-center h-svh py-6 text-muted-foreground">
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
                    {showDetails[method.id] ? method.cardNumber : "**** **** **** " + method.cardNumber.slice(-4)}
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
          ) : (
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
          )}
        </Card>
      ))}
    </div>
  );
}