import { bookseat, seatbody } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const { seatNumber, isLocker } = body as seatbody

        if (!seatNumber || !isLocker) return NextResponse.json({ "error": "Seat NUmber and Locker Status required" }, { status: 400 });

        const result = await prisma.seat.create({
            data: {
                seatNumber: seatNumber,
                isLocker: isLocker
            }
        })

        if (!result) return NextResponse.json({ "error": "Unable to add Seat" }, { status: 500 })
        return NextResponse.json({ "error": `Seat Number ${result.seatNumber} added Sucessfully` });
    } catch (error: unknown) {
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code == 'P2002') return NextResponse.json({ "error": "Seat already added" }, { status: 400, statusText: 'Conflict' });
        }
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


export async function PATCH( req : NextRequest) {
    try {

        const body = await req.json();
        const {userId , seatNumber } = body as bookseat;

        if(!userId || !seatNumber) return NextResponse.json({"error" : "All fields are required"} , {status : 400});

        

    } catch (error) {
        console.log(error);
        return NextResponse.json({ "error": "Unable to update seat " }, { status: 500 })
    }
}