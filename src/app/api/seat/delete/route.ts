import prisma from "@/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const seatId = searchParams.get("seatId");

        if (!seatId) {
            return NextResponse.json({ error: "Seat ID is required" }, { status: 400 });
        }

        const seat = await prisma.seat.findUnique({
            where: { id: +seatId }
        });

        if (!seat) {
            return NextResponse.json({ error: "Seat not found" }, { status: 404 });
        }
        const today = new Date();

        await prisma.seat.update({
            where: { id: +seatId },
            data: { 
                userId: null,
                isBooked : false,
                isExpired : true,
                bookingStartDate : today,
                bookingEndDate: today,
            } // Unassign the seat by setting userId to null
        })

        return NextResponse.json({ message: "Subscription deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting subscription:", error);
        return NextResponse.json(
            { error: "Unable to delete subscription. Internal server error." },
            { status: 500 }
        );
    }
}
