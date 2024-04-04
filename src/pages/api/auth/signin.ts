/*
    Author: Torjus A.M
    Api route for fetching the id, email and password matching the specified email given in the input.
    Returns a hashed password.
    TODO: Fix build
*/
import {NextApiRequest, NextApiResponse} from 'next';
import {pool} from '../../../lib/dbIndex';
import {handler, Middleware, NextFunction} from "../../../middleware/handler";
import {allowMethods} from "../../../middleware/method";
import {signinLimiter} from "../serverUtilts/rateLimiter";
import {logUserActivity} from "../serverUtilts/logUserActivity";
import RateLimitError from "../../../utils/errors";

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