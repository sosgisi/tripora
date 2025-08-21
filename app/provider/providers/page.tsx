import Pagination from "@/app/ui/pagination";
import Search from "@/app/ui/search";
import ProviderTable from "@/app/ui/provider/table";
import { Suspense } from "react";
import AddProviderButton from "@/app/ui/provider/add-button";
import { fetchProviderPages } from "@/app/lib/data/provider";
import TableSkeleton from "@/app/ui/skeleton";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchProviderPages(query);

  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-heading">Provider Management</h1>
          <p className="text-sub-heading">Manage trip providers and their accounts</p>
        </div>
        <AddProviderButton />
      </div>

      <div className="flex flex-col mt-5">
        <Search placeholder="Search providers..." />
        <Suspense fallback={<TableSkeleton />}>
          <ProviderTable query={query} currentPage={currentPage} />
        </Suspense>
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </>
  );
}
