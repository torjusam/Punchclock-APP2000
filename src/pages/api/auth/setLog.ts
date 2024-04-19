/**
 * @file API endpoint for setting logs in the database.
 * @module Authentication
 * @author Torjus A.M
 */
import {NextApiRequest, NextApiResponse} from "next";
import {pool} from "../../../lib/dbIndex";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const {event_type, account_id, details} = req.body;

        const text = (`
            INSERT INTO log (event_type, account_id, details)
            values ($1, $2, $3)
       `);
        const values = [event_type, account_id, details];
        const result = await pool.query(text, values);
        res.status(200).json(result.rows)
    } catch (error) {
        res.status(500).json({error: 'Internal Server Error'});
        throw error;
    }
}