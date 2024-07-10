import {NextApiRequest, NextApiResponse} from 'next';
import {pool} from '../../lib/dbIndex';
import {middleware_1, middleware_2} from "../../middleware/middlewares";
import {handler, Middleware} from "../../middleware/handler";
import {allowMethods} from "../../middleware/method";

const getClockHistory: Middleware = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const {employeeId} = req.body;

        // Gets the last 7 clock-ins for the employee
        const text = (`
            SELECT
                id,
                checkin,
                checkout,
                workInterval,
                overtimeInterval
            FROM
                fleksitidBank
            WHERE
                employee_id = $1
            ORDER BY
                checkin DESC
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

export const config = {
    api: {
        externalResolver: true,
    },
}