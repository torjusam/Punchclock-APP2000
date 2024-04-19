/**
 * @file Api route for fetching the id, email and password matching the specified email given in the input.
 * @module Authentication
 * @description Returns a hashed password.
 * @author Torjus A.M
 */
import {NextApiRequest, NextApiResponse} from 'next';
import {pool} from '../../../lib/dbIndex';
import {handler, Middleware, NextFunction} from "../../../middleware/handler";
import {allowMethods} from "../../../middleware/method";
import {signinLimiter} from "../serverUtilts/rateLimiter";
import {logUserActivity} from "../serverUtilts/logUserActivity";
import {RateLimitError} from "../../../utils/errors";

/**
 * This middleware function checks if the rate limit for sign in attempts has been reached. If the rate limit has been reached, it throws a RateLimitError.
 * @function middleware_1
 * @param {NextApiRequest} req - The request object.
 * @param {NextApiResponse} res - The response object.
 * @param {NextFunction} next - The next function in the middleware chain.
 * @returns {Promise<void>} - Promise that resolves to void. It does not return a value.
 * @throws {RateLimitError} - RateLimitError if the rate limit for sign in attempts has been reached.
 */
const middleware_1: Middleware = async (req: NextApiRequest, res: NextApiResponse, next: NextFunction) => {
    const remaining = await signinLimiter.removeTokens(1);

    if (remaining < 0) {
        res.status(429).json({error: 'For mange forespørsler!'});
        // TODO: Alert admin
        logUserActivity(
            'ratelimit_reached',
            undefined,
            '15 unsuccessful signin attempts in the span of one hour.'
        );
        throw new RateLimitError();
    }
    next();
}

/**
 * Endpoint fetches the user data from the database using the email provided in the request body.
 * @function signIn
 * @param {NextApiRequest} req - The request object.
 * @param {NextApiResponse} res - The response object.
 * @returns {Promise<void>} - This function returns a Promise that resolves to void. It does not return a value.
 * @throws {Error} - Error if an error occurs during the fetch operation.
 */
const signIn: Middleware = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const {email} = req.body;

        const text = (`
        SELECT *
        FROM account
        WHERE email = $1
       `);
        const values = [email];

        const result = await pool.query(text, values);
        res.status(200).json(result.rows)
    } catch (error) {
        res.status(500).json({error: 'Internal Server Error'});
        throw error;
    }
}

// API ran after allowed methods and the middleware.
export default handler(
    allowMethods(['POST']),
    middleware_1,
    signIn,
);

/* Avoid false-positive warning "API resolved without sending a response":
Code taken from forum post answer: https://github.com/vercel/next.js/discussions/40270#discussioncomment-3571223 */
export const config = {
    api: {
        externalResolver: true,
    },
}