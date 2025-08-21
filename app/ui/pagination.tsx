import Link from "next/link";

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div className="flex gap-2 mt-4">
      {pages.map((page) => (
        <Link
          key={page}
          href={`?page=${page}`}
          className="px-3 py-1 border rounded hover:bg-gray-100 dark:hover:bg-gray-900"
        >
          {page}
        </Link>
      ))}
    </div>
  );
}