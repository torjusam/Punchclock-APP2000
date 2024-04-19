/**
 * @file Two main functions for performing clock-out operations, and setting the flekstid-balance.
 * @module ClockOperation
 * @Author Torjus A.M
 */
import calculateTime from './calculateIntervals/calculateOvertime';
import {Employee} from "../../../lib/types/employee";
import Employee from "../../../lib/types/employee";

/**
 * Performs a clock-out operation for an employee by sending a request to the api endpoint.
 *
 * @param {Employee} employee - The employee who is clocking out.
 * @param {Date} currentTime - The current time of the clock-out operation.
 * @returns {Promise<boolean>} - Returns a promise that resolves to true if the operation was successful.
 * @throws {TypeError} - Throws a TypeError if the employee is not clocked in.
 * @throws {Error} - Throws an Error if the response from the server is not ok.
 */
export const clockOut = async (employee: Employee, currentTime: Date): Promise<boolean> => {
    if (!employee.isClockedIn)
        return Promise.reject(new TypeError(employee.name + ' is not clocked in!'));

    try {
        const {overtimeInterval, thisWorkingTime} = calculateTime(employee, currentTime);
        const response = await fetch('/api/clockOperation/clockOut', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({employee, currentTime, thisWorkingTime, overtimeInterval}),
        });
        // Server error: HTTP 200-299
        if (!response.ok) return Promise.reject(new Error(response.statusText));

        // Does not await even though function is async, because we don't need to wait for it to finish.
        setFleksiBalance(employee, overtimeInterval);
        return true; // True for success
    } catch (error) {
        throw error;
    }
};

/**
 * Sets the balance of fleksitid for an employee by sending a request to the api endpoint.
 *
 * @param {Employee} employee - The employee whose flexitime balance is being set.
 * @param {string} overtimeInterval - The overtime interval to be added to the employee's flexitime balance.
 * @returns {Promise<void>} - Returns a promise that resolves when the operation is complete.
 * @throws {Error} - Throws an Error if the response from the server is not ok.
 */
const setFleksiBalance = async (employee: Employee, overtimeInterval: string): Promise<void> => {
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
        throw error;
    }
};