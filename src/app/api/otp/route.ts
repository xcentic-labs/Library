import prisma from "@/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";
import { sendOtpEmail } from "@/lib/sendotp";

interface EmailPayload {
  email: string;
}

// Utility functions
function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
}

function generateSessionId(): string {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body as EmailPayload;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Generate sessionId and OTP
    const sessionId = generateSessionId();
    const otp = generateOtp();


    const isSent = await sendOtpEmail(email, otp);

    if(!isSent){
      return NextResponse.json({ error: "Unable To Send OTP" }, { status: 503 });
    }


    // Save to otp table
    const result = await prisma.otp.create({
      data: {
        email,
        sessionId,
        otp,
      },
    });



    if (!result) {
      return NextResponse.json({ error: "Unable to save OTP" }, { status: 500 });
    }

    return NextResponse.json(
      { message: "OTP generated successfully", sessionId },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
