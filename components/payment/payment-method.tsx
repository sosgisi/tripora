'use client';

import { Check, CreditCard } from "lucide-react";
import BackButton from "../detail trip/back-button";
import { formatter } from "../rupiah-format";
import { Booking } from "@prisma/client";
import { usePaymentForm } from "./payment-form-provider";

export default function PaymentMethod({booking}: {booking: Booking|null}) {

    const { radioClicked, setRadioClicked } = usePaymentForm()

    return (
        <div className="flex flex-col px-20 py-10 text-primary dark:text-primary-dark">
            <BackButton/>
            <h1 className="text-2xl font-bold my-5">Select Payment Method</h1>
            <div className="flex flex-col gap-3">
                <span onClick={() => setRadioClicked('Midtrans')} className="flex justify-between items-center py-2 px-5 rounded-md bg-white dark:bg-gray-800 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transform duration-200">
                    <h1 className="flex gap-2 font-semibold"><CreditCard/> Midtrans</h1>
                    <input type="radio" radioGroup="methods" value="paypal" checked={radioClicked==='Midtrans'} />
                </span>
                <span onClick={() => setRadioClicked('Paypal')} className="flex justify-between items-center py-2 px-5 rounded-md bg-white dark:bg-gray-800 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transform duration-200">
                    <h1 className="flex gap-2 font-semibold"><CreditCard/> Paypal</h1>
                    <input type="radio" radioGroup="methods" value="paypal" checked={radioClicked==='Paypal'} />
                </span>
                <span onClick={() => setRadioClicked('Credit Card')} className="flex justify-between items-center py-2 px-5 rounded-md bg-white dark:bg-gray-800 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transform duration-200">
                    <h1 className="flex gap-2 font-semibold"><CreditCard/> Credit card</h1>
                    <input type="radio" radioGroup="methods" value="credit" checked={radioClicked==='Credit Card'} />
                </span>
                <div className="flex flex-col gap-5 px-10 py-5 mt-10 rounded-md bg-white dark:bg-gray-800">
                    <p>You have to pay</p>
                    <h1 className="text-3xl font-bold">{formatter.format(Number(booking?.totalPrice))}</h1>
                    <h1 className="flex items-center gap-2"><Check className="size-5 bg-green-500 rounded-full p-0.5 text-white"/> Payment & Invoice</h1>
                    <p className="text-gray-500 text-xs">We will take care about all of your payments. You can relax while you make your clients payments happily.</p>
                </div>
            </div>
        </div>
    )
}