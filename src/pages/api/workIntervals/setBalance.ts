// Author: Torjus A.M
import {NextApiRequest, NextApiResponse} from 'next';
import {pool} from '../../../lib/dbIndex';
import {getServerSession} from "next-auth/next";
import {authOptions} from "../auth/[...nextauth]";
import handleAPICall from "../config/handleAPICall";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {success, res: response} = await handleAPICall(req, res, authOptions);
    if (!success) {
        return response;
    }

    try {
        const {employee, workInterval} = req.body;
        const {id} = employee;

        // Query adds the overtime interval to the existing fleks balance.
        const text = (`
        UPDATE employee
            SET balance = $1
            WHERE id = $2;
        `);
        const values = [workInterval, id];

        await pool.query(text, values);

        res.status(200).json({success: true});
    } catch (error) {
        res.status(500).json({error: 'Internal Server Error'});
        throw error;
    }
};
