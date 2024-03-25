//Author: Torjus A.M
import {NextApiRequest, NextApiResponse} from 'next';
import {pool} from '../../../lib/dbIndex';
import {getServerSession} from "next-auth/next"
import {authOptions} from "../auth/[...nextauth]";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
        res.status(401).json({error: 'Unauthorized API request'});
        return;
    }
    try {
        const {employee, currentTime} = req.body;
        const {id} = employee;

        const text = 'INSERT INTO fleksitidBank (Employee_id, Checkin) VALUES ($1, $2)';
        const values = [id, currentTime];

        await pool.query(text, values);

        res.status(200).json({success: true});
    } catch (error) {
        console.error('Error inserting check-in data:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
}


