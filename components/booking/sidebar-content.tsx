'use client';

import { useEffect } from "react";
import { useBookingForm } from "./booking-form-provider";
import { Trip } from "@prisma/client";
import { formatter } from "../rupiah-format";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";

export default function SidebarContent({ trip }: { trip: Trip | null }) {

    const router = useRouter();
    const adminFees = 50000;
    const { formData, setFormData, handleSubmit, error, selectedBooking } = useBookingForm();

    useEffect(() => {
        if (!trip && selectedBooking) {
            setFormData(prev => ({
                ...prev,
                temrsAccepted: true,
                cancellationPolicyAccepted: true
            }))
        }
    }, [setFormData, trip, selectedBooking])

    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            totalPrice: trip && formData.participantCount > 0 ? (formData.participantCount * trip.price + formData.participantCount * adminFees) : 0,
        }));
    }, [setFormData, trip, formData.participantCount]);

    return (
        <>
            {(!trip && !selectedBooking) ? (
                <div className="border rounded-md flex justify-center items-center font-bold">
                    اختر الحجز لعرض التفاصيل
                </div>
            )
                : (
                    <div className="col-span-1 h-full bg-white border border-gray-200 dark:border-none dark:bg-gray-800 rounded-lg p-10">
                        <div className="sticky top-24 text-primary dark:text-primary-dark">
                            {selectedBooking?.status === 'paid' ?
                                <h1 className="flex items-center gap-2 text-2xl font-bold">
                                    <Check className="size-5 bg-green-500 rounded-full p-0.5 text-white" />
                                    تم الدفع
                                </h1>
                                :
                                <>
                                    <h1 className="font-bold text-xl">ملخص الحجز</h1>
                                    <div className="flex justify-between mt-5 text-gray-500 py-2">
                                        <h1>سعر الرحلة</h1>
                                        <h1 className="text-primary dark:text-primary-dark">
                                            {trip ? (formData.participantCount > 0 && trip?.price ? formatter.format(formData.participantCount * trip?.price) : 0)
                                                : selectedBooking?.trip?.price && formatter.format(selectedBooking.trip.price)}
                                        </h1>
                                    </div>
                                    <div className="flex justify-between text-gray-500 py-2">
                                        <h1>رسوم الإدارة</h1>
                                        <h1 className="text-primary dark:text-primary-dark">
                                            {trip ? (formData.participantCount > 0 ? formatter.format(formData.participantCount * adminFees) : 0)
                                                : formatter.format(adminFees)}
                                        </h1>
                                    </div>
                                    <div className="flex justify-between mt-5 text-gray-500 py-2">
                                        <h1 className="font-bold text-lg">الإجمالي</h1>
                                        <h1 className="text-primary dark:text-primary-dark font-bold text-lg">
                                            {trip ? (formData.participantCount && trip?.price ? formatter.format(formData.participantCount * trip?.price + formData.participantCount * adminFees) : '-')
                                                : selectedBooking?.totalPrice && formatter.format(selectedBooking.totalPrice)}
                                        </h1>
                                    </div>
                                    <div className="mt-10">
                                        {error && (<p className="text-red-500 text-xs mb-2">{error}</p>)}
                                        {(trip && !selectedBooking) &&
                                            <button
                                                onClick={handleSubmit}
                                                disabled={!trip}
                                                className="w-full bg-primary-hover dark:bg-primary-hover-dark text-white py-3 rounded-lg hover:bg-primary-hover/90 dark:hover:bg-primary-hover-dark/90 transition-colors cursor-pointer"
                                            >
                                                متابعة إلى الدفع
                                            </button>
                                        }
                                        {(!trip && selectedBooking) &&
                                            <button
                                                onClick={() => router.push(`/trips/${selectedBooking?.tripId}/booking/${selectedBooking?.id}/payment`)}
                                                disabled={Boolean(trip)}
                                                className="w-full bg-primary-hover dark:bg-primary-hover-dark text-white py-3 rounded-lg hover:bg-primary-hover/90 dark:hover:bg-primary-hover-dark/90 transition-colors cursor-pointer"
                                            >
                                                متابعة إلى الدفع
                                            </button>
                                        }
                                    </div>
                                    <p className="text-gray-500 text-sm mt-3">
                                        بمتابعتك، سيتم توجيهك إلى صفحة دفع آمنة
                                    </p>
                                </>
                            }
                        </div>
                    </div>
                )}
        </>
    )
}



