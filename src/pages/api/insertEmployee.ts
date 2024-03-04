//Author: Torjus A.M
import { NextApiRequest, NextApiResponse } from 'next';
import { pool } from '../../lib/dbIndex';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { firstName, lastName } = req.body;

        const text = 'INSERT INTO employee (First_name, Surname) VALUES ($1, $2)'
        const values = [firstName, lastName];

        await pool.query(text, values);
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error inserting check-out data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
