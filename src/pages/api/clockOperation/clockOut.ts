//Author: Torjus A.M
import { NextApiRequest, NextApiResponse } from 'next';
import { pool } from '../../../lib/dbIndex';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = await pool.connect();

    try {
        const { employee, overtimeInterval } = req.body;
        const { id } = employee;
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

        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error inserting check-out data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        client.release(); // Release the client back to the pool
    }
}