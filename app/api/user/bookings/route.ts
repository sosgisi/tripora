import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest){
    try{
        const body = await req.json();

        if(!body.name || !body.email || body.participantCount===0) {
            return NextResponse.json({ message: "All fields are required"}, { status: 400 });
        }
        if(!body.userId || !body.tripId) {
            return NextResponse.json({ message: "You're not Logged In" }, { status: 400 });
        }

        const existingBooking = await prisma.booking.findFirst({
            where: {
                userId: body.userId,
                tripId: body.tripId,
                status: 'pending',
            }
        });
        if(existingBooking){
            return NextResponse.json({ message: "You already have a pending booking for this trip" }, { status: 400 });
        }

        const booking = await prisma.booking.create({
            data: {
                name: body.name,
                userId: body.userId,
                tripId: body.tripId,
                participantsCount: body.participantCount || 0,
                totalPrice: body.totalPrice || 0,
                status: 'pending',
            }
        })

        return NextResponse.json({ booking }, { status: 201 });
    }catch(err){
        console.error('Failed to create booking: ', err);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function PUT(req: NextRequest){
    try{
        const body = await req.json();
        const booking = await prisma.booking.update({
            where: { id: body.id },
            data: {
                status: body.status,
            }
        });
        return NextResponse.json({booking});
    }catch(error){
        console.log('Booking PUT error: ', error);
        return NextResponse.json({ error: error }, { status: 500 });
    }
}

export async function DELETE(req: Request){
    try{
        const { id } = await req.json();
        const bookingId = id;

        if(!bookingId) return NextResponse.json({ error: "Invalid Booking ID" }, { status: 400 });
        
        const booking = await prisma.booking.findFirst({
            where: { id: bookingId },
            include: {
                payment: true
            }
        });

        if(!booking) return NextResponse.json({ error: "Booking not found" }, { status: 404 });
        
        await prisma.booking.delete({
            where: { id: bookingId }
        })
        return NextResponse.json({ message: 'Booking deleted successfully'}, { status: 200})
    }catch(error){
        console.error("Delete Booking Error:", error);
        return NextResponse.json(
        { error: error || "Failed to delete booking" },
        { status: 500 }
        );
    }
}