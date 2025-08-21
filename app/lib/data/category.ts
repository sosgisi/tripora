import { prisma } from "@/lib/prisma";

export async function fetchAllCategory() {
  return await prisma.category.findMany({
    orderBy: { createdAt: "desc" },
  });
}

const ITEMS_PER_PAGE = 6;

export async function fetchFilteredCategory(query: string, currentPage: number) {
  const where = query
    ? {
        OR: [
          { name: { contains: query } },
        ],
      }
    : {};

  const categories = await prisma.category.findMany({
    where,
    skip: (currentPage - 1) * ITEMS_PER_PAGE,
    take: ITEMS_PER_PAGE,
    orderBy: { name: "asc" },
  });

  return categories;
}

export async function fetchCategoryPages(query: string) {
  const where = query
    ? {
        OR: [
          { name: { contains: query } },
        ],
      }
    : {};

  const matchingCategory = await prisma.category.findMany({
    where,
    select: { id: true },
  });

  return Math.ceil(matchingCategory.length / ITEMS_PER_PAGE);
}