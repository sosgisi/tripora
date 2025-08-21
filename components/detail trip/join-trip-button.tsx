'use client';

import { Trip } from "@prisma/client";
import { Send } from "lucide-react";

export default function JoinTripButton({trip}: {trip?: Trip}) {

    const handleJoinTrip = () => {
        window.location.href = `/trips/${trip?.id}/booking`;
    }

    return (
        <button onClick={handleJoinTrip} className="flex justify-center items-center gap-2 w-full mt-10 py-3 rounded-lg text-white bg-primary-hover hover:scale-105 transition-transform duration-200 cursor-pointer">
            <Send/>
            Join Trip
        </button>
    );
}