/*
* Sets up rate limiting for the API routes, so they cant get abused.
* The idea is that as someone is issuing more and more requests, the response gets slower untill
* they eventually get blocked.
* */

// createRateLimiter.ts
import { RateLimiterPostgres } from 'rate-limiter-flexible';

export default async (opts: any): Promise<any> => {
    return new Promise((resolve, reject) => {
        let rateLimiter: RateLimiterPostgres;

        const ready = (err: Error | null) => {
            if (err) {
                reject(err);
            } else {
                resolve(rateLimiter);
            }
        };

        rateLimiter = new RateLimiterPostgres(opts, ready);
    });
};
