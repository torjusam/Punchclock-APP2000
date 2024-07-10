import {NextApiRequest, NextApiResponse} from 'next';
import {pool} from '../../../lib/dbIndex'
import {allowMethods} from "../../../middleware/method";
import {middleware_1, middleware_2} from "../../../middleware/middlewares";
import {Middleware, handler} from "../../../middleware/handler";

// Api route for fetching current weeks worktime for an employee.
const getBalance: Middleware = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const {employeeId} = req.body;
        // Sum this calendar weeks worktime for the employee
        const text = (`
            SELECT
                SUM(workInterval)
            FROM
                fleksitidBank
            WHERE
                Employee_id = $1
                AND Checkin >= CURRENT_DATE - EXTRACT(DOW FROM CURRENT_DATE) * INTERVAL '1 day'
                AND Checkin < CURRENT_DATE + INTERVAL '1 day';
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
    getBalance,
);

export const config = {
    api: {
        externalResolver: true,
    },
}