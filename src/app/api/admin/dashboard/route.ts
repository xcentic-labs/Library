import { NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";

interface DashboardData {
    totalLayout: number;
    totalSeats: number;
    bookedSeats: number;
    notBookedSeats: number;
    totalCounsellingRequests: number;
    pendingCounsellingRequests: number;
}

export async function GET() {
    try {
        // Total layouts
        const totalLayout = await prisma.layout.count();

        // Total seats
        const totalSeats = await prisma.seat.count();

        // Booked and not booked seats
        const bookedSeats = await prisma.seat.count({
            where: {
                isBooked: true,
            },
        });

        const notBookedSeats = totalSeats - bookedSeats;

        // Counselling requests
        const totalCounsellingRequests = await prisma.counselling.count();

        

        const pendingCounsellingRequests =  0
        // await prisma.counselling.count({
        //     where : {
                
        //     }
        // });

        const result: DashboardData = {
            totalLayout,
            totalSeats,
            bookedSeats,
            notBookedSeats,
            totalCounsellingRequests,
            pendingCounsellingRequests,
        };

        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to fetch dashboard data" },
            { status: 500 }
        );
    }
}
