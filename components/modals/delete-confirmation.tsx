'use client'

import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { useBookingForm } from "../booking/booking-form-provider";

type Props = {
    setShowModal: Dispatch<SetStateAction<boolean>>
    modal: string;
    selectedId: string;
}

export default function DeleteConfirmation({setShowModal, modal, selectedId}: Props){

    const { setSelectedBooking } = useBookingForm();

    let url = ''
    switch(modal){
        case 'trip':
            url = '/api/admin/trip'
            break;
        case 'category':
            url = '/api/admin/category'
            break;
        case 'booking':
            url = '/api/user/bookings'
    }

    const router = useRouter();
    const [error, setError] = useState<string|null>(null)

    const handleDelete = async (e:React.FormEvent) => {
        e.preventDefault();
        
        try{
            const res = await fetch(url, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: selectedId })
            });
            const data = await res.json();
            if(!res.ok) return setError(data.error || "something went wrong");
            if(modal==='booking'){
                setSelectedBooking(null)
            }
            router.refresh();
        }catch(error){
            console.error("Delete Error:", error);
            setError("Failed to delete trip");
        }
    }

    return(
        <>
        <div className="overlay-dark"></div>
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 dark:text-white z-40 w-[400px] sm:w-[500px] md:w-1/3 rounded text-xs sm:text-sm text-primary p-5">
            <h1 className="text-heading2">Are you sure want to delete this {modal}?</h1>
            <div className={`flex ${error ? 'justify-between' : 'justify-end'} w-full mt-5`}>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <div className="flex gap-2">
                    <button onClick={() => setShowModal(false)} className="py-1 px-5 border rounded hover:bg-gray-200 cursor-pointer transform duration-200">cancel</button>
                    <button onClick={handleDelete} className="py-1 px-5 border border-red-500 rounded bg-red-500 text-white hover:bg-red-400 cursor-pointer transform duration-200">Delete</button>
                </div>
            </div>
        </div>
        </>
    )
}