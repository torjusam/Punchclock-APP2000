// Author: Torjus A.M
import {NextApiRequest, NextApiResponse} from 'next';
import {pool} from '../../lib/dbIndex'
import {authOptions} from "./auth/[...nextauth]";
import handleAPICall from "./config/handleAPICall";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const {success, res: response} = await handleAPICall(req, res, authOptions);
    if (!success)
        return response;

    try {
        const {employeeId} = req.body;
        // Fetch shifts where the employee is scheduled.
        const text = (`
            SELECT 
                s.id, s.description, s.start, s."end"
            FROM shift s
            INNER JOIN 
                shift_employee se ON s.id = se.shift_id
            WHERE 
                se.employee_id = $1
                AND s.start > NOW() -- Fetch only shifts that have a start time in the future
            LIMIT 25; -- Probably will never need to display more than 25 shifts at a time.
      `);
        const result = await pool.query(text, [employeeId]);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({error: 'Internal Server Error'});
        throw error;
    }
}