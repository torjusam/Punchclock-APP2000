// Author: Torjus A.M
import { calculateOvertime } from './calculateOvertime';
import { durationToPostgresInterval } from '../../../lib/durationToPGInterval';

// workTimeData is an array of object with one object containing the sum of all worktime for this calenderweek.
export const clockOut = async (employee, workTimeData) => {
    try {
        // Create a new date object to get the current time. Passed to the calculateOvertime function to make sure they are in sync.
        const currentTime = new Date();
        const overtime = await calculateOvertime(employee, workTimeData, currentTime);
        const overtimeInterval = durationToPostgresInterval(overtime);
        const response = await fetch('/api/clockOperation/clockOut', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ employee, currentTime, overtimeInterval }),
        });
        if (!response.ok) {
            throw new Error('Failed to perform check operation');
        }
        // Does not await even though function is async, because we don't need to wait for it to finish.
        await setFleksiBalance(employee, overtimeInterval);
        return true; // Tell the caller that the operation was successful.
    } catch (error) {
        // Reject the promise with the error
        return Promise.reject(error);
    }
};

const setFleksiBalance = async (employee, overtimeInterval) => {
    try {
        const response = await fetch('/api/workIntervals/setFleksBalance', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ employee, overtimeInterval }),
        });
        if (!response.ok) {
            throw new Error('Kunne ikke oppdatere fleksitid-saldo');
        }
    } catch (error) {
        return Promise.reject(error);
    }
};