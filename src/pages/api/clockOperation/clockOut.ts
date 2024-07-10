import {NextApiRequest, NextApiResponse} from 'next';
import {pool} from '../../../lib/dbIndex';
import {handler, Middleware} from "../../../middleware/handler";
import {allowMethods} from "../../../middleware/method";
import {middleware_1, middleware_2} from "../../../middleware/middlewares";

const clockOut: Middleware = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const {employee, currentTime, thisWorkingTime, overtimeInterval} = req.body;
        const {id} = employee;

        // Query finds the latest checkin for the employee, and updates the checkout time, workinterval and overtimeinterval.
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
    allowMethods(['POST']),
    middleware_1,
    middleware_2,
    clockOut,
);

export const config = {
    api: {
        externalResolver: true,
    },
}