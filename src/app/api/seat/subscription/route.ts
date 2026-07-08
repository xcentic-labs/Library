import prisma from "@/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
    try {
        const body = await req.json();
        const { seatId, newStartDate, newEndDate } = body;

        if (!seatId || !newStartDate || !newEndDate) {
            return NextResponse.json(
                { error: "Seat ID, start date, and end date are required" },
                { status: 400 }
            );
        }

        const seat = await prisma.seat.findUnique({
            where: { id: +seatId }
        });

        if (!seat) {
            return NextResponse.json({ error: "Seat not found" }, { status: 404 });
        }

        const startDate = new Date(newStartDate);
        const endDate = new Date(newEndDate);

        if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
            return NextResponse.json({ error: "Invalid date format provided" }, { status: 400 });
        }

        if (endDate <= startDate) {
            return NextResponse.json(
                { error: "End date must be after the start date" },
                { status: 400 }
            );
        }

        const updatedSeat = await prisma.seat.update({
            where: { id: +seatId },
            data: {
                bookingStartDate: startDate,
                bookingEndDate: endDate,
                isBooked: true,
                isExpired: false
            }
        });

        return NextResponse.json(
            {
                message: "Subscription dates updated successfully",
                seat: updatedSeat
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating subscription dates:", error);
        return NextResponse.json(
            { error: "Unable to update subscription dates. Internal server error." },
            { status: 500 }
        );
    }
}
