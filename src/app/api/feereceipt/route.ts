import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";
import { validateName, validatePhoneNumber } from "@/lib/validation";

// Admin only (guarded in middleware) : save a fee receipt
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, userId, phoneNumber, amount, paymentDate, comment } = body as {
            name: string,
            userId?: string,
            phoneNumber?: string,
            amount: string | number,
            paymentDate: string,
            comment?: string
        };

        const nameError = validateName(name ?? "");
        if (nameError) return NextResponse.json({ "error": nameError }, { status: 400 });

        const phone = phoneNumber?.trim() ?? "";
        if (phone) {
            const phoneError = validatePhoneNumber(phone);
            if (phoneError) return NextResponse.json({ "error": phoneError }, { status: 400 });
        }

        const uid = userId?.trim() ?? "";
        if (uid.length > 50) return NextResponse.json({ "error": "User Id cannot exceed 50 characters" }, { status: 400 });

        const note = typeof comment === "string" ? comment.trim() : "";
        if (note.length > 500) return NextResponse.json({ "error": "Comment cannot exceed 500 characters" }, { status: 400 });

        const totalAmount = Number(amount);
        if (!Number.isInteger(totalAmount) || totalAmount < 1) {
            return NextResponse.json({ "error": "Enter a valid amount" }, { status: 400 });
        }

        // expects YYYY-MM-DD from the date input
        if (!paymentDate || !/^\d{4}-\d{2}-\d{2}$/.test(paymentDate) || Number.isNaN(Date.parse(paymentDate))) {
            return NextResponse.json({ "error": "Enter a valid payment date" }, { status: 400 });
        }

        const receipt = await prisma.feeReceipt.create({
            data: {
                name: name.trim(),
                userId: uid || null,
                phoneNumber: phone || null,
                amount: totalAmount,
                paymentDate: new Date(`${paymentDate}T00:00:00.000Z`),
                comment: note,
            }
        });

        return NextResponse.json({ "message": "Receipt saved", data: receipt }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ "error": "Unable to save receipt Internal server error" }, { status: 500 });
    }
}

// Admin only (guarded in middleware) : list receipts
export async function GET(req: NextRequest) {
    try {
        const search = req.nextUrl.searchParams.get('search')?.trim();

        const receipts = await prisma.feeReceipt.findMany({
            where: search ? {
                OR: [
                    { name: { contains: search, mode: 'insensitive' as const } },
                    { userId: { contains: search, mode: 'insensitive' as const } },
                    { phoneNumber: { contains: search } },
                ]
            } : {},
            orderBy: { id: 'desc' },
            take: 200,
        });

        return NextResponse.json({ data: receipts }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ "error": "Unable to get receipts Internal server error" }, { status: 500 });
    }
}
