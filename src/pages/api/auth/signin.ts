/*
    Author: Torjus A.M
    Api route for fetching the id, email and password matching the specified email given in the input.
    Returns a hashed password.
*/
import { NextApiRequest, NextApiResponse } from 'next';
import { pool } from '../../../lib/dbIndex';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { email } = req.body;

        const text = (`
            SELECT *
            FROM accounts
            WHERE email = $1
           `);
        const values = [email];

        const result = await pool.query(text, values);
        res.status(200).json(result.rows)
    } catch (error) {
        console.error('Error logging in!', error);
        res.status(500).json({ error: 'Internal Server Error' });
        // Throw it to the caller
        throw error;
    }
}