/**
 * @file Rate limiter for the API routes. Avoid abuse of the API and DDoS attacks by limiting the amount of requests a that can be made to the server in certain time intervals.
 * @author Torjun A.M
 */
import {RateLimiter} from "limiter";

// General limiter for most requests. Set to 80 requests per minute, can be altered
export const limiter = new RateLimiter({
    tokensPerInterval: 80,
    interval: 'minute',
    fireImmediately: true,
});

// Signin limiter has a lower limit than the general limiter to prevent brute force attacks.
export const signinLimiter = new RateLimiter({
    tokensPerInterval: 15,
    interval: 'hour',
    fireImmediately: true,
});