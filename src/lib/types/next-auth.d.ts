/*
    This file is used to extend the default NextAuth types, specifically to include role on the user type.
    Taken from: https://stackoverflow.com/a/77072780
*/
import {
    type DefaultSession,
    type DefaultUser,
} from "next-auth";

declare module "next-auth" {
    interface Session extends DefaultSession {
        user: DefaultSession["user"] & {
            id: string;
        };
    }
    interface User extends DefaultUser {
        role: Role;
    }
}