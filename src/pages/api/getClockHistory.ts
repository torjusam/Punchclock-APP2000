// Author: Torjus A.M
import {NextApiRequest, NextApiResponse} from 'next';
import {authOptions} from "./auth/[...nextauth]";
import {pool} from '../../lib/dbIndex';
import handleAPICall from "./config/handleAPICall";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {success, res: response} = await handleAPICall(req, res, authOptions);
    if (!success) {
        return response;
    }

    try {
        const {employeeId} = req.body;

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
        res.status(500).json({error: 'Internal Server Error'});
        throw error;
    }
}
