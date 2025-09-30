'use client'

import { Compass, Menu, X } from "lucide-react";
import Link from "next/link";
import { useIsMobile } from "./isMobileView";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { User } from "@prisma/client";
import { usePathname } from "next/navigation";

export function Navbar () {

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const pathname = usePathname();

    const { data: session } = useSession();

    const menuRef = useRef<HTMLInputElement>(null);

    const [menuClicked, setMenuClicked] = useState<boolean>(false);
    const isMobile = useIsMobile();
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const handleClickOutside = (event:MouseEvent) => {
            if(menuRef.current && !menuRef.current.contains(event.target as Node)){
                setMenuClicked(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, []);

    async function fetchUser() {
        try{
            const res = await fetch('/api/me', {
                method: 'GET',
                credentials: 'include',
            });
            const data = await res.json();
            setUser(data.user);
        }catch(err){
            console.error('فشل الحصول على بيانات المستخدم: ', err);
        }finally{
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchUser();
    }, [])
    
    return(
        <>
        {/* شاشة تحميل */}
        {isLoading && (
            <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/20">
                <div className="text-2xl text-[#C9A15C] font-bold animate-pulse">جاري التحميل...</div>
            </div>
        )}
        <nav className={`fixed top-0 right-0 left-0 backdrop-blur-sm border-b border-[#2F4F4F]/10 p-5 flex justify-between items-center gap-5 z-30 bg-navbar dark:bg-navbar-dark ${scrolled ? 'opacity-95 ' : 'opacity-100'} backdrop-blur-3xl transition-opacity duration-300`}> 
            <div className="flex items-center gap-14">
                <Link href={user?.role === 'admin' || user?.role === 'provider' ? '/provider/overview' : '/'} className="flex items-center gap-2 cursor-pointer">
                    <Compass size={30} className="text-primary dark:text-primary-dark"/>
                    <h1 className="text-primary dark:text-primary-dark text-2xl font-bold">
                        تريبورا {user?.role === 'admin' ? 'مسؤول' : user?.role === 'provider' && 'مزود'}
                    </h1>
                </Link>
                { (!isMobile && user?.role !== 'admin' && user?.role !== 'provider') &&
                    <nav className="flex gap-5">
                        <Link href="/" className={`${pathname==='/' ? 'text-primary-hover! pointer-events-none' : 'text-primary'} dark:text-primary-dark hover:text-primary-hover dark:hover:text-primary-hover-dark transform duration-200 font-medium`}>الرئيسية</Link>
                        <Link href="/trips" className={`${pathname==='/trips' ? 'text-primary-hover! pointer-events-none' : 'text-primary'} dark:text-primary-dark hover:text-primary-hover dark:hover:text-primary-hover-dark transform duration-200 font-medium whitespace-nowrap`}>استكشف الرحلات</Link>
                        { user && <Link href="/bookings" className={`${pathname==='/bookings' ? 'text-primary-hover! pointer-events-none' : 'text-primary'} dark:text-primary-dark hover:text-primary-hover dark:hover:text-primary-hover-dark transform duration-200 font-medium whitespace-nowrap`}>الحجوزات</Link> }
                    </nav>
                }
            </div>
            { isLoading ? (
                <div className="bg-gray-200 h-8 w-40 transform animate-pulse"></div>
            ) : (
                <>
                { !isMobile ? (
                    <Link href="/profile" className="flex gap-5 cursor-pointer">
                    { user || session?.user ?
                        <>
                        <h1 className="text-primary dark:text-primary-dark">{user?.email || session?.user?.email}</h1>
                        <Image
                            src={user?.profileImage || session?.user?.image||'/images/placeholder-user.jpg'}
                            alt="/images/placeholder-user.jpg"
                            width={30}
                            height={30}
                            className={`${(!user?.profileImage && !session?.user?.image) && 'border'} object-cover rounded-full border-gray-500`}
                        />
                        </>
                    :
                        <>
                        <Link href="/login" className="text-primary dark:text-primary-dark hover:text-primary-hover dark:hover:text-primary-hover-dark transform duration-200">تسجيل الدخول</Link>
                        <Link href="/register" className="text-primary dark:text-primary-dark hover:text-primary-hover dark:hover:text-primary-hover-dark transform duration-200 whitespace-nowrap">إنشاء حساب</Link>
                        </>
                    }
                    </Link>
                ) : ( <div className="relative">
                    { !menuClicked ? 
                    <Menu onClick={() => setMenuClicked((prev) => !prev)} size={37} className="p-2 rounded-md text-primary dark:text-primary-dark cursor-pointer hover:text-white hover:bg-primary-hover dark:hover:bg-primary-hover-dark transform duration-200"/>
                    :
                    <X onClick={() => setMenuClicked((prev) => !prev)} size={37} className="p-2 rounded-md text-primary dark:text-primary-dark cursor-pointer hover:text-white hover:bg-primary-hover dark:hover:bg-primary-hover-dark transform duration-200"/>
                    }
                </div> )
                }
                </>
            )}
        </nav>
        <div ref={menuRef} className={`absolute right-0 left-0 w-full mt-[70px] bg-white dark:bg-gray-900 shadow-lg rounded-lg py-2 z-20 flex flex-col
            transform duration-500 ${menuClicked ? '-translate-y-0' : '-translate-y-[300px]'}`}
        >
            <Link href="/" className={`${pathname==='/' ? 'text-primary-hover! pointer-events-none' : 'text-primary'} px-4 py-2 dark:text-primary-dark hover:bg-gray-100 hover:text-primary-hover dark:hover:text-primary-hover-dark dark:hover:bg-gray-800 rounded transition`}>الرئيسية</Link>
            <Link href="/trips" className={`${pathname==='/trips' ? 'text-primary-hover! pointer-events-none' : 'text-primary'} px-4 py-2 dark:text-primary-dark hover:bg-gray-100 hover:text-primary-hover dark:hover:text-primary-hover-dark dark:hover:bg-gray-800 rounded transition`}>استكشف الرحلات</Link>
            { user && <Link href="/Bookings" className={`${pathname==='/bookings' ? 'text-primary-hover! pointer-events-none' : 'text-primary'} px-4 py-2 dark:text-primary-dark hover:bg-gray-100 hover:text-primary-hover dark:hover:text-primary-hover-dark dark:hover:bg-gray-800 rounded transition`}>الحجوزات</Link> }
            { user || session?.user ?
                <Link href="/profile" className="flex gap-3 mt-5 text-xs mx-4 w-fit text-primary dark:text-primary-dark">
                    <h1>{user?.email || session?.user?.email}</h1>
                    <Image
                        src={user?.profileImage || session?.user?.image||'/images/placeholder-user.jpg'}
                        alt="/images/placeholder-user.jpg"
                        width={20}
                        height={20}
                        className={`${(!user?.profileImage && !session?.user?.image) && 'border'} object-cover rounded-full border-gray-500`}
                    />
                </Link>
            :
                <>
                <Link href="/login" className="px-4 py-2 text-primary dark:text-primary-dark hover:bg-gray-100 hover:text-primary-hover dark:hover:text-primary-hover-dark dark:hover:bg-gray-800 rounded transition">تسجيل الدخول</Link>
                <Link href="/register" className="px-4 py-2 text-primary dark:text-primary-dark hover:bg-gray-100 hover:text-primary-hover dark:hover:text-primary-hover-dark dark:hover:bg-gray-800 rounded transition">إنشاء حساب</Link>
                </>
            }
        </div>
        </>
    )
}


// 'use client'

// import { Compass, Menu, X } from "lucide-react";
// import Link from "next/link";
// import { useIsMobile } from "./isMobileView";
// import { useEffect, useRef, useState } from "react";
// import { useSession } from "next-auth/react";
// import Image from "next/image";
// import { User } from "@prisma/client";
// import { usePathname } from "next/navigation";

// export function Navbar () {

//     const [scrolled, setScrolled] = useState(false);

//     useEffect(() => {
//         const handleScroll = () => {
//             setScrolled(window.scrollY > 0);
//         };
//         window.addEventListener('scroll', handleScroll);
//         return () => {
//             window.removeEventListener('scroll', handleScroll);
//         };
//     }, []);

//     const pathname = usePathname();

//     const { data: session } = useSession();

//     const menuRef = useRef<HTMLInputElement>(null);

//     const [menuClicked, setMenuClicked] = useState<boolean>(false);
//     const isMobile = useIsMobile();
//     const [user, setUser] = useState<User | null>(null);
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         const handleClickOutside = (event:MouseEvent) => {
//             if(menuRef.current && !menuRef.current.contains(event.target as Node)){
//                 setMenuClicked(false);
//             }
//         };
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => {
//             document.removeEventListener("mousedown", handleClickOutside);
//         }
//     }, []);

//     async function fetchUser() {
//         try{
//             const res = await fetch('/api/me', {
//                 method: 'GET',
//                 credentials: 'include',
//             });
//             const data = await res.json();
//             setUser(data.user);
//         }catch(err){
//             console.error('Failed to get user: ', err);
//         }finally{
//             setIsLoading(false);
//         }
//     }

//     useEffect(() => {
//         fetchUser();
//     }, [])
    
//     return(
//         <>
//         {/* Blurred overlay when loading */}
//         {isLoading && (
//             <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/20">
//                 <div className="text-2xl text-[#C9A15C] font-bold animate-pulse">Loading...</div>
//             </div>
//         )}
//         <nav className={`fixed top-0 right-0 left-0 backdrop-blur-sm border-b border-[#2F4F4F]/10 p-5 flex justify-between items-center gap-5 z-30 bg-navbar dark:bg-navbar-dark ${scrolled ? 'opacity-95 ' : 'opacity-100'} backdrop-blur-3xl transition-opacity duration-300`}> 
//             <div className="flex items-center gap-14">
//                 <Link href={user?.role === 'admin' || user?.role === 'provider' ? '/provider/overview' : '/'} className="flex items-center gap-2 cursor-pointer">
//                     <Compass size={30} className="text-primary dark:text-primary-dark"/>
//                     <h1 className="text-primary dark:text-primary-dark text-2xl font-bold">
//                         Tripora {user?.role === 'admin' ? 'Admin' : user?.role === 'provider' && 'Provider'}
//                     </h1>
//                 </Link>
//                 { (!isMobile && user?.role !== 'admin' && user?.role !== 'provider') &&
//                     <nav className="flex gap-5">
//                         <Link href="/" className={`${pathname==='/' ? 'text-primary-hover! pointer-events-none' : 'text-primary'} dark:text-primary-dark hover:text-primary-hover dark:hover:text-primary-hover-dark transform duration-200 font-medium`}>Home</Link>
//                         <Link href="/trips" className={`${pathname==='/trips' ? 'text-primary-hover! pointer-events-none' : 'text-primary'} dark:text-primary-dark hover:text-primary-hover dark:hover:text-primary-hover-dark transform duration-200 font-medium whitespace-nowrap`}>Explore Trips</Link>
//                         { user && <Link href="/bookings" className={`${pathname==='/bookings' ? 'text-primary-hover! pointer-events-none' : 'text-primary'} dark:text-primary-dark hover:text-primary-hover dark:hover:text-primary-hover-dark transform duration-200 font-medium whitespace-nowrap`}>Bookings</Link> }
//                     </nav>
//                 }
//             </div>
//             { isLoading ? (
//                 <div className="bg-gray-200 h-8 w-40 transform animate-pulse"></div>
//             ) : (
//                 <>
//                 { !isMobile ? (
//                     <Link href="/profile" className="flex gap-5 cursor-pointer">
//                     { user || session?.user ?
//                         <>
//                         <h1 className="text-primary dark:text-primary-dark">{user?.email || session?.user?.email}</h1>
//                         <Image
//                             src={user?.profileImage || session?.user?.image||'/images/placeholder-user.jpg'}
//                             alt="/images/placeholder-user.jpg"
//                             width={30}
//                             height={30}
//                             className={`${(!user?.profileImage && !session?.user?.image) && 'border'} object-cover rounded-full border-gray-500`}
//                         />
//                         </>
//                     :
//                         <>
//                         <Link href="/login" className="text-primary dark:text-primary-dark hover:text-primary-hover dark:hover:text-primary-hover-dark transform duration-200">Login</Link>
//                         <Link href="/register" className="text-primary dark:text-primary-dark hover:text-primary-hover dark:hover:text-primary-hover-dark transform duration-200 whitespace-nowrap">Create account</Link>
//                         </>
//                     }
//                     </Link>
//                 ) : ( <div className="relative">
//                     { !menuClicked ? 
//                     <Menu onClick={() => setMenuClicked((prev) => !prev)} size={37} className="p-2 rounded-md text-primary dark:text-primary-dark cursor-pointer hover:text-white hover:bg-primary-hover dark:hover:bg-primary-hover-dark transform duration-200"/>
//                     :
//                     <X onClick={() => setMenuClicked((prev) => !prev)} size={37} className="p-2 rounded-md text-primary dark:text-primary-dark cursor-pointer hover:text-white hover:bg-primary-hover dark:hover:bg-primary-hover-dark transform duration-200"/>
//                     }
//                 </div> )
//                 }
//                 </>
//             )}
//         </nav>
//         <div ref={menuRef} className={`absolute right-0 left-0 w-full mt-[70px] bg-white dark:bg-gray-900 shadow-lg rounded-lg py-2 z-20 flex flex-col
//             transform duration-500 ${menuClicked ? '-translate-y-0' : '-translate-y-[300px]'}`}
//         >
//             <Link href="/" className={`${pathname==='/' ? 'text-primary-hover! pointer-events-none' : 'text-primary'} px-4 py-2 dark:text-primary-dark hover:bg-gray-100 hover:text-primary-hover dark:hover:text-primary-hover-dark dark:hover:bg-gray-800 rounded transition`}>Home</Link>
//             <Link href="/trips" className={`${pathname==='/' ? 'text-primary-hover! pointer-events-none' : 'text-primary'} px-4 py-2 dark:text-primary-dark hover:bg-gray-100 hover:text-primary-hover dark:hover:text-primary-hover-dark dark:hover:bg-gray-800 rounded transition`}>Explore Trips</Link>
//             { user && <Link href="/Bookings" className={`${pathname==='/' ? 'text-primary-hover! pointer-events-none' : 'text-primary'} px-4 py-2 dark:text-primary-dark hover:bg-gray-100 hover:text-primary-hover dark:hover:text-primary-hover-dark dark:hover:bg-gray-800 rounded transition`}>Bookings</Link> }
//             { user || session?.user ?
//                 <Link href="/profile" className="flex gap-3 mt-5 text-xs mx-4 w-fit text-primary dark:text-primary-dark">
//                     <h1>{user?.email || session?.user?.email}</h1>
//                     <Image
//                         src={user?.profileImage || session?.user?.image||'/images/placeholder-user.jpg'}
//                         alt="/images/placeholder-user.jpg"
//                         width={20}
//                         height={20}
//                         className={`${(!user?.profileImage && !session?.user?.image) && 'border'} object-cover rounded-full border-gray-500`}
//                     />
//                 </Link>
//             :
//                 <>
//                 <Link href="/login" className="px-4 py-2 text-primary dark:text-primary-dark hover:bg-gray-100 hover:text-primary-hover dark:hover:text-primary-hover-dark dark:hover:bg-gray-800 rounded transition">Login</Link>
//                 <Link href="/register" className="px-4 py-2 text-primary dark:text-primary-dark hover:bg-gray-100 hover:text-primary-hover dark:hover:text-primary-hover-dark dark:hover:bg-gray-800 rounded transition">Create account</Link>
//                 </>
//             }
//         </div>
//         </>
//     )
// }