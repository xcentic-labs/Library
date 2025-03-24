import prisma from "@/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        
        const user = await prisma.user.findUnique({
            where: {
                id: (+id)
            },
            select: {
                id: true,
                name: true,
                phoneNumber: true,
                email: true,
                role: true,
                seat: {
                    select: {
                        id: true,
                        userId: true,
                        isLocker: true,
                        seatNumber: true,
                        index: true,
                        isBooked: true,
                        bookingStartDate: true,
                        bookingEndDate: true,
                        layoutId: true,
                        layout: { 
                            select: {
                                layoutName : true
                            },
                        },
                    },
                },
            }
        })

        if (!user) return NextResponse.json({ "error": "User Not Found" }, { status: 404 });
        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ "error": "User To Get User Internal Server error" }, { status: 500 });
    }
}