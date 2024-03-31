/*
    Author: Torjus A.M
    This function is used to before each API call. It's used to check if the user is authorized,
    and check the rate limit before performing the API call.
*/
import {getServerSession} from "next-auth/next";
import {limiter} from "./limiter";
import {NextApiRequest, NextApiResponse} from "next";
import {NextAuthOptions} from "next-auth";
import {logUserActivity} from "../auth/[...nextauth]";

interface HandleAPICallResponse {
    success: boolean;
    res?: NextApiResponse;
}

async function handleAPICall(req: NextApiRequest, res: NextApiResponse, authOptions: NextAuthOptions): Promise<HandleAPICallResponse> {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
        res.status(401).json({error: 'Unauthorized API request'});
        // TODO: Log unuathorized api requests, redirect to error page.
        return {success: false, res};
    }

    const remaining = await limiter.removeTokens(10);
    if (remaining < 0) {
        res.status(429).json({error: 'For mange forespørsler!'});
        // TODO: Log rate limit, redirect to error page
        // logUserActivity('rate_limit', session.user.id, 'Too many requests');
        return {success: false, res};
    }


    return {success: true, res};
}

export default handleAPICall;