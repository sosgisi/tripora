import { fetchTripPages } from "@/app/lib/data/trip";
import Pagination from "@/app/ui/pagination";
import Search from "@/app/ui/search";
import TableSkeleton from "@/app/ui/skeleton";
import { Navbar } from "@/components/navbar";
import { Suspense } from "react";
import TripCard from "./trip-card";
import { fetchAllCategory } from "@/app/lib/data/category";
import CategoryFilter from "@/app/ui/category-filter";

interface PageProps {
  searchParams?: {
    query?: string;
    page?: string;
    category?: string;
  };
}

export default async function Page({ searchParams }: PageProps) {
  const query = searchParams?.query || "";
  const category = searchParams?.category || "";
  const currentPage = Number(searchParams?.page) || 1;

  const { totalPages } = await fetchTripPages(query);
  const categories = await fetchAllCategory();

  return (
    <>
      <Navbar />
      <div className="mt-20 flex flex-col justify-center items-center" dir="rtl">
        <h1 className="text-heading">استكشف الرحلات</h1>
        <p className="text-gray-500">ابحث عن رحلة تناسب اهتماماتك وشغفك</p>
      </div>
      <div className="px-10 py-5 flex gap-5" dir="rtl">
        <Search placeholder="ابحث عن رحلة..." />
        <CategoryFilter categories={categories} />
      </div>

      <div className="flex flex-col gap-5 my-5 px-10" dir="rtl">
        <Suspense fallback={<TableSkeleton />}>
          <TripCard query={query} currentPage={currentPage} category={category} />
        </Suspense>
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </>
  );
}


// import { fetchTripPages } from "@/app/lib/data/trip";
// import Pagination from "@/app/ui/pagination";
// import Search from "@/app/ui/search";
// import TableSkeleton from "@/app/ui/skeleton";
// import { Navbar } from "@/components/navbar";
// import { Suspense } from "react";
// import TripCard from "./trip-card";
// import { fetchAllCategory } from "@/app/lib/data/category";
// import CategoryFilter from "@/app/ui/category-filter";

// interface PageProps {
//   searchParams?: {
//     query?: string;
//     page?: string;
//     category?: string;
//   };
// }

// export default async function Page({ searchParams }: PageProps) {
//   const query = searchParams?.query || "";
//   const category = searchParams?.category || "";
//   const currentPage = Number(searchParams?.page) || 1;

//   const { totalPages } = await fetchTripPages(query);
//   const categories = await fetchAllCategory();

//   return (
//     <>
//       <Navbar />
//       <div className="mt-20 flex flex-col justify-center items-center">
//         <h1 className="text-heading">Explore Trip</h1>
//         <p className="text-gray-500">Find a trip that suits your interests and passions</p>
//       </div>
//       <div className="px-10 py-5 flex gap-5">
//         <Search placeholder="search trip..." />
//         <CategoryFilter categories={categories} />
//       </div>

//       <div className="flex flex-col gap-5 my-5 px-10">
//         <Suspense fallback={<TableSkeleton />}>
//           <TripCard query={query} currentPage={currentPage} category={category} />
//         </Suspense>
//         <div className="mt-5 flex w-full justify-center">
//           <Pagination totalPages={totalPages} />
//         </div>
//       </div>
//     </>
//   );
// }
