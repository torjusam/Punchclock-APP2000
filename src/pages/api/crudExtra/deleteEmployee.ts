// Author: Torjus A.M
import {NextApiRequest, NextApiResponse} from 'next';
import {pool} from '../../../lib/dbIndex';
import {handler, Middleware} from "../../../middleware/handler";
import {allowMethods} from "../../../middleware/method";
import {middleware_1, middleware_2} from "../../../middleware/middlewares";

const deleteEmployee: Middleware = async (req: NextApiRequest, res: NextApiResponse) => {
    const {employeeId} = req.body;
    // Connect to its own client to perform the transaction, instead of the pool
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const queries = [
            'DELETE FROM shift USING shift_employee WHERE shift.id = shift_employee.shift_id AND shift_employee.employee_id = $1',
            'DELETE FROM shift_employee WHERE employee_id = $1',
            'DELETE FROM fleksitidbank WHERE employee_id = $1',
            'DELETE FROM employee WHERE id = $1'
        ];

        for (const query of queries) {
            await client.query(query, [employeeId]);
        }

        await client.query('COMMIT');

        res.status(200).json({message: 'Employee and records deleted successfully'});
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error deleting records:', error);
        res.status(500).json({error: 'Internal Server Error'});
    } finally {
        await client.release();
    }
}

export default handler(
    allowMethods(['POST']), // Use the method middleware to allow only POST requests
    middleware_1,
    middleware_2,
    deleteEmployee,
);