/* 
    Author: Torjus A.M
    Api route for fetching current weeks worktime for an employee.
    The query filters by this calendar weeks monday - sunday total worktime.
*/
import {NextApiRequest, NextApiResponse} from 'next';
import {pool} from '../../../lib/dbIndex'
import {getServerSession} from "next-auth/next";
import {authOptions} from "../auth/[...nextauth]";
import handleAPICall from "../config/handleAPICall";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {success, res: response} = await handleAPICall(req, res, authOptions);
    if (!success) {
        return response;
    }

    try {
        const {employeeId} = req.body;

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
        res.status(500).json({error: 'Internal Server Error'});
        throw error;
    }
}
