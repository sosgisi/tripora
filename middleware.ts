import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import { getToken } from 'next-auth/jwt';

const PUBLIC_PATHS = ['/', '/login', '/register'];

export async function middleware(req: NextRequest) {

    const { pathname } = req.nextUrl;
    const isPublicPath = PUBLIC_PATHS.includes(pathname);

    const token = req.cookies.get('token')?.value;
    const oAuthToken = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const isAuthenticated = Boolean(token || oAuthToken);
    
    if (token) {
        try {
            const secret = new TextEncoder().encode(process.env.JWT_SECRET);
            const { payload } = await jwtVerify(token, secret);

            const userRole = payload.role as string | undefined;

            // ✅ Redirect based on user role when accessing /login or /register
            if (pathname === '/login' || pathname === '/register') {
                if(userRole === 'provider' || userRole === 'admin'){
                    return NextResponse.redirect(new URL('/provider/overview', req.url));
                }else if(userRole === 'user'){
                    return NextResponse.redirect(new URL('/', req.url));
                }
            }

            // ✅ Redirect to /login if user not logged in and trying to access /bookings
            if(pathname==='/bookings' && !userRole){
                return NextResponse.redirect(new URL('/login', req.url));
            }

            // ✅ Redirect admin or provider users from / paths
            if(pathname === '/' && (userRole === 'admin' || userRole === 'provider')){
                return NextResponse.redirect(new URL('/provider/overview', req.url));
            }

            // ✅ Redirect user or USER roles from /provider paths
            if(pathname.includes('/provider') && (userRole === 'user' || userRole === 'USER')){
                return NextResponse.redirect(new URL('/', req.url));
            }

            return NextResponse.next();
        } catch (err) {
            console.error('Token verify failed:', err);
            return NextResponse.redirect(new URL('/login', req.url));
        }
    }

    // ✅ for google/facebook authenticated user
    if (oAuthToken){
        if(pathname === '/login' || pathname === '/register'){
            return NextResponse.redirect(new URL('/', req.url));
        }
        
        if(pathname.includes('/provider') && (oAuthToken.role === 'user' || oAuthToken.role === 'USER')){
            return NextResponse.redirect(new URL('/', req.url));
        }
        
        return NextResponse.next();
    }

    // ✅ Allow access to public paths always
    if (isPublicPath) {
        return NextResponse.next();
    }

    // ✅ If not authenticated, redirect to login
    if (!isAuthenticated) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.redirect(new URL('/login', req.url));
}

export const config = {
     matcher: [
        '/login',
        '/register',
        '/',
        '/profile/:path*',
        '/provider/:path*',
        '/((?!api|_next/static|_next/image|favicon.ico).*)'
    ],
}