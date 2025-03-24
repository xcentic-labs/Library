import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prismaClient";
import { layoutDetails } from "@/types/types";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { layoutName, layoutRows, layoutCols,  boxesAt , MonthlyFee} = body as layoutDetails;

        if (!layoutName || !layoutRows || !layoutCols || !boxesAt || !MonthlyFee) return NextResponse.json({ "error": "All Fields Are Required" }, { status: 400 });



        const layout = await prisma.layout.create({
            data: {
                layoutName,
                layoutRows,
                layoutCols,
                boxesAt
            }
        });

        const newdataarray = MonthlyFee.map((item)=>{
            return { 
                month : +(item.month),
                fee : +(item.fee),
                layoutId : layout.id
            }
        })

        console.log(newdataarray);


        const fee = await prisma.monthlyFee.createMany({
            data : newdataarray
        })

        if(!fee){
            // deleting layout
            await prisma.layout.delete({
                where : {
                    id : layout.id
                }
            })

            return NextResponse.json({ "error": "Unable to add Fee of layout" }, { status: 500});
        }
        if (!layout) return NextResponse.json({ "error": "Somting went wrong" }, { status: 500 });
        return NextResponse.json({ "message": "Layout Created Sucessfully", layout: layout }, { status: 201 });

    } catch (error: unknown) {
        console.log(error)
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code == 'P2002') return NextResponse.json({ "error": "Layout already exist" }, { status: 400, statusText: 'Conflict' });
        }
        return NextResponse.json({ "error": "Internal Server error" }, { status: 500 });
    }
}

export async function GET() {
    try {
        const layout = await prisma.layout.findMany({});

        if (!layout) return NextResponse.json({ "error": "Unable to get Layout" }, { status: 500 });

        return NextResponse.json(layout, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ "error": "Unable to get Layouts Internal server error" }, { status: 500 })
    }
}



