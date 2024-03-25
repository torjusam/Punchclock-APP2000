// Author: Torjus A.M
import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions} from "./auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { pool } from '../../lib/dbIndex';

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
