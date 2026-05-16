import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import prisma from "@/lib/prismaClient";
import fs from 'fs';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const title = (formData.get('title') as string) || null;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Create uploads directory if it doesn't exist
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    
    try {
      if (!fs.existsSync(uploadDir)) {
        await mkdir(uploadDir, { recursive: true });
      }
    } catch (dirError) {
      console.error('Directory creation error:', dirError);
      return NextResponse.json(
        { error: 'Failed to create upload directory' },
        { status: 500 }
      );
    }

    // Generate unique filename
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(7);
    const fileExtension = file.name.split('.').pop() || 'jpg';
    const filename = `update-${timestamp}-${randomStr}.${fileExtension}`;
    
    // Save file
    const filepath = path.join(uploadDir, filename);
    await writeFile(filepath, buffer);

    // Save to database
    const imagePath = `/uploads/${filename}`;
    const update = await prisma.updates.create({
      data: {
        title: title,
        imagePath,
      },
    });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Update created successfully',
        data: update 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Upload error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to upload update';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const updates = await prisma.updates.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ success: true, data: updates });
  } catch (error) {
    console.error('Fetch error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch updates';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'No ID provided' },
        { status: 400 }
      );
    }

    const update = await prisma.updates.findUnique({
      where: { id: parseInt(id) },
    });

    if (!update) {
      return NextResponse.json(
        { error: 'Update not found' },
        { status: 404 }
      );
    }

    // Delete file from filesystem
    const filename = update.imagePath.split('/').pop();
    const filepath = path.join(process.cwd(), 'public', 'uploads', filename!);
    
    try {
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
      }
    } catch (fileError) {
      console.error('File deletion error:', fileError);
    }

    // Delete from database
    await prisma.updates.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Update deleted successfully' 
    });
  } catch (error) {
    console.error('Delete error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to delete update';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
    });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete update' },
      { status: 500 }
    );
  }
}
