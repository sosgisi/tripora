import { prisma } from "@/lib/prisma";

const ITEMS_PER_PAGE = 6;

export async function fetchAllUsers() {
    return await prisma.user.findMany({
        orderBy: { createdAt: "desc"}
    })
}

export async function fetchFilteredUsers(query: string, currentPage: number){
    return await prisma.user.findMany({
        where: {
            OR: [
                { name: { contains: query }, },
                { email: { contains: query }, },
                { phonenumber: { contains: query }, },
                { location: { contains: query }, },
                { role: { contains: query }, },
            ]
        },
        include: {
            Booking: true,
            Review: true
        },
        skip: (currentPage - 1) * ITEMS_PER_PAGE,
        take: ITEMS_PER_PAGE,
        orderBy: { createdAt: "desc" }
    });
}

export async function fetchUserPages(query: string){
    const count = await prisma.user.count({ 
        where: {
            OR: [
                { name: { contains: query }, },
                { email: { contains: query }, },
                { phonenumber: { contains: query }, },
                { location: { contains: query }, },
                { role: { contains: query }, },
            ]
        }
    });
    return Math.ceil(count / ITEMS_PER_PAGE);
}