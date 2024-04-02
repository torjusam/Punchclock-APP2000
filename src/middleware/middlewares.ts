/*
    Author: Torjus A.M
    This file is a collection of middleware functions that can be used in the API routes.
    It's used to check if the user is authorized, and check the rate limit before performing the API call.
*/
import {Middleware, NextFunction} from "./handler";
import {NextApiRequest, NextApiResponse} from "next";
import {isAuthenticated, rateLimiter} from "../pages/api/serverUtilts/handleAPICall";

export const middleware_1: Middleware = async (
    req: NextApiRequest,
    res: NextApiResponse,
    next: NextFunction
) => {
    await rateLimiter(res);
    next();
}
export const middleware_2: Middleware = async (
    req: NextApiRequest,
    res: NextApiResponse,
    next: NextFunction
) => {
    await isAuthenticated(req, res);
    next();
}