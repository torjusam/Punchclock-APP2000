//Author: Torjus A.M
import { NextApiRequest, NextApiResponse } from 'next';
import { pool } from '../../lib/dbIndex';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { employee } = req.body;
        const { id } = employee;
        const currentTimestamp = new Date();

        const text = 'INSERT INTO fleksitidBank (Employee_id, Checkin) VALUES ($1, $2)';
        const values = [id, currentTimestamp];

        await pool.query(text, values);

        res.status(200).json({ success: true});
    } catch (error) {
        console.error('Error inserting check-in data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


