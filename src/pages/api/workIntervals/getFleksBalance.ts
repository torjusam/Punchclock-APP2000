/**
 * @file Api route for fetching fleksitid_balance.
 * @module EmployeePage
 * @author Torjus A.M
 */
import {NextApiRequest, NextApiResponse} from 'next';
import {pool} from '../../../lib/dbIndex'
import {handler, Middleware} from "../../../middleware/handler";
import {allowMethods} from "../../../middleware/method";
import {middleware_1, middleware_2} from "../../../middleware/middlewares";

const getFleksBalance: Middleware = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const {employeeId} = req.body;
        const text = (`
        SELECT
            fleksitid_balance
        FROM
            employee 
        WHERE
            id = $1;
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
    getFleksBalance,
);

/* Avoid false-positive warning "API resolved without sending a response":
Code taken from forum post answer: https://github.com/vercel/next.js/discussions/40270#discussioncomment-3571223 */
export const config = {
    api: {
        externalResolver: true,
    },
}