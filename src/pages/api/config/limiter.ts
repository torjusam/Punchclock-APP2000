import {RateLimiter} from "limiter";

export const signinLimiter = new RateLimiter({
    tokensPerInterval: 10,
    interval: 'hour',
    fireImmediately: true,
});