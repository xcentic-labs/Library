import { NextRequest, NextResponse } from "next/server";
import { User } from "@/types/types";
import bcrypt from 'bcrypt'
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import prisma from "@/lib/prismaClient";


export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { name, phoneNumber, email, password } = body as User;

        if (!name || !phoneNumber || !email || !password) return NextResponse.json({ "error": "All fields are Required" }, { status: 400 });

        const hasedpassword = await bcrypt.hash(password, 10)

        const result = await prisma.user.create({
            data: {
                name: name,
                phonNumber: phoneNumber,
                email: email,
                password: hasedpassword,
            }
        });

        if (!result) return NextResponse.json({ "error": "Somting went wrong" }, { status: 500 });
        return NextResponse.json({ "message": "User Created Sucessfully" }, { status: 200 });
    } catch (error :  unknown) {
        console.log(error)
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code == 'P2002') return NextResponse.json({ "error": "User already exist ,Login to continue" }, { status: 400, statusText: 'Conflict' });
        }
        return NextResponse.json({ "error": "Internal Server error" }, { status: 500 });
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