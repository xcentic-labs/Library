import { NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";

export async function POST(req: Request) {
  try {
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

    const newCourse = await prisma.course.create({
      data: {
        title,
        description,
        price: parsedPrice,
        images: parsedImages,
      },
    });

    return NextResponse.json(newCourse, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create course" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(courses, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 });
  }
}
