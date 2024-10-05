import { NextResponse } from 'next/server';
import { processPayment } from "@/utils/paymentGateway";
import { convertCurrency } from "@/utils/currencyConversion";
import { recordTransaction, checkFundingTargets } from "@/lib/firebase/config";

// Mocking the checkFundingTargets function
async function mockCheckFundingTargets(causeId: string) {
  // Simulating a cause object for testing
  if (causeId === "12345") {
    return { id: "12345", name: "Test Cause", targetAmount: 5000, currentAmount: 1000 };
  }
  return null;
}

// Update your POST function to use the mock
export async function POST(req: Request) {
  const res = NextResponse.json;
  console.log("API Route Hit");

  console.log("Request received:", req.method);
  
  try {
    const { amount, currency, donorDetails, isRecurring, causeId } = await req.json();

    console.log("Request body:", { amount, currency, donorDetails, isRecurring, causeId });

    if (!amount || !currency || !donorDetails || !causeId) {
      return res({ error: "Missing required fields" }, { status: 400 });
    }

    // Convert currency to Naira
    const amountInNaira = await convertCurrency(amount, currency, "NGN");

    // Process payment
    const paymentResponse = await processPayment(
      amountInNaira,
      donorDetails,
      isRecurring
    );

    // Use the mocked function for testing
    const fundingTarget = await mockCheckFundingTargets(causeId);
    if (fundingTarget) {
      console.log(`Funding target for cause ${causeId}:`, fundingTarget);
    } else {
      console.log(`No funding target found for cause ${causeId}`);
    }

    // Store transaction
    await recordTransaction(
      paymentResponse,
      donorDetails,
      amountInNaira,
      isRecurring,
      causeId
    );

    // Return the success response along with the converted amount
    return res({ success: true, paymentResponse, convertedAmount: amountInNaira });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error details:", error.message);
      return res({ error: "Payment Processing Failed", details: error.message }, { status: 500 });
    } else {
      return res({ error: "Payment Processing Failed", details: "Unknown error occurred" }, { status: 500 });
    }
  }
}
