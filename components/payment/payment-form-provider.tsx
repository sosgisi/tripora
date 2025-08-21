'use client';

import React, { createContext, useContext, useState } from "react";

type PaymentFormContextType = {
    radioClicked: string;
    setRadioClicked: React.Dispatch<React.SetStateAction<string>>;
}

const PaymentFormContext = createContext<PaymentFormContextType | undefined>(undefined);

export default function PaymentFormProvider({ children }: { children: React.ReactNode}) {

    const [radioClicked, setRadioClicked] = useState('');

    return(
        <PaymentFormContext.Provider value={{ radioClicked, setRadioClicked }}>
            {children}
        </PaymentFormContext.Provider>
    )
}

export function usePaymentForm() {
    const context = useContext(PaymentFormContext);
    if (!context) {
        throw new Error("usePaymentForm must be used within a PaymentFormProvider");
    }
    return context;
}