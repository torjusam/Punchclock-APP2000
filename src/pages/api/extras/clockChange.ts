import {NextApiRequest, NextApiResponse} from 'next';
import {pool} from '../../../lib/dbIndex';
import {handler, Middleware} from "../../../middleware/handler";
import {allowMethods} from "../../../middleware/method";
import {middleware_1, middleware_2} from "../../../middleware/middlewares";

const clockChange: Middleware = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const {newClockIn, newClockOut, employee, oldClockIn, oldClockOut} = req.body;
        const {id} = employee;


        const text = 'UPDATE fleksitidBank SET Checkin = $1, Checkout = $2 WHERE Employee_id = $3 AND Checkin = $4 AND Checkout = $5 ';
        const values = [newClockIn, newClockOut, id, oldClockIn, oldClockOut ];

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
    clockChange,
);


export const config = {
    api: {
        externalResolver: true,
    },
}