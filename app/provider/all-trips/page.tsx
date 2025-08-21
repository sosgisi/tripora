import { fetchTripPages } from "@/app/lib/data/trip";
import Pagination from "@/app/ui/pagination";
import Search from "@/app/ui/search";
import TableSkeleton from "@/app/ui/skeleton";
import AddTripButton from "@/app/ui/trip/add-button";
import TripTable from "@/app/ui/trip/table";
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
              <h1 className="text-heading dark:text-white">Manage Trips</h1>
              <p className="text-sub-heading">Create and manage your travel packages</p>
            </div>
            <AddTripButton />
          </div>
    
          <div className="flex flex-col mt-5">
            <Search placeholder="Search trips..." />
            <Suspense fallback={<TableSkeleton />}>
              <TripTable query={query} currentPage={currentPage} />
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
              <Pagination totalPages={totalPages} />
            </div>
          </div>
        </>
    );
}