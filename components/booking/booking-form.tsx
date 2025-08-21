'use client';

import { useEffect } from "react";
import { useBookingForm } from "./booking-form-provider";
import { Trip } from "@prisma/client";

export default function BookingForm({trip}: {trip: Trip}) {

    const { formData, setFormData} = useBookingForm();

    useEffect(() => {
        async function fetchUser() {
            try{
                const res = await fetch('/api/me', {
                    method: 'GET',
                    credentials: 'include',
                });
                const data = await res.json();
                setFormData(prev => ({
                    ...prev,
                    userId: data?.user?.id,
                }));
            }catch(err){
                console.error('Failed to get user: ', err);
            }
        }
        async function fetchTrip() {
            try{
                const res = await fetch(`/api/admin/trip/${trip.id}`, {
                    method: 'GET',
                    credentials: 'include',
                });
                const data = await res.json();
                setFormData(prev => ({
                    ...prev,
                    tripId: data.trip.id,
                }));
            }catch(err){
                console.error('Failed to get trip: ', err);
            }
        }
        fetchUser();
        fetchTrip();
    }, [])

    return(
        <div>
            <h1 className="mt-5 font-bold text-lg">Informasi Peserta Utama</h1>
            <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col gap-1">
                    <label htmlFor="name">Nama Lengkap</label>
                    <input 
                        type="text" 
                        id="name" 
                        placeholder="Masukkan nama lengkap"
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="outline-none bg-white dark:bg-transparent border border-gray-300 rounded-md p-2" 
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        placeholder="Masukkan email"
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="outline-none bg-white dark:bg-transparent border border-gray-300 rounded-md p-2" 
                    />
                </div>
            </div>
            <div>
                <h1 className="mt-3">Select for how many people</h1>
                <select 
                    name="participants" 
                    id="participants" 
                    onChange={(e) => setFormData({ ...formData, participantCount: parseInt(e.target.value) })}
                    className="w-full outline-none bg-white dark:bg-[#0a0a0a] border border-gray-300 rounded-md p-2"
                >
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>
            <div className="flex items-center gap-2 mt-5">
                <input type="checkbox" onChange={(e) => setFormData({...formData, temrsAccepted: e.target.checked})}/>
                <label htmlFor="terms">Saya setuju dengan <a href="/terms" className="text-primary dark:text-primary-dark underline">syarat dan ketentuan</a></label>
            </div>
            <div className="flex items-center gap-2 mt-5">
                <input type="checkbox" onChange={(e) => setFormData({...formData, cancellationPolicyAccepted: e.target.checked})}/>
                <label htmlFor="terms">Saya memahami kebijakan pembatalan dan refund untuk trip ini</label>
            </div>
        </div>
    )
}