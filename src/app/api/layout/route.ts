import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prismaClient";
import { layoutDetails } from "@/types/types";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { layoutName, layoutRows, layoutCols, pricePerMonth, pricePerWeek , boxesAt } = body as layoutDetails;

        if (!layoutName || !layoutRows || !layoutCols || !pricePerMonth || !pricePerWeek || !boxesAt) return NextResponse.json({ "error": "All Fields Are Required" }, { status: 400 });


        const layout = await prisma.layout.create({
            data: {
                layoutName,
                layoutRows,
                layoutCols,
                pricePerMonth,
                pricePerWeek,
                boxesAt
            }
        });

        if (!layout) return NextResponse.json({ "error": "Somting went wrong" }, { status: 500 });
        return NextResponse.json({ "message": "Layout Created Sucessfully" , layout : layout }, { status: 201 });

    } catch (error: unknown) {
        console.log(error)
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code == 'P2002') return NextResponse.json({ "error": "Layout already exist" }, { status: 400, statusText: 'Conflict' });
        }
        return NextResponse.json({ "error": "Internal Server error" }, { status: 500 });
    }
}

export function GET(){
    return NextResponse.json({"message" : "Har Har Mahadev from layout"} , {status : 200});
}
