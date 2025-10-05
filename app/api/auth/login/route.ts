import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error('JWT_SECRET is not defined');

    const token = jwt.sign({ id: user.id, role: user.role }, secret, { expiresIn: '1d' });

    const response = NextResponse.json({ role: user.role });
    response.cookies.set('token', token, {
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 1 day
    });

    return response;

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
