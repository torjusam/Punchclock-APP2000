// Author: Torjus A.M
import { NextApiRequest, NextApiResponse } from 'next';
import { pool } from '../../lib/dbIndex'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { employeeId } = req.body;

        const text = (`
        SELECT
            SUM(workInterval)
        FROM
            fleksitidBank
        WHERE
            Employee_id = $1
            AND Checkin >= CURRENT_DATE - EXTRACT(DOW FROM CURRENT_DATE) * INTERVAL '1 day'
            AND Checkin < CURRENT_DATE + INTERVAL '1 day';
        `);

        const result = await pool.query(text, [employeeId]);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching employee data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
