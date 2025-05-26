import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prismaClient";
import { use } from "react";

export async function GET(req: NextRequest) {
    try {
        const cookie = await cookies()
        const id =  cookie.get('userId')?.value;

        if(!id) return NextResponse.json({"message" : "User not LoggedIn" ,  user :{
            status : false,
            name : "",
            phoneNUmber : "",
            role : "",
            id : "",
            email : ""
        } } , {status : 200});

        const user = await prisma.user.findUnique({
            where : {
                id :(+id)
            }
        });

        const data = {
            status: true,
            name: user?.name,
            phoneNumber: user?.phoneNumber,
            role: user?.role,
            id: user?.id,
            email : user?.email
        }

        if(user?.isLoggedIn) return NextResponse.json({"message" : "User Logged in" , user : data } , {status : 200});
        return NextResponse.json({"message" : "User not LoggedIn" ,  user :{
            status : false,
            name : "",
            phoneNUmber : "",
            role : "",
            id : "",
        } } , {status : 200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({"message" : "User not LoggedIn" ,  user :{
            status : false,
            name : "",
            phoneNUmber : "",
            role : "",
            id : "",
        } } , {status : 200});
    }
}