import { NextApiRequest, NextApiResponse } from 'next';
import { pool } from '../../lib/dbIndex'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const result = await pool.query(
            'SELECT e.First_name, e.Surname, s.Start, s.End ' +
            'FROM Employee AS e ' +
            'JOIN shift_employee AS se ON e.id = se.Employee_id ' +
            'JOIN shift AS s ON s.id = se.Shift_id',
            []
        );
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
