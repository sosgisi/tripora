import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(){
    try{
        const providers = await prisma.provider.findMany();
        return NextResponse.json(providers);
    }catch(error){
        console.log('GET error: ', error);
        return NextResponse.json({error: 'internal server error'}, {status: 500});
    }
}

export async function POST(req: NextRequest){
    try{
        const body = await req.json();

        const {
            companyName,
            companyEmail,
            companyPhonenumber,
            companyLocation,
            companyDescription,
            companyProfileImage,
            companyAddress,
            companyCategory,
            password,
        } = body

        if(!companyName || !companyEmail || !companyPhonenumber || !companyLocation || !password){
            return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
        }

        const existingProvider = await prisma.provider.findUnique({
            where: {companyEmail}
        });
        const existingUser = await prisma.user.findUnique({
            where: { email: companyEmail }
        })

        if(existingProvider || existingUser) return NextResponse.json({ error: 'Provider already exists' }, { status: 409 })

        const hashedPassword = await hash(password, 10);

        const [newProvider] = await prisma.$transaction([
            prisma.provider.create({
                data:{
                    companyName,
                    companyEmail,
                    companyAddress,
                    companyCategory,
                    companyDescription,
                    companyLocation,
                    companyPhonenumber,
                    companyProfileImage,
                    password: hashedPassword,
                }
            }),
            prisma.user.create({
                data: {
                    name: companyName,
                    email: companyEmail,
                    phonenumber: companyPhonenumber,
                    password: hashedPassword,
                    role: 'provider',
                },
            })
        ]);

        return NextResponse.json(newProvider, {status: 201});
    }catch(error){
        console.log('API error: ', error)
        return NextResponse.json({error: 'Internal server error'}, {status: 500})
    }
}