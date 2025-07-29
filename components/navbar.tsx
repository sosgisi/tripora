'use client'

import { Compass, Menu, X } from "lucide-react";
import Link from "next/link";
import { useIsMobile } from "./isMobileView";
import { useEffect, useRef, useState } from "react";

export function Navbar () {

    const menuRef = useRef<HTMLInputElement>(null);

    const [menuClicked, setMenuClicked] = useState<boolean>(false);
    const isMobile = useIsMobile();

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
    
    return(
        <>
        <nav className="sticky top-0 backdrop-blur-sm border-b border-[#2F4F4F]/10 p-5 flex justify-between items-center gap-5 z-50 bg-navbar dark:bg-navbar-dark">
            <div className="flex items-center gap-14">
                <Link href="/" className="flex items-center gap-2 cursor-pointer">
                    <Compass size={30} className="text-primary dark:text-primary-dark"/>
                    <h1 className="text-primary dark:text-primary-dark text-2xl font-bold">Tripora</h1>
                </Link>
                { !isMobile &&
                    <nav className="flex gap-5">
                        <Link href="/" className="text-primary dark:text-primary-dark hover:text-primary-hover dark:hover:text-primary-hover-dark transform duration-200 font-medium">Home</Link>
                        <Link href="/trips" className="text-primary dark:text-primary-dark hover:text-primary-hover dark:hover:text-primary-hover-dark transform duration-200 font-medium whitespace-nowrap">Explore Trips</Link>
                    </nav>
                }
            </div>
            { !isMobile ?
                <div className="flex gap-5">
                    <Link href="/login" className="text-primary dark:text-primary-dark hover:text-primary-hover dark:hover:text-primary-hover-dark transform duration-200">Login</Link>
                    <Link href="/register" className="text-primary dark:text-primary-dark hover:text-primary-hover dark:hover:text-primary-hover-dark transform duration-200 whitespace-nowrap">Create account</Link>
                </div>
            : <div className="relative">
                { !menuClicked ? 
                <Menu onClick={() => setMenuClicked((prev) => !prev)} size={37} className="p-2 rounded-md text-primary dark:text-primary-dark cursor-pointer hover:text-white hover:bg-primary-hover dark:hover:bg-primary-hover-dark transform duration-200"/>
                :
                <X onClick={() => setMenuClicked((prev) => !prev)} size={37} className="p-2 rounded-md text-primary dark:text-primary-dark cursor-pointer hover:text-white hover:bg-primary-hover dark:hover:bg-primary-hover-dark transform duration-200"/>
                }
            </div>
            }
        </nav>
        <div ref={menuRef} className={`absolute right-0 left-0 w-full bg-white dark:bg-gray-900 shadow-lg rounded-lg py-2 z-40 flex flex-col
            transform duration-500 ${menuClicked ? '-translate-y-0' : '-translate-y-[300px]'}`}
        >
            <Link href="/" className="px-4 py-2 text-primary dark:text-primary-dark hover:bg-gray-100 hover:text-primary-hover dark:hover:text-primary-hover-dark dark:hover:bg-gray-800 rounded transition">Home</Link>
            <Link href="/trips" className="px-4 py-2 text-primary dark:text-primary-dark hover:bg-gray-100 hover:text-primary-hover dark:hover:text-primary-hover-dark dark:hover:bg-gray-800 rounded transition">Explore Trips</Link>
            <Link href="/login" className="px-4 py-2 text-primary dark:text-primary-dark hover:bg-gray-100 hover:text-primary-hover dark:hover:text-primary-hover-dark dark:hover:bg-gray-800 rounded transition">Login</Link>
            <Link href="/register" className="px-4 py-2 text-primary dark:text-primary-dark hover:bg-gray-100 hover:text-primary-hover dark:hover:text-primary-hover-dark dark:hover:bg-gray-800 rounded transition">Create account</Link>
        </div>
        </>
    )
}