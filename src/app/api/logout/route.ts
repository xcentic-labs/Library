import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prismaClient";

export async function GET(req: NextRequest) {
    try {
        const cookie = await cookies()
        const id =  cookie.get('userId')?.value;

        if(!id) return NextResponse.json({"error" : "Unable To Logout Try Deleting Cookies"} , {status : 400});

        const user = await prisma.user.update({
            where : {
                id : (+id)
            },
            data : {
                isLoggedIn : false
            }
        });

        if(!id) return NextResponse.json({"error" : "Unable To Logout Try Deleting Cookies"} , {status : 400});
        return NextResponse.json({"message" : "Logout Sucessfully"} , {status : 200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({"error" : "Unable To Logout Internal Server Error"} , {status : 500});
    }
}