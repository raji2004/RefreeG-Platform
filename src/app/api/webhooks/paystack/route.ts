import { NextResponse } from "next/server";
import { logTransaction } from "@/lib/firebase/actions";


// Define types for Paystack webhook data
export async function POST(request: Request) {
    const payload = await request.text();
    const webhookData = JSON.parse(payload);
    const event: "charge.success" = webhookData.event;
    try {
        switch (event) {
            case "charge.success":
                await logTransaction(webhookData.data.metadata);
                return new NextResponse(JSON.stringify({ message: 'Webhook received and processed successfully' }), { status: 201 });
            default:
                return new NextResponse(JSON.stringify({ message: 'Webhook event not supported yet' }), { status: 200 });
        }
    } catch (e) {
        return new NextResponse(JSON.stringify({
            error: e,
            message: `An error occurred: ${e}`
        }), { status: 500 });
    }
}

