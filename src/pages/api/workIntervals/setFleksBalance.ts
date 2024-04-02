// Author: Torjus A.M
import {NextApiRequest, NextApiResponse} from 'next';
import {pool} from '../../../lib/dbIndex';
import {handler, Middleware} from "../../../middleware/handler";
import {allowMethods} from "../../../middleware/method";
import {middleware_1, middleware_2} from "../../../middleware/middlewares";

const setFleksBalance: Middleware = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const {employee, overtimeInterval} = req.body;
        const {id} = employee;

        const text = (`
        UPDATE employee
            SET fleksitid_balance = fleksitid_balance + $1
            WHERE id = $2;
        `);
        const values = [overtimeInterval, id];
        await pool.query(text, values);

        res.status(200).json({success: true});
    } catch (error) {
        res.status(500).json({error: 'Internal Server Error'});
        throw error;
    }
};

export default handler(
    allowMethods(['POST']), // Use the method middleware to allow only POST requests
    middleware_1,
    middleware_2,
    setFleksBalance,
);

/* Avoid false-positive warning "API resolved without sending a response":
Code taken from forum post answer: https://github.com/vercel/next.js/discussions/40270#discussioncomment-3571223 */
export const config = {
    api: {
        externalResolver: true,
    },
}