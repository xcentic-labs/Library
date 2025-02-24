import { NextRequest, NextResponse } from "next/server";
import { User } from "@/types/types";
import bcrypt from 'bcrypt'
import { PrismaClient } from "@prisma/client";
const prisma =new PrismaClient();


export async function POST( req : NextRequest ) {
    try {
        const body = await req.json()
        const {name  , phoneNumber , email , password } = body as User;

        if(!name || !phoneNumber || !email || !password) return NextResponse.json({"error" : "All fields are Required"}, { status : 400});

        const hasedpassword = await bcrypt.hash(password , 10)

        const result = await prisma.user.create({
            data : {
                name : name,
                phonNumber : phoneNumber,
                email : email,
                password : hasedpassword,
            }
        });

        if(!result) return NextResponse.json({"error" : "Somting went wrong"}, { status : 500});
        return NextResponse.json({"message" : "User Created Sucessfully"}, { status : 200});
    } catch (error) { 
        console.log(error)
        return NextResponse.json({"error" : "Internal Server error"}, { status : 500});
    }
}