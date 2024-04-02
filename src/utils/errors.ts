/*
    Author: Torjus A.M
    Custom errors for the application, extends Error.
    Illicits different responses.
* */

class RateLimitError extends Error {
    statusCode: number;

    constructor(message = 'For mange forespørsler!', statusCode = 429) {
        super(message);
        this.statusCode = statusCode;

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, RateLimitError.prototype);
    }
}

export default RateLimitError;