/**
 * Custom middleware handler that allows you to chain multiple middleware functions together in a single handler.
 * @see https://github.com/undrash/next.js-api-middleware/blob/main/demo-api-routes/src/pages/middleware/handler.ts
 */
import {NextApiRequest, NextApiResponse} from 'next';

/**
 * Represents a function that takes no arguments and returns void. It is used as the type for the next function in the middleware chain.
 * @typedef NextFunction
 */
export type NextFunction = () => void;

/**
 * Represents a middleware function.
 * @typedef Middleware
 * @param {NextApiRequest} req - The request object.
 * @param {NextApiResponse} res - The response object.
 * @param {NextFunction} next - The next function in the middleware chain.
 * @returns {Promise<void>} - A Promise that resolves to void.
 */
export type Middleware = (
    req: NextApiRequest,
    res: NextApiResponse,
    next: NextFunction,
) => Promise<void>;

/**
 * Executes a middleware function in the middleware chain. If the response has already been sent or there are no more middleware functions in the chain,it returns.
 * Otherwise, it calls the current middleware function with the request object, the response object, and a function that calls execMiddleware with the next middleware function in the chain.
 *
 * @function execMiddleware
 * @param {NextApiRequest} req - The request object.
 * @param {NextApiResponse} res - The response object.
 * @param {Middleware[]} middleware - The array of middleware functions.
 * @param {number} [index=0] - The index of the current middleware function in the middleware array.
 * @returns {Promise<void>} - A Promise that resolves to void.
 * @throws {Error} - Throws an Error if the current middleware function is not a function.
 */
const execMiddleware = async (
    req: NextApiRequest,
    res: NextApiResponse,
    middleware: Middleware[],
    index = 0,
) => {
    if (res.headersSent || !middleware[index]) return;

    if (typeof middleware[index] !== 'function') {
        res.status(500).end('Middleware must be a function!');
        throw new Error('Middleware must be a function!');
    }

    await middleware[index](req, res, async () => {
        await execMiddleware(req, res, middleware, index + 1);
    });
};

/**
 * Returns a function that handles a request by executing the middleware chain.
 * The returned function takes a request object and a response object as arguments, and calls execMiddleware with the request object, the response object, and the middleware array.
 * Used in the api handlers to chain multiple middleware functions together.
 *
 * @function handler
 * @param {...Middleware[]} middleware - The array of middleware functions.
 * @returns {Function} - A function that handles a request by executing the middleware chain.
 */
export const handler = (
    ...middleware: Middleware[]
) =>
    async (req: NextApiRequest, res: NextApiResponse) => {
        await execMiddleware(req, res, middleware);
    };
