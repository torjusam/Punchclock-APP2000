/* 
    Uses Next.js Middleware pattern with NextAuth to protect the site.
    Only lets you go to sign in page if you session is unauthenticated.

    Code taken from: https://github.com/nextauthjs/next-auth/discussions/4136
*/
import { withAuth } from "next-auth/middleware";

export default withAuth({
	pages: {
		signIn: '/auth/signin',
		error: '/auth/error',
		verifyRequest: '/',
	},
});