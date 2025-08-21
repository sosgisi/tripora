import { prisma } from '@/lib/prisma';
import { v2 as cloudinary } from 'cloudinary';
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { Readable } from 'stream';
import type { UploadApiResponse } from 'cloudinary';

cloudinary.config({
  secure: true,
});

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get('file') as File | null;

  if (!file) {
    return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
  }

  const token = (await cookies()).get('token')?.value;
  if (!token) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);
    const userId = String(payload.id); // Adjust to match your Prisma model (`String` ID)

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'profile-images' },
        (error, result) => {
          if (error) return reject(error);
          if (!result) return reject(new Error('Cloudinary returned no result'));
          resolve(result);
        }
      );
      Readable.from(buffer).pipe(stream);
    });

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    await prisma.user.update({
      where: { id: userId },
      data: { profileImage: result.secure_url },
    });

    return NextResponse.json({ url: result.secure_url });
  } catch (error) {
    console.error('Upload failed:', error);
    return NextResponse.json({ message: 'Upload failed' }, { status: 500 });
  }
}
