/*
    Author: Torjus A.M
    This function is used to before each API call. It's used to check if the user is authorized,
    and check the rate limit before performing the API call.
*/
import {getServerSession} from "next-auth/next";
import {limiter} from "./limiter";
import {NextApiRequest, NextApiResponse} from "next";
import {NextAuthOptions} from "next-auth";

interface HandleAPICallResponse {
    success: boolean;
    res?: NextApiResponse;
}

async function handleAPICall(req: NextApiRequest, res: NextApiResponse, authOptions: NextAuthOptions): Promise<HandleAPICallResponse> {
    const remaining = await limiter.removeTokens(1);
    if (remaining < 0) {
        res.status(429).json({error: 'For mange forespørsler!'});
        return {success: false, res};
    }

    const session = await getServerSession(req, res, authOptions);
    if (!session) {
        res.status(401).json({error: 'Unauthorized API request'});
        return {success: false, res};
    }

    return {success: true, res};
}

export default handleAPICall;