import { auth } from "@/types/types";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import { generateToken } from "@/lib/jwt";

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

        const token = generateToken( user.name , user.phonNumber , user.role);
        return NextResponse.json({"message" : "Logged in Sucessfully" , token , name : user.name , role : user.role , phoneNumber : user.phonNumber },{status : 200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({"error" : "Internal Server error"} , {status : 500});   
    }
}

export async function GET() {
    try {
        const result =  await prisma.user.findMany()
        console.log(result);
        return NextResponse.json(result , {status : 200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({"error" : "Internal server server error"} , {status : 500})
    }
}


