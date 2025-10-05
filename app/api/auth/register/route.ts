import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { name, email, phonenumber, password, confirmPassword } = await req.json();

    if (!name || !email || !phonenumber || !password || !confirmPassword) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    if (password !== confirmPassword) {
      return NextResponse.json({ message: 'Passwords do not match' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return NextResponse.json({ message: 'Email already registered' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        phonenumber,
        password: hashedPassword,
        role: 'user',
      },
    });

    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error('JWT_SECRET is not defined');
    
    const token = jwt.sign({ id: user.id, role: 'user' }, secret, { expiresIn: '1d' });

    const response = NextResponse.json({ message: 'User registered successfully' });
    response.cookies.set('token', token, {
    httpOnly: true,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24, // 1 day
    });
    return response;
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
