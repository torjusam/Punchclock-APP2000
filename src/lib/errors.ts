/*
* Author: Torjus A.M
* Custom errors for the application, extends Error.
* Illicits different responses.
* */

// When theres too many requests
class RateLimitError extends Error {
    statusCode: number;

    constructor(message = 'For mange forespørsler!', statusCode = 429) {
        super(message);
        this.statusCode = statusCode;

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, RateLimitError.prototype);
    }
}

class NetworkError extends Error {
    statusCode: number;

    constructor(message = 'Kan ikke koble til databasen eller utføre spørringen.', statusCode = 503) {
        super(message);
        this.statusCode = statusCode;

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, RateLimitError.prototype);
    }
}