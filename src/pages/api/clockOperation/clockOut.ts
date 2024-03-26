//Author: Torjus A.M
import {NextApiRequest, NextApiResponse} from 'next';
import {pool} from '../../../lib/dbIndex';
import {authOptions} from "../auth/[...nextauth]";
import handleAPICall from "../config/handleAPICall";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {success, res: response} = await handleAPICall(req, res, authOptions);
    if (!success) {
        return response;
    }

    try {
        const {employee, overtimeInterval} = req.body;
        const {id} = employee;
        const currentTimestamp = new Date();

        const text = (`
        UPDATE fleksitidBank
        SET 
            Checkout = $2,
            overtimeinterval = $3
        WHERE Employee_id = $1
        AND Checkin = (SELECT MAX(Checkin) FROM fleksitidBank WHERE Employee_id = $1);
        `);
        const values = [id, currentTimestamp, overtimeInterval];

        await pool.query(text, values);

        res.status(200).json({success: true});
    } catch (error) {
        res.status(500).json({error: 'Internal Server Error'});
        throw error;
    }
}