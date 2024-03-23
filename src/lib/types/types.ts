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

// Interface for the data to be used in the clock history table
export interface ClockHistoryData {
    checkin: Date;
    checkout: Date | null;
    workinterval: Interval;
    overtimeinterval: Interval;
}