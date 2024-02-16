//Author: Torjus A.M
import { NextApiRequest, NextApiResponse } from 'next';
import { pool } from '../../lib/dbIndex'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const result = await pool.query(`
        SELECT Employee.*, MAX(CheckIn_CheckOut.Checkin) AS last_checkin, MAX(CheckIn_CheckOut.Checkout) AS last_checkout
        FROM Employee
        LEFT JOIN CheckIn_CheckOut ON Employee.ID = CheckIn_CheckOut.Employee_ID
        GROUP BY Employee.ID;
    `);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching employee data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
