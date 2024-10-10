import { NextResponse } from "next/server";
import { processPayment } from "../../../utils/paymentGateway";
import { convertCurrency } from "../../../utils/currencyConversion";
import {
  recordTransaction,
  checkFundingTargets,
} from "../../../lib/transactionActions";

// Donation API Handler
export async function POST(req: Request) {
  const res = NextResponse.json;

  try {
    const { amount, currency, donorDetails, isRecurring, causeId } =
      await req.json();

    if (!amount || !currency || !donorDetails || !causeId) {
      return res({ error: "Missing required fields" }, { status: 400 });
    }

    // Check if the cause exists before processing payment
    const fundingTarget = await checkFundingTargets(causeId);
    if (!fundingTarget) {
      return res({ error: "Cause not found" }, { status: 404 });
    }

    // Convert currency to Naira
    const amountInNaira = await convertCurrency(amount, currency, "NGN");

    // Process payment using the gateway
    const paymentResponse = await processPayment(
      amountInNaira,
      donorDetails,
      isRecurring
    );

    // Store the transaction record in the database
    await recordTransaction(
      paymentResponse,
      donorDetails,
      amountInNaira,
      isRecurring,
      causeId
    );

    return res({
      success: true,
      paymentResponse,
      convertedAmount: amountInNaira,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Payment Processing Error: ", errorMessage); // Log the error
    return res(
      { error: "Payment Processing Failed", details: errorMessage },
      { status: 500 }
    );
  }
}
