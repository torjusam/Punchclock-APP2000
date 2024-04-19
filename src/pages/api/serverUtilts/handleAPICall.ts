/**
 * @file Various server helper-functions to be used before each API call.
 * @author Torjus A.M
 */
import {limiter} from "./rateLimiter";
import {NextApiRequest, NextApiResponse} from "next";
import {auth} from "../auth/[...nextauth]";
import {logUserActivity} from "./logUserActivity";
import {RateLimitError} from "../../../utils/errors";

/**
 * This function checks if the rate limit for the API has been reached. If the rate limit has been reached, it throws a RateLimitError.
 * @function rateLimiter
 * @param {NextApiResponse} res - The response object.
 * @returns {Promise<void>} - Promise that resolves to void. It does not return a value.
 * @throws {RateLimitError} - RateLimitError if the rate limit for the API has been reached.
 */
export const rateLimiter = async (res: NextApiResponse) => {
    const remaining = await limiter.removeTokens(1);
    if (remaining < 0) {
        logUserActivity('ratelimit_reached', undefined, 'Rate limit reached!');
        res.status(429).json({error: 'For mange forespørsler!'});
        throw new RateLimitError();
    }
}

/**
 * Checks if the user is authenticated. It uses the auth function to get the current session data. If the user is not authenticated, it logs the activity, sends a 401 response, and throws an Error.
 * @function isAuthenticated
 * @param {NextApiRequest} req - The request object.
 * @param {NextApiResponse} res - The response object.
 * @returns {Promise<void>} - This function returns a Promise that resolves to void. It does not return a value.
 * @throws {Error} - Throws an Error if the user is not authenticated.
 */
export const isAuthenticated = async (req: NextApiRequest, res: NextApiResponse) => {
    // Use helper function to get current session data
    const session = await auth(req, res);

    if (!session && !session.user.email) {
        res.status(401).json({error: 'Unauthorized API request'});
        logUserActivity(
            'unAuthorized_req', undefined, 'Unauthorized attempt at api call'
        );
        throw new Error('Unauthorized API request');
    }
}