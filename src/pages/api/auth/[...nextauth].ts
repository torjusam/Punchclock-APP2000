/* 
    Author: Torjus A.M
    Main entry point of NextAuth.js. This file is used to configure the authentication providers and options.
    The credentials provider is used to authenticate users with a self-defined username and password.
    In this case it was set as an email, even though it could just be a username and password.
*/
import NextAuth, {NextAuthOptions, User} from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from "bcrypt";
import {getSession} from "next-auth/react";

// Function to log user activity
export async function logUserActivity(eventType: string, accountId?: string, details?: string) {

    const session = await getSession()
    if (session && !accountId) {
        accountId = session.user.id
        console.log("session user: ", session.user.id);
    }
    console.log('Logging event:', eventType, details, accountId)

    await fetch('http://localhost:3000/api/auth/setLog', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            event_type: eventType,
            account_id: accountId,
            details: details
        }),
    }).catch(error => {
        console.error('Feil i loggføring:', error);
        throw new Error('Feil under loggføring, kontakt en administrator.');
    });
}

export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt',
        maxAge: 2 * 24 * 60 * 60, // Session expires after 2 days (in seconds)
        updateAge: 24 * 60 * 60, // Update session age every day (in seconds)
    },
    providers: [
        CredentialsProvider({
            type: "credentials",
            credentials: {},
            // Function to validate credentials
            async authorize(credentials, req) {
                const {email, password} = credentials as {
                    email: string
                    password: string
                };
                // Fetch account data from API endpoint
                const response = await fetch('http://localhost:3000/api/auth/signin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({email}),
                });

                if (response.status === 429) {
                    logUserActivity('ratelimit_reached', undefined, '15 unsuccessful login attempts in the last hour.');
                    throw new RateLimitError();
                }

                const users = await response.json(); // Parse response to JSON

                if (users.length > 0) {
                    const user = users[0]; // Get the first user object from the array
                    const isValid = await bcrypt.compare(password, user.password_hash);

                    if (isValid) {
                        logUserActivity('login', user.id, 'Successful login');
                        // Return the user if the password matches
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
};

export default NextAuth(authOptions);