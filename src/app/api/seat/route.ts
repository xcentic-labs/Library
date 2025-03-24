import { bookseat, seatbody } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import prisma from "@/lib/prismaClient";
import crypto from "crypto";


export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        if (!body) return NextResponse.json({ "error": "Seats Data is required" }, { status: 400 });

        const result = await prisma.seat.createMany({
            data: body
        });

        if (!result) return NextResponse.json({ "error": "Unable to add Seat" }, { status: 500 })
        return NextResponse.json({ "error": `Seat  added Sucessfully` }, { status: 201 });
    } catch (error: unknown) {
        console.log(error)
        return NextResponse.json({ "error": "Unable to add Seat Internal server error" }, { status: 500 })
    }
}

export async function GET() {
    try {
        const seats = await prisma.seat.findMany({});

        if (!seats) return NextResponse.json({ "error": "Unable to get Seats" }, { status: 500 });
        if (seats.length == 0) return NextResponse.json({ "error": "No Seats" }, { status: 204 });

        return NextResponse.json(seats, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ "error": "Unable to get Seats Internal server error" }, { status: 500 })
    }
}


export async function PATCH(req: NextRequest) {
    try {

        const body = await req.json();
        const { userId, seatNumber, layoutId, timePeriod, razorpayOrderId, razorpayPaymentId, razorpaySignature } = body as bookseat;

        if (!userId || !seatNumber || !layoutId || !timePeriod || !razorpayOrderId || !razorpayPaymentId || !razorpaySignature) return NextResponse.json({ "error": "All fields are required" }, { status: 400 });

        const signature = generatedSignature(razorpayOrderId, razorpayPaymentId);

        if (signature !== razorpaySignature) return NextResponse.json( { message: 'payment verification failed'},{ status: 400 });
        
        const currentDate = new Date();
        const endDate = new Date();
        endDate.setMonth(currentDate.getMonth() + timePeriod);


        const result = await prisma.seat.updateMany({
            where: {
                AND: [
                    { seatNumber: seatNumber },
                    { layoutId: layoutId }
                ]
            },
            data: {
                bookingStartDate: currentDate,
                bookingEndDate: endDate,
                userId: userId,
                isBooked: true
            }
        });

        if (!result) return NextResponse.json({ "error": "Unable to Book seat" }, { status: 500 });
        return NextResponse.json({ "message": "Seat Booked Sucessfully", data: result });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ "error": "Unable to Book seat Internal Server Error" }, { status: 500 })
    }
}


const generatedSignature = (razorpayOrderId: string, razorpayPaymentId: string) => {
    const keySecret = process.env.key_secret;
    if (!keySecret) {
        throw new Error(
            'Razorpay key secret is not defined in environment variables.'
        );
    }
    const sig = crypto
        .createHmac('sha256', keySecret)
        .update(razorpayOrderId + '|' + razorpayPaymentId)
        .digest('hex');
    return sig;
}