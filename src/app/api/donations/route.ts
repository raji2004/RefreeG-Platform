import { NextResponse } from "next/server";
import { processPayment } from "@/utils/paymentGateway";
import { convertCurrency } from "@/utils/currencyConversion";
import {
  recordTransaction,
  checkFundingTargets,
} from "@/lib/transactionActions";

// Donation API Handler
export async function POST(req: Request) {
  const res = NextResponse.json;

  try {
    // Parse incoming request data
    const { amount, currency, donorDetails, isRecurring, causeId } =
      await req.json();

    // Validate input data
    if (!amount || !currency || !donorDetails || !causeId) {
      return res({ error: "Missing required fields" }, { status: 400 });
    }

    // Convert currency to Naira
    const amountInNaira = await convertCurrency(amount, currency, "NGN");

    // Process payment using the gateway
    const paymentResponse = await processPayment(
      amountInNaira,
      donorDetails,
      isRecurring
    );

    // Fetch funding targets for the cause
    const fundingTarget = await checkFundingTargets(causeId);

    // Ensure the cause exists
    if (!fundingTarget) {
      return res({ error: "Cause not found" }, { status: 404 });
    }

    // Store the transaction record in the database
    await recordTransaction(
      paymentResponse,
      donorDetails,
      amountInNaira,
      isRecurring,
      causeId
    );

    // Send a success response with payment details and converted amount
    return res({
      success: true,
      paymentResponse,
      convertedAmount: amountInNaira,
    });
  } catch (error: unknown) {
    // Handle any errors and respond accordingly
    if (error instanceof Error) {
      return res(
        { error: "Payment Processing Failed", details: error.message },
        { status: 500 }
      );
    } else {
      return res(
        {
          error: "Payment Processing Failed",
          details: "Unknown error occurred",
        },
        { status: 500 }
      );
    }
  }
}
