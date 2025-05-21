
import { NextResponse } from 'next/server';
import prisma from '@/lib/prismaClient';


export async function POST(req: Request) {
  const body = await req.json();
  const { title, description } = body;

  try {
    const newAnnouncement = await prisma.announcement.create({
      data: { title, description },
    });
    return NextResponse.json(newAnnouncement, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create announcement' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const announcements = await prisma.announcement.findMany();
    return NextResponse.json(announcements);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch announcements' }, { status: 500 });
  }
}
