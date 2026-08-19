import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import prisma from "@/lib/prismaClient";
import { Floor } from "@prisma/client";
import { validateName, validatePhoneNumber } from "@/lib/validation";

const FLOORS: Record<string, Floor> = {
    GroundFloor: "GroundFloor",
    ThirdFloor: "ThirdFloor",
};

const getBaseUrl = (req: NextRequest) => {
    const configured = process.env.NEXT_PUBLIC_BASE_URL;
    if (configured) return configured.replace(/\/$/, "");
    return req.nextUrl.origin;
};

// Public : creates a quick payment order , no login required
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, phoneNumber, pcId, amount, floor } = body as {
            name: string,
            phoneNumber: string,
            pcId?: string,
            amount: string | number,
            floor: string
        };

        const nameError = validateName(name ?? "");
        if (nameError) return NextResponse.json({ "error": nameError }, { status: 400 });

        const phoneError = validatePhoneNumber(phoneNumber ?? "");
        if (phoneError) return NextResponse.json({ "error": phoneError }, { status: 400 });

        const totalAmount = Number(amount);
        if (!totalAmount || Number.isNaN(totalAmount) || totalAmount < 1) {
            return NextResponse.json({ "error": "Enter a valid amount" }, { status: 400 });
        }

        if (!floor || !FLOORS[floor]) {
            return NextResponse.json({ "error": "Select Ground Floor or 3rd Floor" }, { status: 400 });
        }

        const tnx_id = 'PC_' + Date.now();
        const date = new Date();
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const year = date.getFullYear();
        const txn_date = `${day}-${month}-${year}`;

        const options = {
            "key": process.env.upi_gataway_api_key,
            "client_txn_id": tnx_id,
            "amount": `${totalAmount}`,
            "p_info": `Library Fee : ${floor === 'GroundFloor' ? 'Ground Floor' : '3rd Floor'}`,
            "customer_name": name.trim(),
            "customer_email": "noreply@thepathcatalyst.com",
            "customer_mobile": phoneNumber.trim(),
            "redirect_url": `${getBaseUrl(req)}/paynow?client_txn_id=${tnx_id}`,
        };

        const response = await axios.post('https://api.ekqr.in/api/create_order', options);

        if (!response || response.data?.status !== true) {
            return NextResponse.json({ "error": "Unable to place Your Order" }, { status: 500 });
        }

        await prisma.quickPayment.create({
            data: {
                name: name.trim(),
                phoneNumber: phoneNumber.trim(),
                pcId: pcId?.trim() ? pcId.trim() : null,
                amount: totalAmount,
                floor: FLOORS[floor],
                tnx_id: tnx_id,
                txn_date: txn_date,
            }
        });

        return NextResponse.json({
            "message": "Order placed Sucessfully",
            orderInfo: {
                client_txn_id: tnx_id,
                txn_date: txn_date,
                paymentUrl: response.data.data.payment_url
            }
        }, { status: 200 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ "error": "Unable to place Your Order Internal server error" }, { status: 500 });
    }
}

// Admin only : payment records , guarded in middleware
export async function GET(req: NextRequest) {
    try {
        const status = req.nextUrl.searchParams.get('status');
        const floor = req.nextUrl.searchParams.get('floor');
        const search = req.nextUrl.searchParams.get('search')?.trim();

        const payments = await prisma.quickPayment.findMany({
            where: {
                ...(status && status !== 'All' ? { status: status as any } : {}),
                ...(floor && floor !== 'All' ? { floor: floor as Floor } : {}),
                ...(search ? {
                    OR: [
                        { name: { contains: search, mode: 'insensitive' as const } },
                        { phoneNumber: { contains: search } },
                        { pcId: { contains: search, mode: 'insensitive' as const } },
                        { tnx_id: { contains: search, mode: 'insensitive' as const } },
                    ]
                } : {})
            },
            orderBy: { createdAt: 'desc' }
        });

        const collected = payments
            .filter((item) => item.status === 'Success')
            .reduce((sum, item) => sum + item.amount, 0);

        return NextResponse.json({ data: payments, collected: collected }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ "error": "Unable to get Payments Internal server error" }, { status: 500 });
    }
}
