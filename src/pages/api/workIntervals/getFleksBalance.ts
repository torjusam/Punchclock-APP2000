// Author: Torjus A.M
import { NextApiRequest, NextApiResponse } from 'next';
import { pool } from '../../../lib/dbIndex'
import {getServerSession} from "next-auth/next";
import {authOptions} from "../auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
        res.status(401).json({error: 'Unauthorized API request'});
        return;
    }
    try {
        const { employeeId } = req.body;

        const text = (`
        SELECT
            fleksitid_balance
        FROM
            employee 
        WHERE
            id = $1;
      `);
        const result = await pool.query(text, [employeeId]);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching fleksitid salary', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}