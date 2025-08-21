import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

const ITEMS_PER_PAGE = 6;

export async function fetchAllTrips() {
  return await prisma.trip.findMany({
    orderBy: { createdAt: "desc" }
  });
}

export async function getTripById(id: number){
  try{
    return await prisma.trip.findFirst({
      where: { id: Number(id) },
      include: {
        bookings: true,
        category: true,
        images: true,
        provider: true,
        reviews: true,
      }
    })
  }catch (error) {
    console.error('Error fetching trip:', error);
    return null;
  }
}

export async function fetchFilteredTrips(query: string, currentPage: number, category?: string) {
  const numberQuery = Number(query);
  const booleanQuery = query.toLowerCase() === 'true' || query.toLowerCase() === 'false';

  const where: Prisma.TripWhereInput = {
    ...(query && {
      OR: [
        { title: { contains: query } },
        { location: { contains: query } },
        {
          category: {
            name: { contains: query }
          }
        },
        {
          provider: {
            companyName: { contains: query }
          }
        },
        { departureDate: { contains: query } },
        { returnDate: { contains: query } },
        ...(Number.isFinite(numberQuery)
          ? [
              { price: { equals: numberQuery } },
              { maxParticipants: { equals: numberQuery } },
              { currentParticipants: { equals: numberQuery } }
            ]
          : []),
        ...(booleanQuery
          ? [{ isActive: { equals: query.toLowerCase() === 'true' } }]
          : [])
      ]
    }),
    ...(category && {
      category: {
        name: category
      }
    })
  };

  return await prisma.trip.findMany({
    where,
    include: {
      category: true,
      provider: true,
      images: true,
      bookings: true,
      reviews: true
    },
    skip: (currentPage - 1) * ITEMS_PER_PAGE,
    take: ITEMS_PER_PAGE,
    orderBy: { createdAt: 'desc' }
  });
}


export async function fetchTripPages(query: string) {
  const numberQuery = Number(query);
  const booleanQuery = query.toLowerCase() === 'true' || query.toLowerCase() === 'false';

  const where: Prisma.TripWhereInput = query
    ? {
        OR: [
          { title: { contains: query } },
          { location: { contains: query } },
          { 
            category: {
              name: { contains: query }
            } 
          },
          {
            provider: {
              companyName: { contains: query },
            },
          },
          { departureDate: { contains: query }},
          { returnDate: { contains: query }},
          ...(Number.isFinite(numberQuery)
            ? [
                { price: { equals: numberQuery } },
                { maxParticipants: { equals: numberQuery } },
                { currentParticipants: { equals: numberQuery } },
              ]
            : []),
          ...(booleanQuery
            ? [{ isActive: { equals: query.toLowerCase() === 'true' } }]
            : []),
        ],
      }
    : {};

  const totalTrips = await prisma.trip.count({ where });
  const totalPages = Math.ceil(totalTrips / ITEMS_PER_PAGE);
  return {
    totalTrips,
    totalPages
  }
}
