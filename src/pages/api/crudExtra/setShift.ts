// Author: Torjus A.M
import {NextApiRequest, NextApiResponse} from 'next';
import {pool} from '../../../lib/dbIndex';
import {Shift} from "../../../lib/types/types";
import Employee from "../../../lib/types/employee";
import {handler, Middleware} from "../../../middleware/handler";
import {allowMethods} from "../../../middleware/method";
import {middleware_1, middleware_2} from "../../../middleware/middlewares";

const setShift: Middleware = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const {employee, shift}: { employee: Employee, shift: Shift } = req.body;
        const {id} = employee;
        const {description, start, end} = shift;

        const client = await pool.connect();
        await pool.query('BEGIN');

        // Insert the shift and return its ID
        const shiftId = (await client.query(
            'INSERT INTO shift (description, start, "end") VALUES ($1, $2, $3) RETURNING id',
            [description, start, end]
        )).rows[0].id;
        // Use the id of the newly created shift in the junction table.
        await client.query(
            'INSERT INTO shift_employee (shift_id, employee_id) VALUES ($1, $2)',
            [shiftId, id]
        );

        await client.query('COMMIT');

        res.status(200).json({success: true});
    } catch (error) {
        res.status(500).json({error: 'Internal Server Error'});
    }
}
export default handler(
    allowMethods(['POST']), // Use the method middleware to allow only POST requests
    middleware_1,
    middleware_2,
    setShift,
);