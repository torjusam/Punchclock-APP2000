// Author: Torjus A.M
// TODO: Fullføre denne
import {NextApiRequest, NextApiResponse} from 'next';
import {handler, Middleware} from "../../../middleware/handler";
import {allowMethods} from "../../../middleware/method";
import {middleware_1, middleware_2} from "../../../middleware/middlewares";
import {pool} from "../../../lib/dbIndex";


const setEmployee: Middleware = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const {name, pin, profilepictureurl, plannedwork, fleksitid_balance} = req.body;

        const text = (`
            INSERT INTO employee (name, pin, profilepictureurl, plannedwork, fleksitid_balance)
            VALUES ($1, $2, $3, $4, $5);
      `);
        const values = [name, pin, profilepictureurl, plannedwork, fleksitid_balance];

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
    setEmployee,
);

/* Avoid false-positive warning "API resolved without sending a response":
Code taken from forum post answer: https://github.com/vercel/next.js/discussions/40270#discussioncomment-3571223 */
export const config = {
    api: {
        externalResolver: true,
    },
}