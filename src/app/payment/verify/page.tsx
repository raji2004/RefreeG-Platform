"use client";

import { useEffect } from "react";
import { usePayment } from "@/hooks/usePayment";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

export default function PaymentVerification() {
    const { verifyPayment, isLoading, error } = usePayment();
    const router = useRouter();
    const searchParams = useSearchParams();
    const reference = searchParams.get("reference");

    useEffect(() => {
        const verifyTransaction = async () => {
            if (!reference) {
                toast.error("No payment reference found");
                router.push("/");
                return;
            }

            const isSuccessful = await verifyPayment(reference);

            if (isSuccessful) {
                // Redirect to success page or dashboard
                router.push("/dashboard");
            } else {
                // Redirect to error page or back to donation form
                router.push("/donation/failed");
            }
        };

        verifyTransaction();
    }, [reference, verifyPayment, router]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">Verifying Payment...</h1>
                {isLoading && (
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                )}
                {error && (
                    <p className="text-red-600 mt-4">{error}</p>
                )}
            </div>
        </div>
    );
} 