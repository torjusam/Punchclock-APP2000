import { NextApiRequest, NextApiResponse } from 'next';
import { pool } from '../../lib/dbIndex';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { employeeId } = req.body;
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const deleteShiftEmployeeQuery = 'DELETE FROM shift USING shift_employee WHERE shift.id = shift_employee.shift_id AND shift_employee.employee_id = $1';
        const deleteShiftQuery = 'DELETE FROM shift_employee WHERE employee_id = $1';
        const deleteEmployeeQuery = 'DELETE FROM employee WHERE id = $1';
        const deleteCheckinCheckoutQuery = 'DELETE FROM checkin_checkout WHERE employee_id = $1';
        const deleteFleksitidBankQuery = 'DELETE FROM fleksitidbank WHERE employee_id = $1';

        await client.query(deleteShiftEmployeeQuery, [employeeId]);
        await client.query(deleteShiftQuery, [employeeId]);
        await client.query(deleteFleksitidBankQuery, [employeeId]);
        await client.query(deleteCheckinCheckoutQuery, [employeeId]);
        await client.query(deleteEmployeeQuery, [employeeId]);
        await client.query('COMMIT');

        res.status(200).json({ message: 'Employee and records deleted successfully' });
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error deleting records:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        await client.release();
    }
}    