import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const tripId = parseInt(id, 10);

  if (!tripId || isNaN(tripId)) {
    return new NextResponse("Trip ID is required", { status: 400 });
  }

  const trip = await prisma.trip.findUnique({
    where: { id: tripId },
    include: {
      category: true,
      provider: true,
      images: true,
    },
  });

  if (!trip) {
    return new NextResponse("Trip not found", { status: 404 });
  }

  return NextResponse.json({ trip }, { status: 200 });
}

