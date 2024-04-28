/**
 * @file This file contains all the custom types and interfaces used throughout the application.
 * @author Torjus A.M, Thomas H
 */

/**
 * Interface for the PostgreSQL Interval type.
 * @author Torjus A.M
 */
export interface Interval {
    years?: number;
    months?: number;
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
    milliseconds?: number;
}

/**
 * Returns a default interval object.
 * This function is used when no interval is provided, or all values are 0 (to avoid errors).
 * @returns {Interval} An interval object with all properties set to 0.
 */
export function defaultInterval(): Interval {
    return {
        years: 0,
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0
    };
}

/**
 * This object represents a single entry in an employee's clock history.
 * It contains information about the check-in and check-out times, as well as the work interval and overtime interval for that entry.
 * @author Torjus A.M
 */
export interface ClockHistoryData {
    id: number;
    checkin: Date;
    checkout: Date | null;
    workinterval: Interval;
    overtimeinterval: Interval;
}

/**
 * Interface for the ResError object
 * This object represents an error from NextApiResponse set to their status and text.
 * @author Thomas H
 */
export interface ResError {
    status: number;
    message: string;
}

/**
 * Interface for the Shift object.
 * @author Thomas H
 */
export interface Shift {
    id?: number;
    description?: string;
    start: string;
    end: string;
}