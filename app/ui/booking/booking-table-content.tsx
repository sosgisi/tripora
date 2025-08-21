'use client';

import { BookingWithTrip, useBookingForm } from "@/components/booking/booking-form-provider";
import DeleteConfirmation from "@/components/modals/delete-confirmation";
import { formatter } from "@/components/rupiah-format";
import { CheckCircle, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function BookingTableContent({ booking }: { booking: BookingWithTrip}) {
    
    const { selectedBooking, setSelectedBooking } = useBookingForm();
    const [deleteClicked, setDeleteClicked] = useState<boolean>(false);

    return (
        <>
        <div onClick={() => setSelectedBooking(booking)} className={`${selectedBooking?.tripId===booking.trip.id && 'bg-gray-100 dark:bg-gray-900'} flex flex-col xl:flex-row gap-5 xl:gap-0 justify-between items-start my-4 p-4 border rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900`}>
            <div className="flex flex-col xl:flex-row gap-3">
                <Image
                    src={booking.trip.images[0]?.imageUrl || '/placeholder.png'} 
                    alt={booking.trip.title} 
                    width={300} 
                    height={200} 
                    className="rounded-lg"
                />
                <div>
                    <h2 className="text-xl font-semibold">{booking.trip.title}</h2>
                    <p>Provider: {booking.trip.provider.companyName}</p>
                    <p>Participants: {booking.participantsCount}</p>
                    <p>Total Price: {formatter.format(booking.totalPrice)}</p>
                    <p>Status: {booking.status}</p>
                </div>
            </div>
            { booking?.status==='paid' ?
                <p className="flex items-center gap-2 text-green-500"><CheckCircle size={18}/>paid</p>
            :
                <p onClick={() => setDeleteClicked(true)} className="flex items-center gap-2 hover:text-red-500 transform duration-200 cursor-pointer"><Trash2 size={18}/>Delete</p>
            }
            {/* <div className="flex gap-3">
                <p className="flex items-center gap-2 hover:text-primary-hover transform duration-200 cursor-pointer"><Edit size={18}/>Edit</p>
            </div> */}
        </div>
        {deleteClicked && <DeleteConfirmation setShowModal={setDeleteClicked} modal="booking" selectedId={booking.id} />}
        </>
    )
}