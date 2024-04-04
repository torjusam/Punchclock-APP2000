/* 
    Author: Torjus A.M
    Main entry point of NextAuth.js. This file is used to configure the authentication providers and security configuration.

    Session is set to JWT, which is JSON Web Token. This is a stateless authentication method, which means that the server
    doesn't need to store the session state, but instead the client will store the session state.

    The credentials provider is used to authenticate users with our custom defined username and password.
    In this case it was set as an email, even though it could just be a username and password.

    This config also includes a callback function that will add the user id to the session object,
    so that we can use it to log errors, and other information worth storing.
*/
import NextAuth, {NextAuthOptions, User} from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from "bcrypt";
import {getServerSession} from "next-auth/next";
import {GetServerSidePropsContext, NextApiRequest, NextApiResponse} from "next";
import {logUserActivity} from "../serverUtilts/logUserActivity";
import RateLimitError from "../../../utils/errors";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt',
        maxAge: 24 * 60 * 60, // Session expires after 24 hours (in seconds)
        updateAge: 24 * 60 * 60, // Update session age every 24 hours (in seconds)
    },
    providers: [
        // Custom provider for authenticating with an email and password.
        CredentialsProvider({
            type: "credentials",
            credentials: {},
            // Authorization function, used to validate information to authenticate user.
            async authorize(credentials, req) {
                const {email, password} = credentials as {
                    email: string
                    password: string
                };
                // NODE_ENV to determine which envirnoment the application is running (development, production, etc)
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
                    const user = users[0]; // Get the first user object from the json array
                    /*
                        Compare the password from the form, with the hashed password from the DB using bcrypt.
                        The password was created with bcrypt, and since the salt is stored in the hashed password,
                        bcrypt can use the same salt to hash the password and compare.
                        basically, the saltedHash = salt string + hashedPassword
                    */
                    const isValid = await bcrypt.compare(password, user.password_hash);
                    // Return the user if the password matches and log the event.
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
    callbacks: {
        async redirect({url, baseUrl}) {
            return `${baseUrl}/`;
        },
        // When session object is called on and returned, it will include the user id.
        session: ({session, token}) => ({
            ...session,
            user: {
                ...session.user,
                id: token.sub,
            },
        }),
    },
} satisfies NextAuthOptions;

// Helper function for fetching the serverSession (avoid passing AuthOptions to each function)
export function auth(...args: [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]] | [NextApiRequest, NextApiResponse] | []) {
    return getServerSession(...args, authOptions)
}

export default NextAuth(authOptions);