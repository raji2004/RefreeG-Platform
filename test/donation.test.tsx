import { describe, it, expect, beforeEach, vi } from "vitest";
import { POST } from "../src/app/api/donations/route";
import * as transactionActions from "../src/lib/transactionActions";
import * as paymentGateway from "../src/utils/paymentGateway";
import { convertCurrency } from "../src/utils/currencyConversion";

vi.mock("../src/utils/currencyConversion", () => ({
  convertCurrency: vi.fn(
    (amount: number, fromCurrency: string, toCurrency: string) =>
      Promise.resolve(5000)
  ), // Mocking with parameters
}));

describe("Donations API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return 400 if required fields are missing", async () => {
    const req = {
      json: async () => ({}), // Missing required fields
    };

    const response = await POST(req as Request);
    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: "Missing required fields" });
  });

  it("should return 404 if cause is not found", async () => {
    const req = {
      json: async () => ({
        amount: 100,
        currency: "USD",
        donorDetails: { name: "John", email: "john@example.com" },
        isRecurring: false,
        causeId: "nonexistent",
      }),
    };

    vi.spyOn(transactionActions, "checkFundingTargets").mockResolvedValue(null);

    const response = await POST(req as Request);
    expect(response.status).toBe(404);
    expect(await response.json()).toEqual({ error: "Cause not found" });
  });

  it("should return 500 if payment processing fails", async () => {
    vi.spyOn(paymentGateway, "processPayment").mockImplementation(() => {
      throw new Error("Payment gateway error");
    });

    const req = {
      json: async () => ({
        amount: 100,
        currency: "USD",
        donorDetails: {
          name: "John",
          email: "john@example.com",
          paymentMethod: "stripe", // Include payment method
        },
        isRecurring: false,
        causeId: "12345",
      }),
    };

    vi.spyOn(transactionActions, "checkFundingTargets").mockResolvedValue({
      id: "12345",
    });
    vi.spyOn(transactionActions, "recordTransaction").mockResolvedValue(
      undefined
    );

    const response = await POST(req as Request);
    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({
      error: "Payment Processing Failed",
      details: "Payment gateway error",
    });
  });

  it("should successfully process a donation", async () => {
    const req = {
      json: async () => ({
        amount: 100,
        currency: "USD",
        donorDetails: {
          name: "John",
          email: "john@example.com",
          paymentMethod: "stripe", // Include payment method
        },
        isRecurring: false,
        causeId: "12345",
      }),
    };

    vi.spyOn(paymentGateway, "processPayment").mockResolvedValue({
      transactionId: "trans123",
      status: "success",
    });

    vi.spyOn(transactionActions, "recordTransaction").mockResolvedValue(
      undefined
    );
    vi.spyOn(transactionActions, "checkFundingTargets").mockResolvedValue({
      id: "12345",
      name: "Test Cause",
      targetAmount: 5000,
      currentAmount: 1000,
    });

    // No need for additional mock here as it's already set in the mock function

    const response = await POST(req as Request);
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      success: true,
      paymentResponse: { transactionId: "trans123", status: "success" },
      convertedAmount: 5000,
    });
  });
});
