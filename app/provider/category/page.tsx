import { fetchTripPages } from "@/app/lib/data/trip";
import AddCategoryButton from "@/app/ui/category/add-button";
import CategoryTable from "@/app/ui/category/table";
import Pagination from "@/app/ui/pagination";
import Search from "@/app/ui/search";
import TableSkeleton from "@/app/ui/skeleton";
import AddTripButton from "@/app/ui/trip/add-button";
import { Suspense } from "react";

export default async function Page(props: {
    searchParams?: Promise<{
    query?: string;
    page?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const { totalPages } = await fetchTripPages(query);

    return (
        <>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-heading dark:text-white">Manage Category</h1>
              <p className="text-sub-heading">Create and manage trips Category</p>
            </div>
            <AddCategoryButton />
          </div>
    
          <div className="flex flex-col mt-5">
            <Search placeholder="Search trips..." />
            <Suspense fallback={<TableSkeleton />}>
              <CategoryTable query={query} currentPage={currentPage} />
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
              <Pagination totalPages={totalPages} />
            </div>
          </div>
        </>
    );
}