/* 
    Author: Torjus A.M
    Uses Next.js Middleware pattern with NextAuth to protect the site.
    Only lets you go to sign in page if your session is unauthenticated.

    Code taken from: https://github.com/nextauthjs/next-auth/discussions/4136
*/
import {withAuth} from "next-auth/middleware";
import {NextResponse} from "next/server";

async function middleware(request: Request) {
    const regex = new RegExp('/api/*');

    if (regex.test(request.url)) {
        const origin = request.headers.get('origin');
        console.log('Origin:', origin);
    }
}

export default withAuth(middleware, {
    pages: {
        signIn: '/auth/signin',
        error: '/auth/signin',
        verifyRequest: '/',
    },
});