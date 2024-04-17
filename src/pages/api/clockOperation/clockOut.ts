// Author: Torjus A.M
import {NextApiRequest, NextApiResponse} from 'next';
import {pool} from '../../../lib/dbIndex';
import {handler, Middleware} from "../../../middleware/handler";
import {allowMethods} from "../../../middleware/method";
import {middleware_1, middleware_2} from "../../../middleware/middlewares";

const clockOut: Middleware = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const {employee, currentTime, thisWorkingTime, overtimeInterval} = req.body;
        const {id} = employee;

        const text = (`
        UPDATE fleksitidBank
        SET 
            Checkout = $2,
            workinterval = $3,
            overtimeinterval = $4
        WHERE Employee_id = $1
        AND Checkin = (SELECT MAX(Checkin) FROM fleksitidBank WHERE Employee_id = $1);
        `);

        const values = [
            id,
            currentTime,
            thisWorkingTime,
            overtimeInterval
        ];

        await pool.query(text, values);
        res.status(200).json({success: true});
    } catch (error) {
        res.status(500).json({error: 'Internal Server Error'});
        throw error;
    }
}

export default handler(
    allowMethods(['POST']), // Use the method middleware to allow only POST requests
    middleware_1,
    middleware_2,
    clockOut,
);

/* Avoid false-positive warning "API resolved without sending a response":
Code taken from forum post answer: https://github.com/vercel/next.js/discussions/40270#discussioncomment-3571223 */
export const config = {
    api: {
        externalResolver: true,
    },
}