// Author: Torjus A.M
import {NextApiRequest, NextApiResponse} from 'next';
import {pool} from '../../lib/dbIndex'
import {authOptions} from "./auth/[...nextauth]";
import handleAPICall from "./config/handleAPICall";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {success, res: response} = await handleAPICall(req, res, authOptions);
    if (!success)
        return response;

    try {
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
    }
}
