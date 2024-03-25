/* 
    Author: Torjus A.M
    Api route for fetching current weeks worktime for an employee.
    The query filters by this calendar weeks monday - sunday total worktime.
*/
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
