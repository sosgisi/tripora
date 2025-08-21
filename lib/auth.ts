import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';

export async function getUserFromToken() {
  try {
    const token = (await cookies()).get('token')?.value;

    if (!token) return null;

    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error('JWT_SECRET is not defined');

    const decoded = jwt.verify(token, secret) as {
      id: string;
      role: string;
      iat: number;
      exp: number;
    };

    // Optional: fetch full user from DB
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    return user;
  } catch (err) {
    console.error('Failed to decode token:', err);
    return null;
  }
}
