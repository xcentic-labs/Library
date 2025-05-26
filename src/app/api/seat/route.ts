import { bookseat } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";
import { Slot } from "@prisma/client";
import axios from "axios";
import { GiEskimo } from "react-icons/gi";

function isValidSlot(value: any): value is Slot {
    return Object.values(Slot).includes(value);
}



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
        const { userId, seatNumber, layoutId, slot, timePeriod, tnxId, txnDate } = body as bookseat;

        if (!userId || !seatNumber || !layoutId || !slot || !timePeriod || !tnxId || !txnDate) return NextResponse.json({ "error": "All fields are required" }, { status: 400 });


        const verifyResponse = await axios.post(
            "https://api.ekqr.in/api/check_order_status",
            {
                key: process.env.upi_gataway_api_key,
                client_txn_id: tnxId,
                txn_date: txnDate,
            }
        );


        const data = verifyResponse.data;

        if (data.status === true && data.data.status === "success") {

            const paymentResult = await prisma.paymentverification.update({
                where: {
                    tnx_id: tnxId,
                    isUsed : false
                },
                data: {
                    isUsed: true
                }
            });


            if(!paymentResult) return NextResponse.json({ message: 'Transaction id Alerady used' }, { status: 400 });


            const currentDate = new Date();
            const endDate = new Date();
            endDate.setMonth(currentDate.getMonth() + timePeriod);


            if (!isValidSlot(slot)) {
                return NextResponse.json({ message: 'Invalid Slot Type' }, { status: 400 });
            }

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
                    isBooked: true,
                    slot: { set: slot as unknown as Slot }
                }
            });

            if (!result) return NextResponse.json({ "error": "Unable to Book seat" }, { status: 500 });
            return NextResponse.json({ "message": "Seat Booked Sucessfully", data: result }, { status: 200 });
        }

        else {
            return NextResponse.json(
                { error: "Payment verification failed" },
                { status: 400 }
            );
        }





    } catch (error) {
        console.log(error);
        return NextResponse.json({ "error": "Unable to Book seat Internal Server Error" }, { status: 500 })
    }
}
