"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import Paystack from "@/lib/services/paystack";

interface AccountNumberFormProps {
  onSubmit: (data: {
    accountName: string;
    bankName: string;
    accountType: "savings" | "current";
    accountNumber: string;
  }) => void;
}

interface Bank {
  name: string;
  code: string;
}

function AccountNumberForm({ onSubmit }: AccountNumberFormProps) {
  const [accountName, setAccountName] = useState<string>("");
  const [bankName, setBankName] = useState<string>("");
  const [bankCode, setBankCode] = useState<string>("");
  const [accountType, setAccountType] = useState<"savings" | "current" | "">(
    ""
  );
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [banks, setBanks] = useState<Bank[]>([]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  // Fetch banks from Paystack
  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const bankList = await Paystack.listBanks();
        setBanks(bankList);
      } catch (error) {
        console.error("Failed to fetch banks:", error);
      }
    };

    fetchBanks();
  }, []);

  // Verify account number when both bank and account number are set
  useEffect(() => {
    const verifyAccount = async () => {
      if (bankCode && accountNumber && accountNumber.length === 10) {
        setIsVerifying(true);
        setVerificationError("");
        setIsVerified(false);

        try {
          const accountData = await Paystack.verifyAccountNumber(
            accountNumber,
            bankCode
          );
          setAccountName(accountData.account_name);
          setIsVerified(true);
        } catch (error) {
          console.error("Failed to verify account:", error);
          setVerificationError(
            "Could not verify account. Please check the details."
          );
        } finally {
          setIsVerifying(false);
        }
      }
    };

    verifyAccount();
  }, [bankCode, accountNumber]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!accountName || !bankName || !accountType) {
      // Basic validation
      return;
    }

    onSubmit({
      accountName,
      bankName,
      accountType,
      accountNumber,
    });
  };

  const handleBankChange = (value: string) => {
    const selectedBank = banks.find((bank) => bank.code === value);
    if (selectedBank) {
      setBankCode(selectedBank.code);
      setBankName(selectedBank.name);
    }
  };

  return (
    <div className="bg-white rounded-lg px-6 py-10 w-[100%] mx-auto border">
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {/* Name on Account */}
          <div className="space-y-2 mb-8">
            <label htmlFor="accountName" className="block text-sm font-medium">
              Name On Account
            </label>
            <Input
              id="accountName"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              placeholder="Adeiza Angulu Julius"
              className="w-full border rounded-lg px-4 py-6"
              required
              readOnly={isVerified}
            />
            {isVerified && (
              <p className="text-xs text-green-600 mt-1">Account verified</p>
            )}
          </div>

          {/* Bank Name */}
          <div className="space-y-2 mb-8">
            <label htmlFor="bankName" className="block text-sm font-medium">
              Bank Name
            </label>
            <div className="relative">
              <Select value={bankCode} onValueChange={handleBankChange}>
                <SelectTrigger className="w-full border rounded-lg px-4 py-6">
                  <SelectValue placeholder="Select your bank" />
                </SelectTrigger>
                <SelectContent>
                  {banks.map((bank) => (
                    <SelectItem key={bank.code} value={bank.code}>
                      {bank.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Account Number */}
          <div className="space-y-2 mb-8">
            <label
              htmlFor="accountNumber"
              className="block text-sm font-medium"
            >
              Account Number
            </label>
            <Input
              id="accountNumber"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="0123456789"
              className="w-full border rounded-lg px-4 py-6"
              required
            />
            {isVerifying && (
              <p className="text-xs text-gray-500 mt-1">Verifying account...</p>
            )}
            {verificationError && (
              <p className="text-xs text-red-600 mt-1">{verificationError}</p>
            )}
          </div>

          {/* Account Type */}
          <div className="space-y-2 mb-8">
            <label htmlFor="accountType" className="block text-sm font-medium">
              Account Type
            </label>
            <div className="relative">
              <Select
                value={accountType}
                onValueChange={(value) =>
                  setAccountType(value as "savings" | "current")
                }
              >
                <SelectTrigger className="w-full border rounded-lg px-4 py-6">
                  <SelectValue placeholder="Select account type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="savings">
                    <div className="flex items-center">
                      <span
                        className={cn(
                          "text-black",
                          accountType === "savings" && "text-blue-400"
                        )}
                      >
                        Savings
                      </span>
                    </div>
                  </SelectItem>
                  <SelectItem value="current">
                    <div className="flex items-center">
                      <span
                        className={cn(
                          "text-black",
                          accountType === "current" && "text-blue-400"
                        )}
                      >
                        Current
                      </span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white text-md py-6 rounded-md"
            disabled={!isVerified}
          >
            Add Account
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AccountNumberForm;
