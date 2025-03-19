import prisma from "@/lib/prismaClient";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const layoutName =  await prisma.layout.findMany({
            select :{
                id : true,
                layoutName : true
            }
        });


        if (!layoutName) return NextResponse.json({ "error": "Unable to get Layout Names" }, { status: 500 });

        return NextResponse.json(layoutName, { status: 200 });
    } catch (error) {
        console.log(error);
        NextResponse.json({"error" : "Unable to Get Names Internal Server Error"} , { status : 500})
    }    
}