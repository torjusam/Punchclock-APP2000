/**
 * @file Api route for setting the employees balance.
 * @author Torjus A.M
 */
import {NextApiRequest, NextApiResponse} from 'next';
import {pool} from '../../../lib/dbIndex';
import {Middleware, handler} from "../../../middleware/handler";
import {allowMethods} from "../../../middleware/method";
import {middleware_1, middleware_2} from "../../../middleware/middlewares";

const setBalance: Middleware = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const {employee, workInterval} = req.body;
        const {id} = employee;

        const text = (`
        UPDATE employee
            SET balance = $1
            WHERE id = $2;
        `);
        const values = [workInterval, id];

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
    setBalance,
);

/* Avoid false-positive warning "API resolved without sending a response":
Code taken from forum post answer: https://github.com/vercel/next.js/discussions/40270#discussioncomment-3571223 */
export const config = {
    api: {
        externalResolver: true,
    },
}