import prisma from "@/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

interface ResetRequest {
    email: string;
    otp: string;
    sessionId: string;
    newPassword: string;
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email, otp, sessionId, newPassword } = body as ResetRequest;

        if (!email || !otp || !sessionId || !newPassword) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        // Validate OTP + sessionId
        const otpRecord = await prisma.otp.findFirst({
            where: {
                email,
                otp,
                sessionId,
            },
        });

        if (!otpRecord) {
            return NextResponse.json({ error: "Invalid OTP or session" }, { status: 400 });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update user password
        await prisma.user.update({
            where: { email },
            data: { password: hashedPassword },
        });

        // Delete OTP record
        await prisma.otp.delete({
            where: { id: otpRecord.id },
        });

        return NextResponse.json({ message: "Password updated successfully" }, { status: 200 });

    } catch (error) {
        console.error(error);
        if (error instanceof PrismaClientKnownRequestError) {
            return NextResponse.json({ error: "Database error" }, { status: 500 });
        }
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
