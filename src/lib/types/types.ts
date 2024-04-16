/**
 * @file This file contains all the types and interfaces used throughout the application.
 * @Author Torjus A.M, Thomas H
 */

/**
 * Interface for the PostgreSQL Interval type.
 * @Author Torjus A.M
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
 *
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
 * @Author Torjus A.M
 *
 * @typedef {object} - ClockHistoryData
 * @property {number} id
 * @property {Date} checkin - The date and time when the employee checked in.
 * @property {Date | null} checkout - The date and time when the employee checked out. If the employee has not yet checked out, this property is null.
 * @property {Interval} workinterval - The total amount of time that the employee worked during this entry, represented as an Interval object.
 * @property {Interval} overtimeinterval - The total amount of overtime that the employee worked during this entry, represented as an Interval object.
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
 * @Author Thomas H
 *
 * @typedef {object}
 * @property {number} status - The HTTP status code of the error.
 * @property {string} message - The error message.
 */
export interface ResError {
    status: number;
    message: string;
}

/**
 * Interface for the Shift object.
 * @Author Thomas H
 *
 * @typedef {object}
 * @property {number} id - The unique identifier for this shift, other employees can be assigned to the same shift.
 */
export interface Shift {
    // TODO: Use the ID to find other employees assigned to the shift.
    id?: number;
    description?: string;
    start: string;
    end: string;
}