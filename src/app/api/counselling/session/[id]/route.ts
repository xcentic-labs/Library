import prisma from "@/lib/prismaClient";
import { NextRequest , NextResponse } from "next/server";

export async function GET(res: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params

        const session = await prisma.counsellingsession.findMany({
            where: {
                userId : (+id)
            },
            include: {
                counselling: true

            }
        })

        if (!session) return NextResponse.json({ "error": "Unable to Get Sessions" }, { status: 500 });
        return NextResponse.json(session, { status: 200 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ "error": "Unable to Get Sessions Internal server error" }, { status: 500 })
    }
}

export async function PATCH(res: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params

        const session = await prisma.counsellingsession.update({
            where : {
                id : (+id)
            },
            data : {
                status : true
            }
        })

        if (!session) return NextResponse.json({ "error": "Unable to Get Sessions" }, { status: 500 });
        return NextResponse.json(session, { status: 200 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ "error": "Unable to Get Sessions Internal server error" }, { status: 500 })
    } 
}