// Author: Torjus A.M
import { NextApiRequest, NextApiResponse } from 'next';
import { pool } from '../../../lib/dbIndex'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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