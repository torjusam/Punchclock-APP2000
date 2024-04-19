/**
 * @file Collection of middleware functions for the API routes.
 * @author Torjus A.M
 */
import {Middleware, NextFunction} from "./handler";
import {NextApiRequest, NextApiResponse} from "next";
import {isAuthenticated, rateLimiter} from "../pages/api/serverUtilts/handleAPICall";

// Checks for rate limiting
export const middleware_1: Middleware = async (
    req: NextApiRequest,
    res: NextApiResponse,
    next: NextFunction
) => {
    await rateLimiter(res);
    // Execute the next middleware function in the chain
    next();
}

// Checks for authentication (if user is logged in)
export const middleware_2: Middleware = async (
    req: NextApiRequest,
    res: NextApiResponse,
    next: NextFunction
) => {
    await isAuthenticated(req, res);
    next();
}