// Author: Torjus A.M
import {calculateOvertime} from './calculateOvertime';
import {durationToPostgresInterval} from '../../../lib/durationToPGInterval';
import {Employee} from "../../../lib/types/employee";

// Balance is the total working time this calender week.
export const clockOut = async (employee: Employee, balance, currentTime) => {
    // Prevent invalid clock operation
    if (!employee.isClockedIn)
        return Promise.reject(new TypeError(employee.name + ' is not clocked in!'));

    // Calculate overtime, then call on API route with it.
    try {
        const overtime = calculateOvertime(employee, balance, currentTime);
        const overtimeInterval = durationToPostgresInterval(overtime);
        const response = await fetch('/api/clockOperation/clockOut', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({employee, currentTime, overtimeInterval}),
        });
        // Server error: HTTP 200-299
        if (!response.ok) return Promise.reject(new Error(response.statusText));

        // Does not await even though function is async, because we don't need to wait for it to finish.
        setFleksiBalance(employee, overtimeInterval);
        return true; // True for success
    } catch (error) {
        return Promise.reject(error);
    }
};

const setFleksiBalance = async (employee: Employee, overtimeInterval) => {
    try {
        const response = await fetch('/api/workIntervals/setFleksBalance', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({employee, overtimeInterval}),
        });
        if (!response.ok) {
            throw new Error("Kunne ikke sette flekksisaldo: " + response.statusText);
        }
    } catch (error) {
        return Promise.reject(error);
    }
};