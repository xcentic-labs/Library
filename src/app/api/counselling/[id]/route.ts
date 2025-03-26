import prisma from "@/lib/prismaClient";
import { NextRequest , NextResponse } from "next/server";


export async function DELETE( res: NextRequest ,{ params }: { params: { id: string } }) {
    try {
        const { id } = params

        if (!id) {
            return NextResponse.json({ error: "ID is required" }, { status: 400 });
        }

        const sessionDeleteion = await prisma.counsellingsession.deleteMany({
            where : {
                counsellingId : (+id)
            }
        })

        if(!sessionDeleteion) return NextResponse.json({"error" : "Unable to Delete the Sessions Related to The counselling"}, {status  :500});

        const result = await prisma.counselling.delete({
            where : {
                id : (+id)
            }
        })

        if (!result) return NextResponse.json({ "error": "Unable to Delete counselling" }, { status: 500 });
        return NextResponse.json({ "message": "counselling Deleted Sucessfully" }, { status: 200 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ "error": "Unable to Delete counselling Internal server error" }, { status: 500 })
    }
}