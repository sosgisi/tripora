'use client';

import { usePaymentForm } from "./payment-form-provider";

export default function PaymentForm() {

    const { radioClicked } = usePaymentForm();

    return(
        <div className="flex flex-col px-20 py-10 pt-20 text-primary dark:text-primary-dark">

            {!radioClicked ? (
                <div className="flex items-center justify-center h-full">
                    <h1 className="text-2xl font-bold">Please select a payment method</h1>
                </div>
            )
            : (
                <>
                <h1 className="text-4xl font-bold">Payment using {radioClicked}</h1>
                <div className="flex flex-col mt-10">
                    <label>Card Holder Name</label>
                    <input 
                        type="text" 
                        placeholder="Enter card holder name"
                        className="w-full bg-white dark:bg-gray-800 rounded-md p-4 outline-none mb-3" 
                    />
                    <label>Card Number</label>
                    <input 
                        type="number" 
                        placeholder="Enter card number"
                        className="w-full bg-white dark:bg-gray-800 rounded-md p-4 outline-none mb-3" 
                    />
                    <div className="grid grid-cols-2 gap-5">
                        <label>Expire date</label>
                        <label>CVV</label>
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                        <input 
                            type="date" 
                            placeholder="12/2025"
                            className="w-full bg-white dark:bg-gray-800 rounded-md p-4 outline-none mb-3" 
                        />
                        <input 
                            type="number" 
                            placeholder="001"
                            className="w-full bg-white dark:bg-gray-800 rounded-md p-4 outline-none mb-3" 
                        />
                    </div>
                    <button className="w-full bg-primary-hover dark:bg-primary-hover-dark text-white dark:text-primary font-bold py-3 rounded-lg hover:bg-primary-hover/90 dark:hover:bg-primary-hover-dark/90 transform duration-200 cursor-pointer mt-5">
                        Pay now
                    </button>
                </div>
                </>
            )}
        </div>
    )
}