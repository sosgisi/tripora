import { verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  const token = (await cookies()).get('token')?.value;

  if (!token) {
    return NextResponse.json({ user: null }, { status: 200 });
  }

  try {
    const secret = process.env.JWT_SECRET!;
    const payload = verify(token, secret) as { id: string };

    const user = await prisma.user.findUnique({
      where: { id: payload.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        phonenumber: true,
        location: true,
        bio: true,
        profileImage: true,
      },
    });

    return NextResponse.json({ user });
  } catch (error) {
    console.error('JWT verification failed:', error);
    return NextResponse.json({ error: 'JWT verification failed' }, { status: 401 });
  }
}
