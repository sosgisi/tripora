import { prisma } from "@/lib/prisma";
import { BookingStatus, Prisma } from "@prisma/client";

export async function getBookingById(bookingId: string){
    return await prisma.booking.findFirst({
        where: {
            id: bookingId
        },
        include: {
            user: true,
            trip: true,
            payment: true,
        }
    })
}

export async function fetchAllBookings(){
    try{
        return await prisma.booking.findMany({
            include: {
                trip: {
                    include: {
                        provider: true,
                        category: true,
                        images: true,
                        reviews: true
                    }
                },
                user: true
            }
        })
    }catch (error) {
        console.error('Error fetching bookings:', error);
        return [];
    }
}

export async function fetchUserBookings(userId: string){
    try{
        return await prisma.booking.findMany({
            where: { userId },
            include: {
                trip: {
                    include: {
                        provider: true,
                        category: true,
                        images: true,
                        reviews: true
                    }
                },
                user: true
            }
        })
    }catch (error) {
        console.error('Error fetching user bookings:', error);
        return [];
    }
}

export async function fetchFilteredBookings(query: string, currentPage: number, userId: string) {
    const numberQuery = Number(query);
    
    const where: Prisma.BookingWhereInput = {
        userId,
        ...(query && {
            OR: [
                {
                    trip: {
                        OR: [
                            { title: { contains: query } },
                            { provider: { companyName: { contains: query } } }
                        ]
                    }
                },
                ...(Number.isFinite(numberQuery)
                    ? [
                        { totalPrice: { equals: numberQuery } },
                        { participantsCount: { equals: numberQuery } },
                        ]
                    : []),
                ...(query && ["pending", "paid", "cancelled"].includes(query.toLowerCase())
                    ? [{ status: { equals: query.toLowerCase() as BookingStatus } }]
                    : [])
            ]
        })
    };

    return await prisma.booking.findMany({
        where,
        include: {
            trip: {
                include: {
                    provider: true,
                    category: true,
                    images: true,
                    reviews: true
                }
            },
            user: true
        },
        skip: (currentPage - 1) * 10,
        take: 10
    });
}

export async function fetchBookingPages(query: string) {
    const numberQuery = Number(query);

    const where: Prisma.BookingWhereInput = {
        ...(query && {
            OR: [
                {
                    trip: {
                        OR: [
                            { title: { contains: query } },
                            { provider: { companyName: { contains: query } } }
                        ]
                    }
                },
                ...(Number.isFinite(numberQuery)
                    ? [
                        { totalPrice: { equals: numberQuery } },
                        { participantsCount: { equals: numberQuery } },
                        ]
                    : []),
                ...(query && ["pending", "paid", "cancelled"].includes(query.toLowerCase())
                    ? [{ status: { equals: query.toLowerCase() as BookingStatus } }]
                    : [])
            ]
        })
    };

    const totalCount = await prisma.booking.count({ where });
    const totalPages = Math.ceil(totalCount / 10);
    return { totalPages };
}