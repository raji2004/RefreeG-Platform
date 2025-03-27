"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { usePayment } from "@/hooks/usePayment";
import { User } from "@/lib/type";
import { getUserById } from "@/lib/firebase/actions";

interface PaymentButtonProps {
    user: User;
    causeUserId: string;
    totalAmount: number;
    serviceFee: number;
    disabled?: boolean;
    causeId: string;
}

export default function PaymentButton({
    user,
    causeUserId,
    totalAmount,
    serviceFee,
    causeId,
    disabled
}: PaymentButtonProps) {
    const [isLoading, setIsLoading] = useState(false);
    const { initializePayment } = usePayment();

    const handleProceed = async () => {
        try {
            setIsLoading(true);
            const causeUser = await getUserById(causeUserId);

            const userSubaccount = causeUser?.accDetails?.[0]?.subaccount_code;

            if (!userSubaccount) {
                toast.error('Cause creator has not set up their payment details yet.');
                return;
            }

            await initializePayment({
                email: user.email,
                amount: totalAmount,
                serviceFee: serviceFee,
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                subaccounts: [{
                    subaccount: userSubaccount,
                    share: totalAmount * 100
                }],
                causeId: causeId
            });
        } catch (error) {
            console.error('Payment initialization failed:', error);
            toast.error('Failed to initialize payment. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button
            className={`w-full text-white py-3 rounded-lg ${disabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
                }`}
            disabled={disabled || isLoading}
            onClick={handleProceed}
        >
            {isLoading ? "Processing..." : "Proceed"}
        </Button>
    );
} 