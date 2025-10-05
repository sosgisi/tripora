import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function POST() {
    try{
        const res = NextResponse.json({ message: 'Logged out' });
        res.cookies.set('token', '', {
            httpOnly: true,
            expires: new Date(0),
            path: '/', 
        });
        return res;
    }catch(err){
        console.error('error while logging out: ', err);
        return NextResponse.json({ message: `error logout: ${err}`, status: 500})
    }
}