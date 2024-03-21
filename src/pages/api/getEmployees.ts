// Author: Torjus A.M
import { NextApiRequest, NextApiResponse } from 'next';
import { pool } from '../../lib/dbIndex'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const result = await pool.query(`
        SELECT
            e.ID,
            e.name,
            e.role,
            e.pin,
            e.profilepictureurl,
            e.plannedwork,
            MAX(fb.Checkin) AS lastCheckIn,
            MAX(fb.Checkout) AS lastCheckOut
        FROM
            Employee e
        LEFT JOIN
            fleksitidbank fb ON e.ID = fb.Employee_ID
        GROUP BY
            e.ID, e.name, e.role, e.pin, e.profilepictureurl;
      `);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching employee data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
