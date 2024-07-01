export class RateLimitError extends Error {
    statusCode: number;

    constructor(message = 'For mange forespørsler!', statusCode = 429) {
        super(message);
        this.statusCode = statusCode;

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, RateLimitError.prototype);
    }
}