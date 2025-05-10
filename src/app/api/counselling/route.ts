import prisma from "@/lib/prismaClient";
import { counselling } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, price, benefits } = body  as counselling

        console.log(body)
        if (!name || !price || !benefits) return NextResponse.json({ "error": "All Fields Are required" }, { status: 400 });

        const result = await prisma.counselling.create({
            data: {
                name: name,
                price: (+price),
                benefits: benefits
            }
        })

        if (!result) return NextResponse.json({ "error": "Unable to add counselling" }, { status: 500 });
        return NextResponse.json({ "message": "counselling Added sucessfully" }, { status: 200 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({"error" : "Unable to add counselling Internal Server Error"} , {status : 500});
    }
}


export async function GET() {
    try {
        const result = await prisma.counselling.findMany({});
        if (!result) return NextResponse.json({ "error": "Unable to get counselling" }, { status: 500 });
        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({"error" : "Unable to Get counselling Internal Server Error"} , {status : 500});
    } 
}