/**
 * @file This file is the main entry point of NextAuth.js. It is used to configure the authentication providers and security configuration.
 * @module Authentication
 * @author Torjus A.M
 */
import NextAuth, {NextAuthOptions, User} from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from "bcrypt";
import {getServerSession} from "next-auth/next";
import {GetServerSidePropsContext, NextApiRequest, NextApiResponse} from "next";
import {logUserActivity} from "../serverUtilts/logUserActivity";
import {RateLimitError} from "../../../utils/errors";

/**
 * @typedef NextAuthOptions
 * @property {Object} session - The session configuration.
 * @property {Array} providers - The authentication providers.
 * @property {Object} pages - The pages configuration.
 * @property {Object} callbacks - The callbacks configuration.
 */
export const authOptions: NextAuthOptions = {
    /**
     * Session is set to JWT, which is a JSON Web Token. This is a stateless authentication method, which means that the server
     * doesn't need to store the session state, but instead the client will store it.
     */
    session: {
        strategy: 'jwt',
        maxAge: 24 * 60 * 60, // Session expires after 24 hours (in seconds)
        updateAge: 24 * 60 * 60, // Update session age every 24 hours (in seconds)
    },
    /**
     * Providers is an array of authentication providers. In this case, we only have one provider, which is the credentials provider.
     * The credentials provider is used to authenticate users with our custom defined username and password.
     * @description Provider includes: type of provider, the credentials object, and the authorize function.
     * @see https://next-auth.js.org/providers/credentials
     */
    providers: [
        CredentialsProvider({
            type: "credentials",
            credentials: {},
            /**
             * Authorization function used to validate information to authenticate user.
             *
             * @function authorize
             * @param {Object} credentials - The credentials object containing the email and password of the user.
             * @param {Object} req - The request object.
             * @returns {User} - Returns the user object if the user is authenticated successfully.
             * @throws {RateLimitError} - Throws a RateLimitError if the user has made too many unsuccessful attempts to sign in.
             * @throws {Error} - Throws an error if the email or password is incorrect.
             */
            async authorize(credentials, req) {
                const {email, password} = credentials as { email: string, password: string };

                // Determine which environment the application is running (development, prod..)
                const baseUrl =
                    process.env.NODE_ENV === 'production' ? 'https://app-2000-gruppe20.vercel.app' : 'http://localhost:3000';

                // Fetch account data from DB using the email provided on signin.
                const response = await fetch(`${baseUrl}/api/auth/signin`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({email}),
                });

                // 429 = Too many requests for the endpoint.
                if (response.status === 429) {
                    logUserActivity(
                        'ratelimit_reached',
                        undefined,
                        '15 unsuccessful signin attempts in the span of one hour.'
                    );
                    throw new RateLimitError();
                }

                const users = await response.json(); // Parse response to JSON

                if (users.length > 0) {
                    const user = users[0];
                    // Compare the password from the form, with the hashed password from the DB using bcrypt.
                    const isValid = await bcrypt.compare(password, user.password_hash);
                    // Return the user if the password matches, and log the event.
                    if (isValid) {
                        logUserActivity('login', user.id, 'Successful login');
                        return {
                            id: user.id,
                            email: user.email,
                            password: user.password,
                            role: "admin"
                        } as User;
                    } else {
                        logUserActivity('failed_login', undefined, 'Submitted wrong password');
                        throw new Error("Brukernavn eller passord er feil. Prøv igjen.")
                    }
                } else {
                    logUserActivity('failed_login', undefined, 'Submitted wrong email.');
                    throw new Error("Brukernavn eller passord er feil. Prøv igjen.");
                }
            },
        }),
    ],
    // Redirects to custom signin page, instead of NextAuths default page.
    pages: {
        signIn: '/auth/signin',
        error: '/auth/signin',
    },
    /**
     * Callbacks are asynchronous functions you can use to control what happens when an action is performed.
     * With JWT you can implement access controls without a database.
     * @see https://next-auth.js.org/configuration/callbacks
     */
    callbacks: {
        async redirect({url, baseUrl}) {
            return `${baseUrl}/`;
        },
        /**
         * @function session
         * @description This function is called to manage the session. It adds the user id to the session object.
         * @param {Object} session - The session object.
         * @param {Object} token - The token object.
         * @returns {Object} The updated session object.
         */
        session: ({session, token}) => ({
            ...session,
            user: {
                ...session.user,
                id: token.sub,
            },
        }),
    },
} satisfies NextAuthOptions;

/**
 * @function auth
 * @description Helper function for fetching the serverSession (avoid passing AuthOptions to each function)
 * @param {Array} args - The arguments to pass to the getServerSession function.
 * @returns {Object} The server session.
 */
export function auth(...args: [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]] | [NextApiRequest, NextApiResponse] | []) {
    return getServerSession(...args, authOptions)
}

export default NextAuth(authOptions);