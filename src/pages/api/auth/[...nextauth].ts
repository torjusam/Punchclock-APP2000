/* 
    Author: Torjus A.M
    Main entry point of NextAuth.js. This file is used to configure the authentication providers and options.
    The credentials provider is used to authenticate users with a self-defined username and password.
    In this case it was set as an email, even though it could just be a username and password.
*/
import NextAuth, {NextAuthOptions, User} from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt',
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
                const users = await response.json(); // Parse response to JSON

                if (users.length > 0) {
                    const user = users[0]; // Get the first user object from the array
                    const isValid = await bcrypt.compare(password, user.password_hash);

                    if (isValid) {
                        // Return the user if the password matches
                        return {
                            id: user.id,
                            email: user.email,
                            password: user.password,
                            role: "admin"
                        } as User;
                    } else {
                        throw new Error("Brukernavn eller passord er feil")
                    }
                } else {
                    // If user or password is missing, return null indicating authentication failure
                    throw new Error("Autentiseringsfeil, prøv igjen");
                }
            },
        }),
    ],
    // Redirects to custom signin page, instead of NextAuths default page.
    pages: {
        signIn: '/auth/signin',
    },
};

export default NextAuth(authOptions);