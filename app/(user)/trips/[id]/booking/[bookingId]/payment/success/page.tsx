import { getBookingById } from "@/app/lib/data/booking";
import { formatter } from "@/components/rupiah-format";
import Link from "next/link";

export default async function PaymentSuccessPage({ params }: { params: Promise<{ bookingId: string }> }) {

    const { bookingId } = await params;
    const booking = await getBookingById(bookingId);

    return (
        <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
            <div className="max-w-lg w-full bg-white rounded-2xl shadow-lg p-8 text-center">
                <div className="flex justify-center mb-4">
                    <svg
                        className="w-20 h-20 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h1 className="text-2xl font-bold text-gray-800">Payment Successful 🎉</h1>
                <p className="text-gray-600 mt-2">
                Thank you, <span className="font-semibold">{booking?.user?.name}</span>! <br />
                Your payment for <span className="font-semibold">{booking?.trip?.title}</span> is confirmed.
                </p>

                <div className="mt-6 border-t pt-4 text-left text-sm text-gray-700">
                    <p><span className="font-semibold">Booking ID:</span> {booking?.id}</p>
                    <p><span className="font-semibold">Trip:</span> {booking?.trip?.title}</p>
                    <p><span className="font-semibold">Status:</span> {booking?.status}</p>
                    <p><span className="font-semibold">Amount:</span> {formatter.format(Number(booking?.totalPrice))}</p>
                </div>

                <div className="mt-6 flex gap-4 justify-center">
                    <Link
                        href="/bookings"
                        className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg font-medium"
                    >
                        View My Bookings
                    </Link>
                    <Link
                        href="/"
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2 rounded-lg font-medium"
                    >
                        Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
