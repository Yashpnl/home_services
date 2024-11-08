import { cookies } from 'next/headers';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const authRoutes = ['/signin', '/signup', '/phonenumber', '/otp']

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    // --
    const { pathname } = request.nextUrl
    // --
    const cookieData = cookies().get("homeservice_token")?.value || cookies().get("google_home_services")?.value;

    // --
    const loginUser = cookieData ? cookieData : null

    // --redirect user--
    if (loginUser && authRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL('/', request.url))
    }
    // --redirect user--
    if (!loginUser && !authRoutes.includes(pathname) && pathname === "/") {
        return NextResponse.redirect(new URL('/signin', request.url))
    }

    // --next--
    return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [...authRoutes, "/"]
}
