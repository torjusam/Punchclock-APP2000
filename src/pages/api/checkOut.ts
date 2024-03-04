//Author: Torjus A.M
import { NextApiRequest, NextApiResponse } from 'next';
import { pool } from '../../lib/dbIndex';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = await pool.connect();

    try {
        const { employeeId } = req.body;
        await client.query('BEGIN');
        await client.query("SET TIME ZONE 'CET'");
        const selectQuery = 'SELECT MAX(Checkin) FROM CheckIn_CheckOut WHERE Employee_id = $1';
        const updateQuery = 'UPDATE CheckIn_CheckOut SET Checkout = CURRENT_TIMESTAMP ' +
                            'WHERE Employee_id = $1 AND Checkin = $2';
        const insertQuery = 'INSERT INTO fleksitidBank (Employee_id, Checkin, Checkout) ' +
                            'VALUES ($1, $2, CURRENT_TIMESTAMP)';
        

        const result = await client.query(selectQuery, [employeeId]);
        const latestCheckin = result.rows[0].max;

        await client.query(updateQuery, [employeeId, latestCheckin]);
        await client.query(insertQuery, [employeeId, latestCheckin]);

        await client.query('COMMIT'); // Commit the transaction
        res.status(200).json({ success: true });
    } catch (error) {
        await client.query('ROLLBACK'); // Rollback the transaction on error
        console.error('Error inserting check-out data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        client.release(); // Release the client back to the pool
    }
}