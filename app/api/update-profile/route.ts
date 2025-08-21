import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { getToken } from "next-auth/jwt";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const { name, email, phonenumber, location, bio } = await req.json();

    const token = (await cookies()).get("token")?.value;
    const oAuthToken = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token && !oAuthToken) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }

    let userId: string | null = null;
    let userEmail: string | null = null;

    if (oAuthToken) {
      userEmail = oAuthToken.email || null;
    }

    if (token) {
      try {
        const secret = process.env.JWT_SECRET!;
        const payload = jwt.verify(token, secret) as { id: number | string };
        userId = typeof payload.id === "string" ? payload.id : null;
      } catch (err) {
        console.error("JWT verification error:", err);
        return NextResponse.json({ message: "Invalid token" }, { status: 401 });
      }
    }

    if (!userId && !userEmail) {
      return NextResponse.json({ message: "User ID or email not found in token" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: userId ? { id: userId } : { email: userEmail! },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        name,
        email,
        phonenumber,
        location,
        bio,
      },
    });

    return NextResponse.json({ message: "User updated", user: updatedUser }, { status: 200 });
  } catch (err) {
    console.error("Error updating user:", err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
