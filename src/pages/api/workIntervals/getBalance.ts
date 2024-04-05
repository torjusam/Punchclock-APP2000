/* 
    Author: Torjus A.M
    Api route for fetching current weeks worktime for an employee.
    The query filters by this calendar weeks monday - sunday total worktime.
*/
import {NextApiRequest, NextApiResponse} from 'next';
import {pool} from '../../../lib/dbIndex'
import {allowMethods} from "../../../middleware/method";
import {middleware_1, middleware_2} from "../../../middleware/middlewares";
import {Middleware, handler} from "../../../middleware/handler";

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
    allowMethods(['POST']), // Use the method middleware to allow only POST requests
    middleware_1,
    middleware_2,
    getBalance,
);

/* Avoid false-positive warning "API resolved without sending a response":
Code taken from forum post answer: https://github.com/vercel/next.js/discussions/40270#discussioncomment-3571223 */
export const config = {
    api: {
        externalResolver: true,
    },
}