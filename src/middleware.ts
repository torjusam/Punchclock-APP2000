/**
 * @file Middleware function for handling cors requests and protecting API routes and pages.
 * @module Middleware
 * @Author Torjus A.M
 */
import {withAuth} from "next-auth/middleware";
import {NextResponse} from "next/server";

/**
 * An asynchronous middleware function for handling API requests.
 *
 * @param {Request} request - The incoming request object.
 * @returns {NextResponse} - The response object.
 *
 * This function checks if the request URL matches the '/api/*' pattern.
 * If it does, it retrieves the origin of the request from the headers.
 * If the origin is not included in the allowedOrigins array, it blocks the request and returns a 400 status code.
 *
 * Note: The actual implementation of the origin check is commented out because its not relevant with a vercel hosted app.
 */
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

/**
 * Middleware function wrapped with the withAuth function from next-auth.
 * Used to protect pages and API routes from unauthorized access.
 *
 * @exports default withAuth
 * The withAuth function takes two parameters:
 * 1. The middleware function.
 * 2. An options object that specifies the pages to be used for sign-in, error handling, and verify request.
 * @description Implemented with help from: https://github.com/nextauthjs/next-auth/discussions/4136
 */
export default withAuth(middleware, {
    pages: {
        signIn: '/auth/signin',
        error: '/auth/signin',
        verifyRequest: '/',
    },
});