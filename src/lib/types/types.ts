/* 
    Author: Torjus A.M
    Define custom types for the application
*/

// Interface for postgre interval type
export interface Interval {
    years?: number;
    months?: number;
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
    milliseconds?: number;
}

// Default interval used when no interval is provided, or all values are 0 (to avoid errors)
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

// Interface for the data to be used in the clock history table
export interface ClockHistoryData {
    id: number;
    checkin: Date;
    checkout: Date | null;
    workinterval: Interval;
    overtimeinterval: Interval;
}

// Errors from NextApiResponse set to their status and text
export interface ResError {
    status: number;
    message: string;
}

// Type for the employees shift.
export interface Shift {
    // TODO: Use the ID to find other employees assigned to the shift.
    id?: number;
    description?: string;
    start: string;
    end: string;
}