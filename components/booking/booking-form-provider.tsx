"use client";

import { Booking, Provider, Trip, TripImage } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useState } from "react";

type BookingFormData = {
    id: string;
    name: string;
    email: string;
    userId: number|null;
    tripId: number|null;
    participantCount: number;
    totalPrice: number;
    temrsAccepted: boolean;
    cancellationPolicyAccepted: boolean;
};

export type BookingWithTrip = Booking & {
    trip: Trip & {
        provider: Provider;
        images: TripImage[];
    }
}

type BookingFormContextType = {
    formData: BookingFormData;
    setFormData: React.Dispatch<React.SetStateAction<BookingFormData>>;
    handleSubmit: () => void;
    error: string;
    selectedBooking: BookingWithTrip|null;
    setSelectedBooking: React.Dispatch<React.SetStateAction<BookingWithTrip|null>>;
};

const BookingFormContext = createContext<BookingFormContextType | undefined>(undefined);

export function BookingFormProvider({ children }: { children: React.ReactNode }) {

    const router = useRouter();
    const [selectedBooking, setSelectedBooking] = useState<BookingWithTrip|null>(null);
    const [error, setError] = useState<string>('');
    const [formData, setFormData] = useState<BookingFormData>({
        id: "",
        name: "",
        email: "",
        userId: null,
        tripId: null,
        participantCount: 0,
        totalPrice: 0,
        temrsAccepted: false,
        cancellationPolicyAccepted: false,
    });

    const handleSubmit = async () => {
        if(!formData.temrsAccepted || !formData.cancellationPolicyAccepted) {
            return alert("Please accept the terms and cancellation policy to proceed.");
        }
        setError('');
        try {
            const res = await fetch("/api/user/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            setError(data.message);
            if(res.ok) return router.push(`/trips/${formData.tripId}/booking/${data.booking.id}/payment`);
            if (!res.ok) return setError(`Booking failed: ${data.message}`);
        } catch (err) {
            console.error(err);
            setError("Failed to create booking. Please try again later.");
        }
    };

    return (
        <BookingFormContext.Provider value={{ formData, setFormData, handleSubmit, error, selectedBooking, setSelectedBooking }}>
        {children}
        </BookingFormContext.Provider>
    );
}

export function useBookingForm() {
  const ctx = useContext(BookingFormContext);
  if (!ctx) throw new Error("useBookingForm must be used within BookingFormProvider");
  return ctx;
}
