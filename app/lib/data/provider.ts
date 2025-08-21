import { prisma } from "@/lib/prisma";

export async function fetchAllProviders() {
  return await prisma.provider.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getProviderById(id: string) {
  return await prisma.provider.findUnique({
    where: { id },
    include: {
      trips: true
    }
  })
}

const ITEMS_PER_PAGE = 6;

export async function fetchFilteredProviders(query: string, currentPage: number) {
  const where = query
    ? {
        OR: [
          { companyName: { contains: query } },
          { companyEmail: { contains: query } },
          { companyPhonenumber: { contains: query } },
          { companyLocation: { contains: query } },
          { companyDescription: { contains: query } },
          { companyAddress: { contains: query } },
          { companyCategory: { contains: query } },
        ],
      }
    : {};

  const providers = await prisma.provider.findMany({
    where,
    skip: (currentPage - 1) * ITEMS_PER_PAGE,
    take: ITEMS_PER_PAGE,
    orderBy: { companyName: "asc" },
  });

  return providers;
}

export async function fetchProviderPages(query: string) {
  const where = query
    ? {
        OR: [
          { companyName: { contains: query } },
          { companyEmail: { contains: query } },
          { companyLocation: { contains: query } },
        ],
      }
    : {};

  const matchingProviders = await prisma.provider.findMany({
    where,
    select: { id: true },
  });

  return Math.ceil(matchingProviders.length / ITEMS_PER_PAGE);
}