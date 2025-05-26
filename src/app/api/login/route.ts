import { auth } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import { generateToken } from "@/lib/jwt";
import { cookies } from "next/headers";
import prisma from "@/lib/prismaClient";

export async function POST(req : NextRequest) {
    try {
        const body  = await req.json();
        const {phoneNumber , password } = body as auth

        if(!phoneNumber || !password) return NextResponse.json({"error" : "All Fields Are Required"} , {status : 400});

        const user = await prisma.user.findUnique({
            where : {
                phoneNumber : phoneNumber,
            }
        });


        console.log(user)

        if(!user) return NextResponse.json({"error" : "User Not Found"} , {status : 404});

        const isMatched = await bcrypt.compare(password , user.password)

        if(!isMatched) return NextResponse.json({"error" : "Password Not Matched"} , {status  :403});


        const updatedUser = await prisma.user.update({
            where  : {
                phoneNumber : phoneNumber
            },
            data : {
                isLoggedIn  : true
            }
        });

        const authPermission = await prisma.menu.findMany({
            where : {
                permitTo : user.role                
            },
            include : {
                item : true
            }
        });

        if(!updatedUser) return NextResponse.json({"error" : "Unable To login"} , {status  :500});

        const date = new Date();
        date.setDate(date.getDate()+30)

        const cookie = await cookies()
        const token = generateToken( user.name , user.phoneNumber , user.role);
        cookie.set('authtoken' , token , {expires : date});
        cookie.set('userId' , user.id.toString() , {expires : date});

        return NextResponse.json({"message" : "Logged in Sucessfully" , auth : {
            authstatus : true,
            authInfo : {
                id : user.id,
                name : user.name,
                phoneNumber : user.phoneNumber,
                role : user.role,
                email : user.email
            },
            authPermission : authPermission
        } },{status : 200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({"error" : "Internal Server error"} , {status : 500});   
    }
}


