import prisma from "@/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { counsellingId, userId, tnxId, tnxDate } = body
        if (!counsellingId || !userId || !tnxId || !tnxDate) return NextResponse.json({ 'error': "All fields Are Required" }, { status: 400 });


        const verifyResponse = await axios.post(
            "https://api.ekqr.in/api/check_order_status",
            {
                key: process.env.upi_gataway_api_key,
                client_txn_id: tnxId,
                txn_date: tnxDate,
            }
        );


        const data = verifyResponse.data;

        if (data.status === true && data.data.status === "success") {

            const paymentResult = await prisma.paymentverification.update({
                where: {
                    tnx_id: tnxId,
                    isUsed: false
                },
                data: {
                    isUsed: true
                }
            })


            if (!paymentResult) return NextResponse.json({ message: 'Transaction id Alerady used' }, { status: 400 });


            const result = await prisma.counsellingsession.create({
                data: {
                    status: false,
                    counsellingId: counsellingId,
                    userId: userId
                }
            });

            if (!result) return NextResponse.json({ "error": "Unable to Book Counselling" }, { status: 500 });
            return NextResponse.json({ "message": "Counselling Booked Sucessfully" }, { status: 200 });

        }
        else {
            return NextResponse.json(
                { error: "Payment verification failed" },
                { status: 400 }
            );
        }


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
