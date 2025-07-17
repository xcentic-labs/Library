import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const body = await req.json();

        const { bookingEndDate, bookingStartDate } = body

        const seat = await prisma.seat.update({
            where: {
                id: +id
            },
            data: {
                bookingStartDate: new Date(bookingStartDate),
                bookingEndDate: new Date(bookingEndDate),
            }
        });

        if (!seat) return NextResponse.json({ "error": "Seat Not found" }, { status: 404 });
        return NextResponse.json({ seat }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ "error": "Unable To Get seat Internal Server error" }, { status: 500 });
    }
}