'use client'

import { Calendar, ChartColumn, MapPin, Tag, TrendingUp, Users, Users2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";

type SidebarProps = {
  children?: ReactNode;
};

type UserType = {
  id: string;
  name: string;
  email: string;
  phonenumber: string;
  location: string;
  bio: string;
  profileImage: string;
  role: string;
}

export default function Sidebar({children}:SidebarProps) {

    const pathname = usePathname();

    const [user, setUser] = useState<UserType | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const isOverviewRoute:boolean = pathname.startsWith('/provider/overview');
    const isProvidersRoute:boolean = pathname.startsWith('/provider/providers');
    const isAllTripsRoute:boolean = pathname.startsWith('/provider/all-trips');
    const isAllBookingsRoute:boolean = pathname.startsWith('/provider/all-bookings');
    const isCustomersRoute:boolean = pathname.startsWith('/provider/customers');
    const isCategoryRoute:boolean = pathname.startsWith('/provider/category');
    // const isAnalyticsRoute:boolean = pathname.startsWith('/provider/analytics');

    async function fetchUser() {
        try{
            const res = await fetch('/api/me', {
                method: 'GET',
                credentials: 'include',
            });
            const data = await res.json();
            setUser(data.user);
        }catch(err){
            console.error('Failed to get user: ', err);
        }finally{
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchUser();
    }, [])

    return(
        <>
        {/* Blurred overlay when loading */}
        {isLoading && (
            <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/20">
                <div className="text-2xl text-[#C9A15C] font-bold animate-pulse">Loading...</div>
            </div>
        )}
        <Navbar/>
        <div className="grid min-h-screen grid-cols-12 grid-rows-12 z-40">
            {/* Sidebar */}
            <aside className="col-start-1 col-end-3 row-start-2 row-end-13 hidden md:flex border-r border-black/10 dark:border-white/10 p-5 pt-8 flex-col gap-3">
                <Link href="/provider/overview" className={`${isOverviewRoute && 'bg-gray-200 dark:bg-gray-900 pointer-events-none'} flex items-center gap-2 py-2 px-3 w-full text-sm font-medium rounded hover:bg-gray-100 dark:hover:bg-gray-800 whitespace-nowrap transform duration-200`}>
                    <ChartColumn size={15}/>
                    Overview
                </Link>
                { user?.role !== 'provider' && (
                    <>
                    <Link href="/provider/providers" className={`${isProvidersRoute && 'bg-gray-200 dark:bg-gray-900 pointer-events-none'} flex items-center gap-2 py-2 px-3 w-full text-sm font-medium rounded hover:bg-gray-100 dark:hover:bg-gray-800 whitespace-nowrap transform duration-200`}>
                        <Users2 size={15}/>
                        Providers
                    </Link>
                    <Link href="/provider/category" className={`${isCategoryRoute && 'bg-gray-200 dark:bg-gray-900 pointer-events-none'} flex items-center gap-2 py-2 px-3 w-full text-sm font-medium rounded hover:bg-gray-100 dark:hover:bg-gray-800 whitespace-nowrap transform duration-200`}>
                        <Tag size={15}/>
                        Category
                    </Link>
                    </>
                )}
                <Link href="/provider/all-trips"className={`${isAllTripsRoute && 'bg-gray-200 dark:bg-gray-900 pointer-events-none'} flex items-center gap-2 py-2 px-3 w-full text-sm font-medium rounded hover:bg-gray-100 dark:hover:bg-gray-800 whitespace-nowrap transform duration-200`}>
                    <MapPin size={15}/>
                    All Trips
                </Link>
                <Link href="/provider/all-bookings"className={`${isAllBookingsRoute && 'bg-gray-200 dark:bg-gray-900 pointer-events-none'} flex items-center gap-2 py-2 px-3 w-full text-sm font-medium rounded hover:bg-gray-100 dark:hover:bg-gray-800 whitespace-nowrap transform duration-200`}>
                    <Calendar size={15}/>
                    All Bookings
                </Link>
                <Link href="/provider/customers" className={`${isCustomersRoute && 'bg-gray-200 dark:bg-gray-900 pointer-events-none'} flex items-center gap-2 py-2 px-3 w-full text-sm font-medium rounded hover:bg-gray-100 dark:hover:bg-gray-800 whitespace-nowrap transform duration-200`}>
                    <Users size={15}/>
                    Customers
                </Link>
                {/* <Link href="/provider/analytics" className={`${isAnalyticsRoute && 'bg-gray-200 dark:bg-gray-900 pointer-events-none'} flex items-center gap-2 py-2 px-3 w-full text-sm font-medium rounded hover:bg-gray-100 dark:hover:bg-gray-800 whitespace-nowrap transform duration-200`}>
                    <TrendingUp size={15}/>
                    Analytics
                </Link> */}
            </aside>

            {/* Main Content */}
            <main className="p-5 pt-8 col-start-3 col-end-13 row-start-2 row-end-13">
                {children}
            </main>
        </div>
        </>
    )
}