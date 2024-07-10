import {limiter} from "./rateLimiter";
import {NextApiRequest, NextApiResponse} from "next";
import {auth} from "../auth/[...nextauth]";
import {logUserActivity} from "./logUserActivity";
import {RateLimitError} from "../../../utils/errors";

// Checks if the rate limit for the API has been reached
export const rateLimiter = async (res: NextApiResponse) => {
    const remaining = await limiter.removeTokens(1);
    if (remaining < 0) {
        logUserActivity('ratelimit_reached', undefined, 'Rate limit reached!');
        res.status(429).json({error: 'For mange forespørsler!'});
        throw new RateLimitError();
    }
}

// Checks if the user is authenticated
export const isAuthenticated = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await auth(req, res);

    if (!session && !session.user.email) {
        res.status(401).json({error: 'Unauthorized API request'});
        logUserActivity(
            'unAuthorized_req', undefined, 'Unauthorized attempt at api call'
        );
        throw new Error('Unauthorized API request');
    }
}