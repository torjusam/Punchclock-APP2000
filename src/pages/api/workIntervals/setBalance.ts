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
    allowMethods(['POST']),
    middleware_1,
    middleware_2,
    setBalance,
);

export const config = {
    api: {
        externalResolver: true,
    },
}