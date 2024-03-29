// Author: Torjus A.M
import {NextApiRequest, NextApiResponse} from 'next';
import {pool} from '../../../lib/dbIndex';
import {authOptions} from "../auth/[...nextauth]";
import handleAPICall from "../config/handleAPICall";
import {Shift} from "../../../lib/types/types";
import {Employee} from "../../../lib/types/employee";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const {success, res: response} = await handleAPICall(req, res, authOptions);
    if (!success)
        return response;

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