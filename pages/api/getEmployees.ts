//Author: Torjus A.M
import { NextApiRequest, NextApiResponse } from 'next';
import { pool } from '../../lib/dbIndex'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const result = await pool.query('SELECT * FROM Employee');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching employee data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
