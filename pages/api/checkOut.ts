import { NextApiRequest, NextApiResponse } from 'next';
import { pool } from '../../lib/dbIndex';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { employeeId } = req.body;

        const text =
            'DO $$ ' +
            'DECLARE latestCheckin TIMESTAMP; ' +
            'BEGIN ' +
            'SELECT MAX(Checkin) INTO latestCheckin FROM CheckIn_CheckOut WHERE Employee_id = $1; ' +
            'UPDATE CheckIn_CheckOut SET Checkout = CURRENT_TIMESTAMP ' +
            'WHERE Employee_id = $1 AND Checkin = latestCheckin; ' +
            'INSERT INTO fleksitidBank (Employee_id, Checkin, Checkout) ' +
            'VALUES ($1, latestCheckin, CURRENT_TIMESTAMP); ' +
            'END $$;';

        const values = [employeeId];
        await pool.query(text, values);
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error inserting check-out data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
