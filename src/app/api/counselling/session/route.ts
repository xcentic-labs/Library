import prisma from "@/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";
import { generatedSignature } from "../../seat/route";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { counsellingId, userId, razorpayOrderId, razorpayPaymentId, razorpaySignature } = body
        if (!counsellingId || !userId || !razorpayOrderId || !razorpayPaymentId || !razorpaySignature) return NextResponse.json({ 'error': "All fields Are Required" }, { status: 400 });


        const signature = generatedSignature(razorpayOrderId, razorpayPaymentId);

        if (signature !== razorpaySignature) return NextResponse.json({ message: 'Payment verification failed' }, { status: 400 });

        const result = await prisma.counsellingsession.create({
            data: {
                status: false,
                counsellingId: counsellingId,
                userId: userId
            }
        });

        if (!result) return NextResponse.json({ "error": "Unable to Book Counselling" }, { status: 500 });
        return NextResponse.json({ "message": "Counselling Booked Sucessfully" }, { status: 200 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ "error": "Unable to Book Counselling Internal Server Error" }, { status: 500 });
    }
}



export async function GET(req: NextRequest) {
    try {
        const type = req.nextUrl?.searchParams?.get('type')

        let result = null

        if (type == 'all') {
            result = await prisma.counsellingsession.findMany({
                select: {
                    id: true,
                    userId: true,
                    counsellingId: true,
                    status: true,
                    createrAt: true,
                    bookedBy: {
                        select: {
                            email: true,
                            name: true,
                            phoneNumber: true,
                        }
                    },
                    counselling: true
                }
            })
        } else {
            result = await prisma.counsellingsession.findMany({
                where: {
                    status: false
                },
                select: {
                    id: true,
                    userId: true,
                    counsellingId: true,
                    status: true,
                    createrAt: true,
                    bookedBy: {
                        select: {
                            email: true,
                            name: true,
                            phoneNumber: true,
                        }
                    },
                    counselling: true
                }
            })
        }

        if (!result) NextResponse.json({ "error": "Unable To Get Session List" }, { status: 500 });
        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ "error": "Internal server error" }, { status: 500 })
    }
}
