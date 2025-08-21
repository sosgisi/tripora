import { fetchUserPages } from "@/app/lib/data/user";
import Pagination from "@/app/ui/pagination";
import Search from "@/app/ui/search";
import TableSkeleton from "@/app/ui/skeleton";
import UserTable from "@/app/ui/user/table";
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
    const totalPages = await fetchUserPages(query);

    return (
        <>
          <div>
            <h1 className="text-heading dark:text-white">User Management</h1>
            <p className="text-sub-heading">Manage customers, provider, and admin.</p>
          </div>
    
          <div className="flex flex-col mt-5">
            <Search placeholder="Search user..." />
            <Suspense fallback={<TableSkeleton />}>
              <UserTable query={query} currentPage={currentPage} />
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
              <Pagination totalPages={totalPages} />
            </div>
          </div>
        </>
    );
}