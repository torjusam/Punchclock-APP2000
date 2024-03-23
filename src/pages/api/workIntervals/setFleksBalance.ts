// Author: Torjus A.M
import { NextApiRequest, NextApiResponse } from 'next';
import { pool } from '../../../lib/dbIndex';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { employee, overtimeInterval } = req.body;
        const { id } = employee;
        
        // Query adds the overtime interval to the existing fleks balance.
        const text = (`
        UPDATE employee
            SET fleksitid_balance = fleksitid_balance + $1
            WHERE id = $2;
        `);
        const values = [overtimeInterval, id];
        await pool.query(text, values);

        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Feil under innsetting av fleksitid-saldo i DB:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
