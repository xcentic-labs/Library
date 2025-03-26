import prisma from "@/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req : NextRequest ,{ params }: { params: { id: string } }) {
    try {
        const body = await req.json()
        const { userId , seatID ,timePeriod } = body;

        if(!userId || !seatID || !timePeriod) return NextResponse.json({"error" : "All fields Are required"} , {status : 400});

        const currentDate = new Date();
        const endDate = new Date();
        endDate.setMonth(currentDate.getMonth() + (+timePeriod));
        
        const result = await prisma.seat.update({
            where : {
                id : (+seatID)
            },
            data : {
                userId : (+userId),
                bookingStartDate: currentDate,
                bookingEndDate: endDate,
                isBooked: true
            }
        });

        if (!result) return NextResponse.json({ "error": "Unable to Allot Seat" }, { status: 500 });
        return NextResponse.json({ "message": "Seat Alloted Sucessfully", data: result } , {status : 200} );

    } catch (error) {
        console.log(error);
        return NextResponse.json({ "error": "Unable to Allot Seat Internal Server Error" }, { status: 500 })
    }
}