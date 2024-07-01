export interface Interval {
    years?: number;
    months?: number;
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
    milliseconds?: number;
}

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

// Single entry in an employee's clock history
export interface ClockHistoryData {
    id: number;
    checkin: Date;
    checkout: Date | null;
    workinterval: Interval;
    overtimeinterval: Interval;
}

export interface ResError {
    status: number;
    message: string;
}

export interface Shift {
    id?: number;
    description?: string;
    start: string;
    end: string;
}