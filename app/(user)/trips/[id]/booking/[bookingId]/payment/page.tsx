import { getBookingById } from "@/app/lib/data/booking";
import { getTripById } from "@/app/lib/data/trip";
import BackButton from "@/components/detail trip/back-button";
import PayButton from "@/components/payment/pay-button";
import PaymentFormProvider from "@/components/payment/payment-form-provider";
import { formatter } from "@/components/rupiah-format";
import { Check } from "lucide-react";

export default async function PaymentPage({ params }: { params: { id: number; bookingId: string } }) {

    const { id, bookingId } = params;
    const trip = await getTripById(id);
    const booking = await getBookingById(bookingId);

    if (!trip || !booking) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-2xl font-bold text-primary dark:text-primary-dark">الحجز غير موجود</h1>
            </div>
        );
    }

    return (
        <PaymentFormProvider>
            <div className="flex flex-col px-20 py-10 text-primary dark:text-primary-dark">
                <BackButton />
                <div className="flex flex-col gap-5 px-10 py-5 mt-10 rounded-md bg-white dark:bg-gray-800">
                    {booking?.status === 'paid' ?
                        <>
                            <h1 className="flex items-center gap-2 text-2xl font-bold">
                                <Check className="size-5 bg-green-500 rounded-full p-0.5 text-white" />
                                تم الدفع بالفعل
                            </h1>
                        </>
                        :
                        <>
                            <p>يجب عليك الدفع</p>
                            <h1 className="text-3xl font-bold">{formatter.format(Number(booking?.totalPrice))}</h1>
                            <h1 className="flex items-center gap-2">
                                <Check className="size-5 bg-green-500 rounded-full p-0.5 text-white" />
                                الدفع والفاتورة
                            </h1>
                            <p className="text-gray-500 text-xs">
                                سنتولى أمر جميع مدفوعاتك. يمكنك الاسترخاء بينما تقوم بمدفوعاتك بسعادة.
                            </p>
                        </>
                    }
                </div>
                {booking?.status !== 'paid' &&
                    <PayButton booking={booking} trip={trip} />
                }
            </div>
        </PaymentFormProvider>
    );
}


// import { getBookingById } from "@/app/lib/data/booking";
// import { getTripById } from "@/app/lib/data/trip";
// import BackButton from "@/components/detail trip/back-button";
// import PayButton from "@/components/payment/pay-button";
// import PaymentFormProvider from "@/components/payment/payment-form-provider";
// import { formatter } from "@/components/rupiah-format";
// import { Check } from "lucide-react";

// export default async function PaymentPage({ params }: { params: { id: number; bookingId: string } }) {

//     const { id, bookingId } = await params;
//     const trip = await getTripById(id);
//     const booking = await getBookingById(bookingId);

//     if(!trip || !booking){
//         return (
//             <div className="flex flex-col items-center justify-center h-screen">
//                 <h1 className="text-2xl font-bold text-primary dark:text-primary-dark">Booking not found</h1>
//             </div>
//         );
//     }

//     return (
//         <PaymentFormProvider>
//             <div className="flex flex-col px-20 py-10 text-primary dark:text-primary-dark">
//                 <BackButton />
//                 <div className="flex flex-col gap-5 px-10 py-5 mt-10 rounded-md bg-white dark:bg-gray-800">
//                     { booking?.status==='paid' ? 
//                         <>
//                         <h1 className="flex items-center gap-2 text-2xl font-bold"><Check className="size-5 bg-green-500 rounded-full p-0.5 text-white"/> Already Paid</h1>
//                         </>
//                     :
//                         <>
//                         <p>You have to pay</p>
//                         <h1 className="text-3xl font-bold">{formatter.format(Number(booking?.totalPrice))}</h1>
//                         <h1 className="flex items-center gap-2"><Check className="size-5 bg-green-500 rounded-full p-0.5 text-white"/> Payment & Invoice</h1>
//                         <p className="text-gray-500 text-xs">We will take care about all of your payments. You can relax while you make your clients payments happily.</p>
//                         </>
//                     }
//                 </div>
//                 { booking?.status!=='paid' && 
//                     <PayButton booking={booking} trip={trip} />
//                 }
//             </div>
//         </PaymentFormProvider>
//     );
// }