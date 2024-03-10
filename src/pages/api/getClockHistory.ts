// Author: Torjus A.M
import { NextApiRequest, NextApiResponse } from 'next';
import { pool } from '../../lib/dbIndex'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { employeeId } = req.body;

        const text = (`
            SELECT
                fb.Checkin,
                fb.Checkout,
                fb.WorkInterval,
                fb.OvertimeInterval
            FROM
                fleksitidBank fb
            WHERE
                fb.Employee_ID = $1
            ORDER BY
                fb.Checkin DESC
            LIMIT 7;
        `);

        const values = [employeeId];
        const result = await pool.query(text, values);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching employee data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
