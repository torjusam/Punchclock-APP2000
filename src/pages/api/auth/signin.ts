/*
    Author: Torjus A.M
    Api route for fetching the id, email and password matching the specified email given in the input.
    Returns a hashed password.
*/
import {NextApiRequest, NextApiResponse} from 'next';
import {pool} from '../../../lib/dbIndex';
import {signinLimiter} from "../config/limiter";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Rate limiter for the signin route. Prevents brute force attacks.
    const remaining = await signinLimiter.removeTokens(1);
    if (remaining < 0) {
        res.status(429).json({error: 'For mange forespørsler!'});
        return;
    }

    try {
        const {email} = req.body;

        const text = (`
        SELECT *
        FROM accounts
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
