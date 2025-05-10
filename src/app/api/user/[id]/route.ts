import prisma from "@/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";

interface details {
    education : string,
    fatherName : string,
    motherName : string,
    AadharNumber : string,
    Gender : string
}

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
                        slot : true,
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


// update the more details
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const body = await req.json();

        const {education , fatherName , motherName ,AadharNumber , Gender } = body
        
        const user = await prisma.user.update({
            where : {
                id : +id
            },
            data :{
                education : education,
                fatherName : fatherName,
                motherName : motherName,
                AadharNumber : AadharNumber,
                Gender : Gender
            }
        })

        if (!user) return NextResponse.json({ "error": "User Not Found" }, { status: 404 });
        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ "error": "User To Get User Internal Server error" }, { status: 500 });
    }    
}