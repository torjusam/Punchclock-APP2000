import {NextApiRequest, NextApiResponse} from 'next';
import {pool} from '../../lib/dbIndex'
import {handler, Middleware} from "../../middleware/handler";
import {allowMethods} from "../../middleware/method";
import {middleware_1, middleware_2} from "../../middleware/middlewares";

const getShifts: Middleware = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const {employeeId} = req.body;
        // Fetches the next 25 shifts for the employee
        const text = (`
            SELECT 
                s.id, s.description, s.start, s."end"
            FROM shift s
            INNER JOIN 
                shift_employee se ON s.id = se.shift_id
            WHERE 
                se.employee_id = $1
                AND s.start > NOW()
            LIMIT 25;
      `);
        const result = await pool.query(text, [employeeId]);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({error: 'Internal Server Error'});
        throw error;
    }
}

export default handler(
    allowMethods(['POST']),
    middleware_1,
    middleware_2,
    getShifts,
);

export const config = {
    api: {
        externalResolver: true,
    },
}