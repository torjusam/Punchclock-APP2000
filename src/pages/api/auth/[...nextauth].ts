import NextAuth, {NextAuthOptions, User} from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from "bcrypt";
import {getServerSession} from "next-auth/next";
import {GetServerSidePropsContext, NextApiRequest, NextApiResponse} from "next";
import {logUserActivity} from "../serverUtilts/logUserActivity";
import {RateLimitError} from "../../../utils/errors";

// Configure NextAuth
export const authOptions: NextAuthOptions = {
    // Set session to use JWT
    session: {
        strategy: 'jwt',
        maxAge: 24 * 60 * 60, // Session expires after 24 hours (in seconds)
        updateAge: 24 * 60 * 60, // Update every 24 hours
    },

    providers: [
        CredentialsProvider({
            type: "credentials",
            credentials: {},

            async authorize(credentials, req) {
                const {email, password} = credentials as { email: string, password: string };

                // Determine which environment the application is running (development, prod..)
                const baseUrl =
                    process.env.NODE_ENV === 'production' ? 'https://app-2000-gruppe20.vercel.app' : 'http://localhost:3000';

                const response = await fetch(`${baseUrl}/api/auth/signin`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({email}),
                });

                // 429 = Too many requests
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

    callbacks: {
        async redirect({url, baseUrl}) {
            return `${baseUrl}/`;
        },
    
        // Adds the user id to the session object.
        session: ({session, token}) => ({
            ...session,
            user: {
                ...session.user,
                id: token.sub,
            },
        }),
    },
} satisfies NextAuthOptions;

// Helper function for fetching serverSession
export function auth(...args: [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]] | [NextApiRequest, NextApiResponse] | []) {
    return getServerSession(...args, authOptions)
}

export default NextAuth(authOptions);