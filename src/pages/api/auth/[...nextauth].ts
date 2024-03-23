/* 
    Author: Torjus A.M
    Dynamic route handler for NextAuth.js. Also contains the global configuration for the NextAuth.js instance.
    Docs: https://next-auth.js.org/configuration/providers/credentials
*/
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials'

const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt',
    },
    providers: [
        CredentialsProvider({
            // Defining layout for the form on the signin page
            type: "credentials",
            credentials: {},
            authorize(credentials, req) {
                const { email, password } = credentials as {
                    email: string
                    password: string
                }
                // This is where you retrieve user data to verify the credentials

                if (email !== "tor@gmail.com" || password !== "1234") {
                    return null;
                }
                return { 
                    id: "1234", 
                    name: "Torjus", 
                    email: "tor@gmail.com", 
                    role: "admin" 
                };

                /* const res = await fetch("/api/fetchUser", {
                    method: 'POST', 
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" }
                })
                const user = await res.json()
            
                if (res.ok && user) {
                    return user
                }
                // Return null if user data could not be retrieved
                return null
                */
            },
        }),
    ],
    // Routes to go to custom signin page instead of the default.
    pages: {
        signIn: '/auth/signin',
    },
    // Async callbacks lets you control what happens when an action is performed
    callbacks: {
        session({ session, token, user }) {
            return session // The return type will match the one returned in `useSession()`
          },

    }
};

export default NextAuth(authOptions);