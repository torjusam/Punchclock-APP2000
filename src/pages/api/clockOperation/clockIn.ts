//Author: Torjus A.M
import {NextApiRequest, NextApiResponse} from 'next';
import {pool} from '../../../lib/dbIndex';
import {getServerSession} from "next-auth/next"
import {authOptions} from "../auth/[...nextauth]";
import {limiter} from "../config/limiter";
import handleAPICall from "../config/handleAPICall";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {success, res: response} = await handleAPICall(req, res, authOptions);
    if (!success) {
        return response;
    }

    try {
        const {employee, currentTime} = req.body;
        const {id} = employee;

        const text = 'INSERT INTO fleksitidBank (Employee_id, Checkin) VALUES ($1, $2)';
        const values = [id, currentTime];

        await pool.query(text, values);

        res.status(200).json({success: true});
    } catch (error) {
        res.status(500).json({error: 'Internal Server Error'});
        throw error;
    }
}


