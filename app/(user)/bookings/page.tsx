import { fetchBookingPages } from "@/app/lib/data/booking"
import BookingTable from "@/app/ui/booking/booking-table";
import Pagination from "@/app/ui/pagination";
import Search from "@/app/ui/search";
import TableSkeleton from "@/app/ui/skeleton";
import { BookingFormProvider } from "@/components/booking/booking-form-provider";
import SidebarContent from "@/components/booking/sidebar-content";
import { Navbar } from "@/components/navbar";
import { getUserFromToken } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function Page(props: {
    searchParams?: Promise<{
        query?: string;
        page?: string;
    }>;
}){

    const user = await getUserFromToken();
    if(!user){
        redirect('/login');
    }

    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const { totalPages } = await fetchBookingPages(query);

    return (
        <BookingFormProvider>
            <Navbar/>
            <div className="flex flex-col py-10 px-20 text-primary dark:text-primary-dark">
                <h1 className="text-3xl font-bold">Checkout</h1>
                <div className="grid grid-cols-[2fr_1fr] gap-10 mt-6">
                    <div>
                        <Search placeholder="Search booking..."/>
                        <Suspense fallback={<TableSkeleton/>}>
                            <BookingTable query={query} currentPage={currentPage} user={user} />
                        </Suspense>
                        <div className="mt-5 flex w-full justify-center">
                            <Pagination totalPages={totalPages} />
                        </div>
                    </div>
                    <SidebarContent trip={null} />
                </div>
            </div>
        </BookingFormProvider>
    )
}