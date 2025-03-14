import { auth } from "@/types/types";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import { generateToken } from "@/lib/jwt";
import { cookies } from "next/headers";

// prisma client
const prisma = new PrismaClient();

export async function POST(req : NextRequest) {
    try {
        const body  = await req.json();
        const {phoneNumber , password } = body as auth

        if(!phoneNumber || !password) return NextResponse.json({"error" : "All Fields Are Required"} , {status : 400});

        const user = await prisma.user.findUnique({
            where : {
                phonNumber : phoneNumber,
            }
        });

        console.log(user)

        if(!user) return NextResponse.json({"error" : "User Not Found"} , {status : 404});

        const isMatched = await bcrypt.compare(password , user.password)

        if(!isMatched) return NextResponse.json({"error" : "Password Not Matched"} , {status  :403});

        const cookie = await cookies()
        const token = generateToken( user.name , user.phonNumber , user.role);
        cookie.set('authtoken' , token)
        return NextResponse.json({"message" : "Logged in Sucessfully" , auth : {
            authstatus : true,
            authInfo : {
                name : user.name,
                phoneNumber : user.phonNumber,
                role : user.role
            }
        } },{status : 200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({"error" : "Internal Server error"} , {status : 500});   
    }
}


