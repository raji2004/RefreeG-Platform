import { ICreateSubaccount, TransactionData } from "@/lib/type";
import axios from "axios"; /// Get API key from appropriate environment variable
const PAYSTACK_KEY = process.env.NEXT_PUBLIC_PAYSTACK_KEY;

// Check if API key exists
if (!PAYSTACK_KEY) {
  console.warn(
    "WARNING: No Paystack API key found in environment variables. API calls will fail."
  );
}

console.log(PAYSTACK_KEY);

const Paystack = {
  api: axios.create({
    baseURL: "https://api.paystack.co",
    headers: {
      Authorization: `Bearer ${PAYSTACK_KEY}`,
      "Content-Type": "application/json",
    },
  }),

  initializeTransaction: async function (data: TransactionData) {
    const response = await this.api.post("/transaction/initialize", {
      currency: "NGN",
      email: data.email,
      amount: data.amount * 100,
      callback_url: "http://scfoodcourt.startupcampushq.com/main/home",
      split: {
        type: "flat",
        bearer_type: "account",
        subaccounts: data.subaccounts,
      },
      metadata: {
        user_id: data.id,
        amount: data.amount,
        customer_name: data.firstName + " " + data.lastName,
      },
    });

    return response.data.data as {
      authorization_url: string;
      reference: string;
      access_code: string;
    };
  },
  verifyTransaction: async function (transactionReference: string) {
    const response = await this.api.get(
      `/transaction/verify/${transactionReference}`
    );
    return response.data.data.status === "success";
  },
  createSubaccount: async function (data: ICreateSubaccount) {
    const response = await this.api.post("/subaccount", {
      ...data,
      settlement_bank: data.bank_code,
    });

    return response.data.data as {
      subaccount_code: string;
      account_number: string;
    };
  },
  listBanks: async function () {
    try {
      const response = await this.api.get("/bank", {
        params: { country: "nigeria", perPage: 100 },
      });

      return response.data.data as {
        name: string;
        code: string;
      }[];
    } catch (error) {
      console.error("Error fetching banks:", error);
      return [];
    }
  },
  verifyAccountNumber: async function (
    accountNumber: string,
    bankCode: string
  ) {
    try {
      console.log(
        `Verifying account: ${accountNumber} with bank code: ${bankCode}`
      );
      const response = await this.api.get("/bank/resolve", {
        params: { account_number: accountNumber, bank_code: bankCode },
      });

      console.log("Verification response:", response.data);

      return response.data.data as {
        account_name: string;
        bank_id: number;
      };
    } catch (error: any) {
      console.error(
        "Error verifying account:",
        error.response?.data || error.message || error
      );
      throw new Error(
        error.response?.data?.message || "Failed to verify account number"
      );
    }
  },
};

export default Paystack;
