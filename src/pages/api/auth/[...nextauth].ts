/* 
    Author: Torjus A.M
    Dynamic route handler for NextAuth.js. Also contains the global configuration for the NextAuth.js instance.
    Docs: https://next-auth.js.org/configuration/providers/credentials
*/
import NextAuth from "next-auth"
import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GitHubProvider from 'next-auth/providers/github'

export const options: NextAuthOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        CredentialsProvider({
            // Defining layout for the form on the signin page
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username",
                    type: "text",
                    placeholder: "your-username"
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "your-password"
                }
            },
            async authorize(credentials, req) {
                // This is where you retrieve user data to verify the credentials
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
                const user = { id: "1", name: "Torjus", password: "nextauth" }
                if (credentials?.username === user.name && credentials?.password === user.password) {
                    return user
                } else {
                    return null
                }
                //}
            }
        })
    ]
}

export default NextAuth(options)