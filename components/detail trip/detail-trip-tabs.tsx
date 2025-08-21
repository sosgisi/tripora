'use client';

import { Trip } from "@prisma/client";
import { useState } from "react";

export default function DetailTripTabs({trip}: {trip: Trip|null}) {

    const [openTab, setOpenTab] = useState('description');

    return(
        <>
        <div className="grid grid-cols-4 w-full p-0.5 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 mt-10">
            <h1 onClick={() => setOpenTab('description')} className={`text-center text-white font-bold py-2 rounded-xl cursor-pointer ${openTab==='description' ? 'bg-primary-hover' : 'text-gray-500!'}`}>Description</h1>
            <h1 onClick={() => setOpenTab('itinerary')} className={`text-center text-white font-bold py-2 rounded-xl cursor-pointer ${openTab==='itinerary' ? 'bg-primary-hover' : 'text-gray-500!'}`}>Itinerary</h1>
            <h1 onClick={() => setOpenTab('include')} className={`text-center text-white font-bold py-2 rounded-xl cursor-pointer ${openTab==='include' ? 'bg-primary-hover' : 'text-gray-500!'}`}>Include</h1>
            <h1 onClick={() => setOpenTab('review')} className={`text-center text-white font-bold py-2 rounded-xl cursor-pointer ${openTab==='review' ? 'bg-primary-hover' : 'text-gray-500!'}`}>Review</h1>
        </div>
        
        {/* Description Content */}
        { openTab === 'description' &&
            <div className="mt-10 p-10 bg-white dark:bg-gray-800 rounded-md border border-gray-200 text-gray-500">
                {trip?.description}
            </div>
        }

        {/* Itinerary Content */}
        { openTab === 'itinerary' &&
            <div className="mt-10 p-10 bg-white dark:bg-gray-800 rounded-md border border-gray-200 text-gray-500">
                itinerary content goes here.
            </div>
        }

        {/* Include Content */}
        { openTab === 'include' &&
            <div className="mt-10 p-10 bg-white dark:bg-gray-800 rounded-md border border-gray-200 text-gray-500">
                include content goes here.
            </div>
        }

        {/* Review Content */}
        { openTab === 'review' &&
            <div className="mt-10 p-10 bg-white dark:bg-gray-800 rounded-md border border-gray-200 text-gray-500">
                review content goes here.
            </div>
        }

        </>
    )
}