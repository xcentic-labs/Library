import prisma from "@/lib/prismaClient";
import { NextRequest, NextResponse } from "next/server";
import * as fs from 'fs';
import * as path from 'path';

interface details {
    education : string,
    fatherName : string,
    motherName : string,
    AadharNumber : string,
    Gender : string
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        
        const user = await prisma.user.findUnique({
            where: {
                id: (+id)
            },
            select: {
                id: true,
                name: true,
                phoneNumber: true,
                email: true,
                role: true,
                motherName : true,
                fatherName : true,
                AadharNumber : true,
                aadharPhoto : true,
                userPhoto : true,
                seat: {
                    select: {
                        id: true,
                        userId: true,
                        isLocker: true,
                        seatNumber: true,
                        index: true,
                        isBooked: true,
                        slot : true,
                        bookingStartDate: true,
                        bookingEndDate: true,
                        layoutId: true,
                        layout: { 
                            select: {
                                layoutName : true
                            },
                        },
                    },
                },
            }
        })

        if (!user) return NextResponse.json({ "error": "User Not Found" }, { status: 404 });
        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ "error": "User To Get User Internal Server error" }, { status: 500 });
    }
}


// update the more details
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const body = await req.json();

        const { education, fatherName, motherName, AadharNumber, Gender, userPhoto, aadharPhoto } = body;

        const dataToUpdate: any = {
            education,
            fatherName,
            motherName,
            AadharNumber,
            Gender
        };

        // Helper to save base64 image to public/uploads and return relative path
        const saveBase64Image = (base64?: string, prefix = 'upload') => {
            if (!base64) return null;
            // base64 is expected like: data:<mime>;base64,<data>
            const matches = base64.match(/^data:(image\/(png|jpeg|jpg|webp));base64,(.+)$/);
            const timestamp = Date.now();
            const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
            if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
            if (matches) {
                const ext = matches[1].split('/')[1];
                const data = matches[3];
                const buffer = Buffer.from(data, 'base64');
                const filename = `${prefix}_${id}_${timestamp}.${ext}`;
                const filepath = path.join(uploadsDir, filename);
                fs.writeFileSync(filepath, buffer);
                return `/uploads/${filename}`;
            }
            return null;
        }

        // Save images if provided (base64)
        const savedUserPhotoPath = saveBase64Image(userPhoto, 'user');
        const savedAadharPhotoPath = saveBase64Image(aadharPhoto, 'aadhar');

        if (savedUserPhotoPath) dataToUpdate.userPhoto = savedUserPhotoPath;
        if (savedAadharPhotoPath) dataToUpdate.aadharPhoto = savedAadharPhotoPath;

        const user = await prisma.user.update({
            where: { id: +id },
            data: dataToUpdate
        });

        if (!user) return NextResponse.json({ "error": "User Not Found" }, { status: 404 });
        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ "error": "User To Get User Internal Server error" }, { status: 500 });
    }    
}