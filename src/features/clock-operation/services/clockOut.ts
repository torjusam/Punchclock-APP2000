// Author: Torjus A.M
import { calculateOvertime, durationToPostgresInterval } from './calculateOvertime';

// workTimeData is an array of object with one object containing the sum of all worktime for this calenderweek.
export const clockOut = async (employee, workTimeData) => {
    try {
        const overtime = await calculateOvertime(employee, workTimeData);
        const overtimeInterval = durationToPostgresInterval(overtime);
        const currentTime = new Date();
        const response = await fetch('/api/checkOut', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ employee, currentTime, overtimeInterval }),
        });
        if (!response.ok) {
            throw new Error('Failed to perform check operation');
        }
        return true; // Tell the caller that the operation was successful.
    } catch (error) {
        // Reject the promise with the error
        return Promise.reject(error);
    }
};