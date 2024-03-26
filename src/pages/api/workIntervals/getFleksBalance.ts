// Author: Torjus A.M
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
            fleksitid_balance
        FROM
            employee 
        WHERE
            id = $1;
      `);
        const result = await pool.query(text, [employeeId]);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({error: 'Internal Server Error'});
        throw error;
    }
}