import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { existsSync, mkdirSync, unlinkSync, writeFileSync } from 'fs';
import path from 'path';

export async function GET() {
  try {
    const trips = await prisma.trip.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        provider: true,
        images: true,
        bookings: true,
        reviews: true,
      },
    });

    return NextResponse.json(trips);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Error fetching trips' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.formData();

    const providerId = body.get("providerId") as string;
    const title = body.get("title") as string;
    const categoryId = body.get("categoryId") as string;
    const description = body.get("description") as string;
    const location = body.get("location") as string;
    const departureDate = body.get("departureDate") as string;
    const returnDate = body.get("returnDate") as string;
    const price = Number(body.get("price"));
    const maxParticipants = Number(body.get("maxParticipants"));
    const images = body.getAll("images") as File[];

    const uploadDir = path.join(process.cwd(), "public/uploads");
    // ✅ Create the folder if it doesn't exist
    if (!existsSync(uploadDir)) {
      mkdirSync(uploadDir, { recursive: true });
    }

    const savedImages = [];

    for (const file of images) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `${Date.now()}-${file.name}`;

      const filePath = path.join(process.cwd(), "public/uploads", filename);

      await writeFileSync(filePath, buffer);

      savedImages.push({
        imageUrl: `/uploads/${filename}`,
      });
    }

    const trip = await prisma.trip.create({
      data: {
        providerId,
        title,
        categoryId,
        description,
        location,
        departureDate,
        returnDate,
        price,
        maxParticipants,
        images: {
          create: savedImages
        }
      },
      include: {
        category: true,
        provider: true,
        images: true,
      }
    });

    return NextResponse.json(trip, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create trip' }, { status: 500 });
  }
}


export async function PUT(req: NextRequest) {
  try {
    const body = await req.formData();
    const id = Number(body.get("id"));

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid trip ID" }, { status: 400 });
    }

    // Check trip exists
    const trip = await prisma.trip.findUnique({
      where: { id },
      include: { images: true },
    });
    console.log("Trip found:", trip);
    if (!trip) {
      return NextResponse.json({ error: "Trip not found" }, { status: 404 });
    }

    // 1️⃣ Delete old image files from folder
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    for (const img of trip.images) {
      const imgPath = path.join(uploadDir, img.imageUrl);
      try {
        await unlinkSync(imgPath);
      } catch {
        console.warn(`File not found: ${imgPath}`);
      }
    }

    // 2️⃣ Delete old images from DB
    await prisma.tripImage.deleteMany({ where: { tripId: id } });

    // 3️⃣ Handle new images
    const files = body.getAll("images") as File[];
    const newImageData = [];

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const filename = `${Date.now()}-${file.name}`;
      const filePath = path.join(uploadDir, filename);

      await writeFileSync(filePath, buffer);

      newImageData.push({ imageUrl: filename });
    }

    // 4️⃣ Update trip with new images
    const updatedTrip = await prisma.trip.update({
      where: { id },
      data: {
        title: body.get("title") as string,
        categoryId: body.get("categoryId") as string,
        description: body.get("description") as string,
        location: body.get("location") as string,
        departureDate: body.get("departureDate") as string,
        returnDate: body.get("returnDate") as string,
        price: Number(body.get("price")),
        maxParticipants: Number(body.get("maxParticipants")),
        images: { create: newImageData },
      },
      include: { images: true },
    });

    return NextResponse.json(updatedTrip, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update trip" }, { status: 500 });
  }
}


export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    const tripId = Number(id);

    if (!tripId) {
      return NextResponse.json({ error: "Invalid trip ID" }, { status: 400 });
    }

    // 1️⃣ Get the trip and images first
    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
      include: { images: true },
    });

    if (!trip) {
      return NextResponse.json({ error: "Trip not found" }, { status: 404 });
    }

    // 2️⃣ Delete image files from /public/uploads
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    for (const img of trip.images) {
      const filename = img.imageUrl.replace("/uploads/", ""); // clean URL
      const imgPath = path.join(uploadDir, filename);
      if (existsSync(imgPath)) {
        try {
          unlinkSync(imgPath);
        } catch (err) {
          console.warn(`Failed to delete file: ${imgPath}`, err);
        }
      }
    }

    // 3️⃣ Delete related DB records first (manual cascade)
    await prisma.booking.deleteMany({
      where: { tripId },
    });

    await prisma.review.deleteMany({
      where: { tripId },
    });

    await prisma.tripImage.deleteMany({
      where: { tripId },
    });

    // 4️⃣ Delete the trip
    await prisma.trip.delete({
      where: { id: tripId },
    });

    return NextResponse.json({ message: "Trip deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Delete Trip Error:", error);
    return NextResponse.json(
      { error: error || "Failed to delete trip" },
      { status: 500 }
    );
  }
}
