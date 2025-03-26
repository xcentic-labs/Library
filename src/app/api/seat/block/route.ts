import prisma from "@/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req : NextRequest) {
    try {
        const body = await req.json()
        let { status , seatID } = body;

        if(!seatID) return NextResponse.json({"error" : "All fields Are required"} , {status : 400});

        const result = await prisma.seat.update({
            where : {
                id : (+seatID)
            },
            data : {
                isBlocked : status
            }
        });

        if (!result) return NextResponse.json({ "error": "Unable to Allot Seat" }, { status: 500 });
        return NextResponse.json({ "message": "Seat Alloted Sucessfully", data: result } , {status : 200} );

    } catch (error) {
        console.log(error);
        return NextResponse.json({ "error": "Unable to Allot Seat Internal Server Error" }, { status: 500 })
    }
}