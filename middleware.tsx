// middleware.tsx
import { NextResponse, NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const userCookie = req.cookies.get('user'); // This will be of type RequestCookie

    // If the user is not authenticated and trying to access a protected route
    if (!userCookie && pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    // If the user is authenticated, you can check roles here
    let userData = null;
    if (userCookie) {
        try {
            const userValue = userCookie.value; // Access the cookie value
            userData = JSON.parse(userValue); // Parse the JSON string
        } catch (error) {
            console.error("Failed to parse user cookie:", error);
            return NextResponse.redirect(new URL('/login', req.url)); // Redirect if parsing fails
        }
    }

    // Check role for admin routes
    if (userData && pathname.startsWith('/admin') && userData.role !== 'admin') {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
}

// Apply the middleware only to the routes you want to protect
export const config = {
    matcher: ['/dashboard', '/admin/:path*'], // Adjust this to match your protected routes
};
