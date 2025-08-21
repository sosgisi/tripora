"use client";

import Link from "next/link";
import { XCircle } from "lucide-react";

export default function PaymentErrorPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-8 text-center">
                <XCircle className="mx-auto h-16 w-16 text-red-500" />
                <h1 className="mt-4 text-2xl font-bold text-gray-800">
                Payment Failed
                </h1>
                <p className="mt-2 text-gray-600">
                Oops! Something went wrong with your payment.  
                Please try again or contact support if the issue continues.
                </p>

                <div className="mt-6 flex gap-3 justify-center">
                    <Link
                        href="/trips"
                        className="px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                    >
                        Back to Trips
                    </Link>
                    <Link
                        href="/support"
                        className="px-5 py-2 rounded-lg bg-gray-200 text-gray-800 font-medium hover:bg-gray-300 transition"
                    >
                        Contact Support
                    </Link>
                </div>
            </div>
        </div>
    );
}