// 'use client';

// import { useEffect } from "react";
// import { useBookingForm } from "./booking-form-provider";
// import { Trip } from "@prisma/client";
// import { formatter } from "../rupiah-format";
// import { useRouter } from "next/navigation";
// import { Check } from "lucide-react";

// export default function SidebarContent({trip} : {trip: Trip | null}) {

//     const router = useRouter();
//     const adminFees = 50000;
//     const { formData, setFormData, handleSubmit, error, selectedBooking } = useBookingForm();

//     useEffect(() => {
//         if(!trip && selectedBooking){
//             setFormData(prev => ({
//                 ...prev,
//                 temrsAccepted: true,
//                 cancellationPolicyAccepted: true
//             }))
//         }
//     }, [setFormData, trip, selectedBooking])

//     useEffect(() => {
//         setFormData(prev => ({
//             ...prev,
//             totalPrice: trip&&formData.participantCount>0 ? (formData.participantCount*trip.price + formData.participantCount*adminFees) : 0,
//         }));
//     }, [setFormData, trip, formData.participantCount]);

//     return(
//         <>
//         { (!trip && !selectedBooking) ? (
//             <div className="border rounded-md flex justify-center items-center font-bold">
//                 Select your booking for Detail
//             </div>
//         )
//         : (
//             <div className="col-span-1 h-full bg-white border border-gray-200 dark:border-none dark:bg-gray-800 rounded-lg p-10">
//                 <div className="sticky top-24 text-primary dark:text-primary-dark">
//                     { selectedBooking?.status==='paid' ?
//                         <h1 className="flex items-center gap-2 text-2xl font-bold"><Check className="size-5 bg-green-500 rounded-full p-0.5 text-white"/> Already Paid</h1>
//                     :
//                         <>
//                         <h1 className="font-bold text-xl">Ringkasan Booking</h1>
//                         <div className="flex justify-between mt-5 text-gray-500 py-2">
//                             <h1>Harga Trip</h1>
//                             <h1 className="text-primary dark:text-primary-dark">{trip ? (formData.participantCount > 0 && trip?.price ? formatter.format(formData.participantCount * trip?.price) : 0) : selectedBooking?.trip?.price && formatter.format(selectedBooking.trip.price)}</h1>
//                         </div>
//                         <div className="flex justify-between text-gray-500 py-2">
//                             <h1>Biaya Admin</h1>
//                             <h1 className="text-primary dark:text-primary-dark">{trip ? (formData.participantCount > 0 ? formatter.format(formData.participantCount * adminFees) : 0) : formatter.format(adminFees)}</h1>
//                         </div>
//                         <div className="flex justify-between mt-5 text-gray-500 py-2">
//                             <h1 className="font-bold text-lg">Total</h1>
//                             <h1 className="text-primary dark:text-primary-dark font-bold text-lg">{trip ? (formData.participantCount && trip?.price ? formatter.format(formData.participantCount*trip?.price + formData.participantCount*adminFees) : '-') : selectedBooking?.totalPrice && formatter.format(selectedBooking.totalPrice)}</h1>
//                         </div>
//                         <div className="mt-10">
//                             { error && (<p className="text-red-500 text-xs mb-2">{error}</p>)}
//                             { (trip && !selectedBooking) &&
//                                 <button onClick={handleSubmit} disabled={!trip} className="w-full bg-primary-hover dark:bg-primary-hover-dark text-white py-3 rounded-lg hover:bg-primary-hover/90 dark:hover:bg-primary-hover-dark/90 transition-colors cursor-pointer">
//                                     Lanjut ke Pembayaran
//                                 </button>
//                             }
//                             { (!trip && selectedBooking) &&
//                                 <button onClick={() => router.push(`/trips/${selectedBooking?.tripId}/booking/${selectedBooking?.id}/payment`)} disabled={Boolean(trip)} className="w-full bg-primary-hover dark:bg-primary-hover-dark text-white py-3 rounded-lg hover:bg-primary-hover/90 dark:hover:bg-primary-hover-dark/90 transition-colors cursor-pointer">
//                                     Lanjut ke Pembayaran
//                                 </button>
//                             }
//                         </div>
//                         <p className="text-gray-500 text-sm mt-3">Dengan melanjutkan, Anda akan diarahkan ke halaman pembayaran yang aman</p>
//                     </>
//                     }
//                 </div>
//             </div>
//         )}
//         </>
//     )
// }