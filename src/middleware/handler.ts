/**
 * Custom middleware handler that allows you to chain multiple middleware functions together in a single handler.
 * @see https://github.com/undrash/next.js-api-middleware/blob/main/demo-api-routes/src/pages/middleware/handler.ts
 */
import {NextApiRequest, NextApiResponse} from 'next';

export type NextFunction = () => void;

export type Middleware = (
    req: NextApiRequest,
    res: NextApiResponse,
    next: NextFunction,
) => Promise<void>;

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

export const handler = (
    ...middleware: Middleware[]
) =>
    async (req: NextApiRequest, res: NextApiResponse) => {
        await execMiddleware(req, res, middleware);
    };
