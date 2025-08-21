'use client'

import { Edit } from "lucide-react"
import { useEffect, useState } from "react"
import TripModal from "@/app/ui/trip/trip-modal";
import { Trip } from "@prisma/client";

type Props = {
    selectedItem: Trip;
    modal: string;
}

export default function EditTripButton({selectedItem, modal}: Props) {

    const [showModal, setShowModal] = useState<boolean>(false);

    useEffect(() => {
        if (showModal) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
        
        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, [showModal]);

    return(
        <>
        <Edit onClick={() => setShowModal(true)} className="size-4 hover:text-gray-800 dark:hover:text-gray-300 cursor-pointer transform duration-200"/>
        { showModal && (
            <TripModal setShowTripModal={setShowModal} selectedTrip={selectedItem} />
        )}
        </>
    )
}