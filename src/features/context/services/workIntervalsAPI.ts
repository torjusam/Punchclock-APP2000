/**
 * @file Logic for performing fetch and posts on the workTime intervals from the database.
 * Used in the workIntervalContext.
 * @Author Torjus A.M
 */
import {Employee} from "../../../lib/types/employee";
import {Interval, defaultInterval} from "../../../lib/types/types";

/**
 * Fetches the balance of work intervals for a given employee from the database.
 *
 * @param {Employee} employee - The employee whose balance is to be fetched.
 * @returns {Promise<Interval>} A promise that resolves to the balance of the employee's work intervals.
 * If the balance could not be fetched, the promise resolves to a default interval of 0.
 * @throws {Error} If the fetch operation fails, an error is thrown.
 */
export const fetchBalance = async (employee: Employee) => {
    try {
        const response = await fetch('/api/workIntervals/getBalance', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({employeeId: employee.id}),
        });
        if (!response.ok) {
            throw new Error('Failed to fetch work intervals');
        }
        const result = await response.json();

        if (result && result[0].sum) {
            // Cast the result (first row, sum object) to the Interval type
            const sum = result[0].sum;

            const interval = {
                years: sum.years,
                months: sum.months,
                days: sum.days,
                hours: sum.hours,
                minutes: sum.minutes,
                seconds: sum.seconds,
                milliseconds: sum.milliseconds
            } as Interval;
            return interval;
        } else {
            return defaultInterval();
        }
    } catch (error) {
        console.error('Error:', error);
        return defaultInterval();
    }
};

//TODO: use
export const postBalance = async (employee: Employee, workInterval: string) => {
    try {
        const response = await fetch('/api/workIntervals/setBalance', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({workInterval, employee}),
        });
        if (!response.ok) {
            throw new Error('Failed to post balance to database');
        }
        return true;
    } catch (error) {
        throw error
    }
};