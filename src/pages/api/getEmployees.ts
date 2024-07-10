import {NextApiRequest, NextApiResponse} from 'next';
import {pool} from '../../lib/dbIndex'
import {handler, Middleware} from '../../middleware/handler';
import {allowMethods} from '../../middleware/method';
import {middleware_1, middleware_2} from "../../middleware/middlewares";

const getEmployees: Middleware = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        // Relevant employee data, aswell as the last check-in and check-out.
        const result = await pool.query(`
        SELECT
            e.ID,
            e.name,
            e.pin,
            e.profilepictureurl,
            e.plannedwork,
            MAX(fb.Checkin) AS lastCheckIn,
            MAX(fb.Checkout) AS lastCheckOut
        FROM
            Employee e
        LEFT JOIN
            fleksitidbank fb ON e.ID = fb.Employee_ID
        GROUP BY
            e.ID, e.name, e.pin, e.profilepictureurl;
      `);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({error: 'Internal Server Error'});
        throw error;
    }
}

export default handler(
    allowMethods(['GET']),
    middleware_1,
    middleware_2,
    getEmployees,
);

export const config = {
    api: {
        externalResolver: true,
    },
}