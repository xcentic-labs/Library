import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import prisma from "@/lib/prismaClient";

// Public : verifies a quick payment against the gateway and returns the receipt
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { tnxId } = body as { tnxId: string };

        // the gateway can append its own query string to the redirect url
        const clientTxnId = tnxId?.split("?")[0]?.trim();

        if (!clientTxnId) return NextResponse.json({ "error": "Transaction id is required" }, { status: 400 });

        const payment = await prisma.quickPayment.findUnique({
            where: { tnx_id: clientTxnId }
        });

        if (!payment) return NextResponse.json({ "error": "Payment not found" }, { status: 404 });

        // already verified , just hand back the receipt
        if (payment.status === 'Success') {
            return NextResponse.json({ message: "Payment Successful", data: payment }, { status: 200 });
        }

        const verifyResponse = await axios.post(
            "https://api.ekqr.in/api/check_order_status",
            {
                key: process.env.upi_gataway_api_key,
                client_txn_id: payment.tnx_id,
                txn_date: payment.txn_date,
            }
        );

        const data = verifyResponse.data;

        if (data.status === true && data.data.status === "success") {
            const updated = await prisma.quickPayment.update({
                where: { tnx_id: payment.tnx_id },
                data: {
                    status: 'Success',
                    gatewayTxnId: data.data.upi_txn_id ? String(data.data.upi_txn_id) : null,
                    paymentMode: data.data.remark ? String(data.data.remark) : null,
                }
            });

            return NextResponse.json({ message: "Payment Successful", data: updated }, { status: 200 });
        }

        // gateway still says the payment did not go through
        const failed = await prisma.quickPayment.update({
            where: { tnx_id: payment.tnx_id },
            data: { status: 'Failed' }
        });

        return NextResponse.json({ "error": "Payment verification failed", data: failed }, { status: 400 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ "error": "Unable to verify payment Internal server error" }, { status: 500 });
    }
}
