// app/api/announcement/[id]/route.ts
import prisma from '@/lib/prismaClient';
import { NextResponse } from 'next/server';



export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);

  try {
    const deleted = await prisma.announcement.delete({
      where: { id },
    });
    return NextResponse.json(deleted);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete announcement' }, { status: 500 });
  }
}
