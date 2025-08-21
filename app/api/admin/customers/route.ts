import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(){
    try{
        const users = await prisma.user.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                Booking: true, 
                Review: true
            }
        });

        return NextResponse.json(users);
    }catch(error){
        console.error(error);
        return NextResponse.json({ error: 'Error fetching users' }, { status: 500 });
    }
}