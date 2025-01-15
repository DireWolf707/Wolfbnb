import { auth } from '@/auth'
import { NextResponse } from 'next/server'

const PUBLIC_ROUTES = ['/']
const AUTH_API_PREFIX = '/api/auth'

export default auth((req) => {
    const { nextUrl } = req
    const isLoggedIn = !!req.auth
    if (nextUrl.pathname.startsWith(AUTH_API_PREFIX)) return NextResponse.next()

    if (!isLoggedIn && !PUBLIC_ROUTES.includes(nextUrl.pathname))
        return NextResponse.redirect(
            new URL(
                `/api/auth/signin?callbackUrl=${nextUrl.href}`,
                nextUrl.origin
            )
        )

    return NextResponse.next()
})

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
}
