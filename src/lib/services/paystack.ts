import { ICreateSubaccount, TransactionData } from "@/lib/type";
import axios from "axios";



const Paystack = {
    api: axios.create({
        baseURL: "https://api.paystack.co",
        headers: {
            "Authorization": `Bearer ${process.env.EXPO_PUBLIC_PAYSTACK_KEY!}`,
            "Content-Type": "application/json"
        }
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
                subaccounts: data.subaccounts
            },
            metadata: {
                user_id: data.id,
                amount: data.amount,
                customer_name: data.firstName + " " + data.lastName,
            }
        })


        return response.data.data as {
            authorization_url: string,
            reference: string,
            access_code: string
        }
    },
    verifyTransaction: async function (transactionReference: string) {
        const response = await this.api.get(`/transaction/verify/${transactionReference}`);
        return response.data.data.status === "success"
    },
    createSubaccount: async function (data: ICreateSubaccount) {
        const response = await this.api.post("/subaccount", {
            ...data,
            settlement_bank: data.bank_code
        })

        return response.data.data as {
            subaccount_code: string,
            account_number: string
        }
    },
    listBanks: async function () {
        const response = await this.api.get("/bank", {
            params: { country: "nigeria", perPage: 100 }
        })

        return response.data.data as {
            name: string,
            code: string
        }[]
    },
    verifyAccountNumber: async function (accountNumber: string, bankCode: string) {
        const response = await this.api.get("/bank/resolve", {
            params: { account_number: accountNumber, bank_code: bankCode }
        })

        return response.data.data as {
            account_name: string,
            bank_id: number
        }
    }
}

export default Paystack;