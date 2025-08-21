import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
  images: {
    domains: [
      "lh3.googleusercontent.com", // for Google profile images
      "platform-lookaside.fbsbx.com", // for Facebook profile images
      "res.cloudinary.com", // for Cloudinary images
      "authentic-indonesia.com",
    ],
  },
};

export default nextConfig;
