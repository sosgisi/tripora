import { NextRequest, NextResponse } from "next/server";
import Midtrans from 'midtrans-client';

const snap = new Midtrans.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY!,
    clientKey: process.env.MIDTRANS_CLIENT_KEY!,
});

export async function POST(req: NextRequest) {
    try {
        const {
            tripId,
            tripName,
            tripPrice,
            participantCount,
            bookingId,
            userName,
            userEmail,
            userPhonenumber,
        } = await req.json();

        // Make order_id always unique
        const uniqueOrderId = `${bookingId}-${Date.now()}`;

        const parameter = {
            item_details: {
                id: tripId,
                name: tripName,
                price: tripPrice,
                quantity: participantCount,
            },
            transaction_details: {
                order_id: uniqueOrderId,
                gross_amount: tripPrice * participantCount,
            },
            customer_details: {
                first_name: userName,
                email: userEmail,
                phone: userPhonenumber,
            },
        };

        const token = await snap.createTransactionToken(parameter);

        return NextResponse.json({
            token,
            orderId: uniqueOrderId, // return to frontend so you can track it
        });
    }catch(error) {
        console.log("midtrans post error: ", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}

// export async function POST(req: NextRequest){
//     try{
//         const data = await req.json();
//         const parameter = {
//             item_details: {
//                 id: data.tripId,
//                 name: data.tripName,
//                 price: data.tripPrice,
//                 quantity: data.participantCount,
//             },
//             transaction_details: {
//                 order_id: data.bookingId,
//                 gross_amount: data.tripPrice*data.participantCount,
//             }
//         }
//         const token = await snap.createTransactionToken(parameter)
//         return NextResponse.json({token})
//     }catch(error) {
//         console.log('midtrans post error: ', error)
//         return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
//     }
// }