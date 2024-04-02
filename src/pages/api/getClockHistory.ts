// Author: Torjus A.M
import {NextApiRequest, NextApiResponse} from 'next';
import {pool} from '../../lib/dbIndex';
import {middleware_1, middleware_2} from "../../middleware/middlewares";
import {handler, Middleware} from "../../middleware/handler";
import {allowMethods} from "../../middleware/method";

const getClockHistory: Middleware = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const {employeeId} = req.body;

        const text = (`
            SELECT
                fb.Checkin,
                fb.Checkout,
                fb.WorkInterval,
                fb.OvertimeInterval
            FROM
                fleksitidBank fb
            WHERE
                fb.Employee_ID = $1
            ORDER BY
                fb.Checkin DESC
            LIMIT 7;
        `);

        const values = [employeeId];
        const result = await pool.query(text, values);
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
    getClockHistory
);

/* Avoid false-positive warning "API resolved without sending a response":
Code taken from forum post answer: https://github.com/vercel/next.js/discussions/40270#discussioncomment-3571223 */
export const config = {
    api: {
        externalResolver: true,
    },
}