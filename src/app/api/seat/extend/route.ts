import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";

export async function PATCH(req: NextRequest) {
    try {
        const body = await req.json();
        const { seatId, newEndDate } = body;

        // Validate required fields
        if (!seatId || !newEndDate) {
            return NextResponse.json(
                { error: "Seat ID and new end date are required" },
                { status: 400 }
            );
        }

        // Validate that the seat exists
        const seat = await prisma.seat.findUnique({
            where: { id: seatId }
        });

        if (!seat) {
            return NextResponse.json(
                { error: "Seat not found" },
                { status: 404 }
            );
        }

        // Validate that the new end date is after the current booking start date
        const newEnd = new Date(newEndDate);
        const bookingStart = new Date(seat.bookingStartDate);

        if (newEnd <= bookingStart) {
            return NextResponse.json(
                { error: "End date must be after the booking start date" },
                { status: 400 }
            );
        }

        // Update the booking end date
        const updatedSeat = await prisma.seat.update({
            where: { id: seatId },
            data: {
                bookingEndDate: newEnd
            }
        });

        return NextResponse.json(
            { 
                message: "Booking date extended successfully",
                seat: updatedSeat
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error extending booking date:", error);
        return NextResponse.json(
            { error: "Unable to extend booking date. Internal server error." },
            { status: 500 }
        );
    }
}
