import { NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);

    if (Number.isNaN(id)) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    const course = await prisma.course.findUnique({
      where: { id },
    });

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    return NextResponse.json(course, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch course" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);

    if (Number.isNaN(id)) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    const body = await req.json();
    const { title, description, price, images } = body;

    if (!title || !description || price === undefined || price === null) {
      return NextResponse.json(
        { error: "title, description and price are required" },
        { status: 400 }
      );
    }

    const parsedPrice = Number(price);
    if (Number.isNaN(parsedPrice) || parsedPrice < 0) {
      return NextResponse.json(
        { error: "price must be a valid positive number" },
        { status: 400 }
      );
    }

    const parsedImages = Array.isArray(images)
      ? images.filter((img) => typeof img === "string" && img.trim() !== "")
      : typeof images === "string" && images.trim() !== ""
      ? [images.trim()]
      : [];

    const updated = await prisma.course.update({
      where: { id },
      data: {
        title,
        description,
        price: parsedPrice,
        images: parsedImages,
      },
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update course" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);

    if (Number.isNaN(id)) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    const deleted = await prisma.course.delete({
      where: { id },
    });

    return NextResponse.json(deleted, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete course" }, { status: 500 });
  }
}
