'use client';

import { Booking, Trip, User } from "@prisma/client";
import { useEffect, useState } from "react";

type BookingWithUser = Booking & {
    user: User;
}

export default function PayButton({booking, trip}: {booking:BookingWithUser|null, trip: Trip}){

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js";
        const clientKey = process.env.MIDTRANS_CLIENT_KEY!;
    
        const script = document.createElement('script');
        script.src = snapScript;
        script.setAttribute('data-client-key', clientKey);
        script.async = true;
    
        document.body.appendChild(script);
    
        return () => {
            document.body.removeChild(script)
        }
    }, []);

    const handlePay = async (e:React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const requestData = { 
            tripId: trip.id,
            tripName: trip.title,
            tripPrice: trip.price,
            participantCount: booking?.participantsCount,
            bookingId: booking?.id,
            userName: booking?.user.name,
            userEmail: booking?.user.email,
            userPhonenumber: booking?.user.phonenumber,
        };
        const res = await fetch('/api/midtrans', {
            method: 'POST',
            body: JSON.stringify(requestData)
        })
        const data = await res.json();
        if(!res.ok) {
            setLoading(false);
            return alert('Something went wrong!')
        } 
        if(window.snap){
            // window.snap.pay(data.token)
            window.snap.pay(data.token, {
                onSuccess: async function(){
                    await fetch('/api/user/bookings/', {
                        method: 'PUT',
                        body: JSON.stringify({
                            id: booking?.id,
                            status: 'paid'
                        })
                    });
                },
                onError: async function(){
                    await fetch('/api/user/bookings/', {
                        method: 'PUT',
                        body: JSON.stringify({
                            id: booking?.id,
                            status: 'cancelled'
                        })
                    });
                },
                onClose: async function(){
                    console.log("Customer closed the popup without finishing payment");
                    await fetch('/api/user/bookings/', {
                        method: 'PUT',
                        body: JSON.stringify({
                            id: booking?.id,
                            status: 'cancelled'
                        })
                    });
                }
            });
        }
        setLoading(false);
    }

    return (
        <button 
            onClick={handlePay} 
            disabled={loading} 
            className="w-full bg-primary-hover/90 dark:bg-primary-hover-dark/90 text-white dark:text-primary font-bold py-3 rounded-lg hover:bg-primary-hover dark:hover:bg-primary-hover-dark transform duration-200 cursor-pointer mt-5"
            >
            { loading ? 'جاري التحميل...' : 'ادفع الآن' }
        </button>

    )
}