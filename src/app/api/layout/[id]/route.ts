import prisma from "@/lib/prismaClient";
import { NextRequest , NextResponse } from "next/server";


// admin specfic
export async function DELETE( res: NextRequest ,{ params }: { params: { id: string } }) {
    try {
        const { id } = params;

        if (!id) {
            return NextResponse.json({ error: "ID is required" }, { status: 400 });
        }

        const deletresult = await prisma.seat.deleteMany({
            where: {
                layoutId: (+id)
            }
        })

        const deletfee = await prisma.monthlyFee.deleteMany({
            where: {
                layoutId: (+id)
            }
        })

        if (!deletresult || !deletfee) NextResponse.json({ "error": "Unable to Delete The seats of Layout" }, { status: 500 });

        const result = await prisma.layout.delete({
            where: {
                id: (+id)
            }
        });

        if (!result) return NextResponse.json({ "error": "Unable to Delete Layout" }, { status: 500 });
        return NextResponse.json({ "message": "Layout and Seats Deleted Sucessfully" }, { status: 200 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ "error": "Unable to Delete Layouts Internal server error" }, { status: 500 })
    }
}


export async function GET(req : NextRequest,{ params }: { params: { id: string } }) {
    try {
        const { id } = params;

        if(!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });

        const currentDate = new Date();

        await prisma.seat.updateMany({
            where : {
                bookingEndDate : {
                    lt : currentDate
                }
            },
            data :{
                isBooked : false,
                userId : null,
                bookingEndDate : currentDate,
                bookingStartDate : currentDate
            }
        })

        const result = await prisma.layout.findUnique({
            where : {
                id :(+id)
            },
            include : {
                seats : true,
                Fee : true
            }
        });

        if(!result) return  NextResponse.json({ "error": "Unable to Get Layout Details" }, { status: 500 });
        return NextResponse.json({
            "message" : "Data Fetched Sucessfully",
            data : result
        } , {status : 200});

    } catch (error) {
        console.log(error);
        return NextResponse.json({ "error": "Unable to Get Layouts Details Internal server error" }, { status: 500 })
    }
}