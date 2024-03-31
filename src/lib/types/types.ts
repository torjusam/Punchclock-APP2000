/* 
    Author: Torjus A.M
    Define types for the application
*/

// Types for time calculation:

// Interface for postgre interval type
export interface Interval {
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds?: number;
}

// Errors from NextApiResponse set to their status and text
export interface ResError {
    status: number;
    message: string;
}

// Interface for the data to be used in the clock history table
export interface ClockHistoryData {
    checkin: Date;
    checkout: Date | null;
    workinterval: Interval;
    overtimeinterval: Interval;
}

// Type for the employees shift.
export interface Shift {
    // TODO: Use the ID to find other employees assigned to the shift.
    id?: number;
    description?: string;
    start: string;
    end: string;
}