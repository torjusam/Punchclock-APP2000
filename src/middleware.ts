// Kinda scuffed next.js middleware with nextauth
import {withAuth} from "next-auth/middleware";

async function middleware(request: Request) {
    // const regex = new RegExp('/api/*');
    //
    // if (regex.test(request.url)) {
    //     const origin = request.headers.get('origin');
    //
    //     // Block requests from origins not in the allowedOrigins array.
    //     if (origin && !allowedOrigins.includes(origin)) {
    //         return new NextResponse(null, {
    //             status: 400,
    //             statusText: 'Bad request',
    //             headers: {
    //                 'Content-Type': 'text/plain',
    //             },
    //         });
    //     }
    // }
}

// Wrap nextauth middleware with next.js standard middleware
export default withAuth(middleware, {
    pages: {
        signIn: '/auth/signin',
        error: '/auth/signin',
        verifyRequest: '/',
    },
});