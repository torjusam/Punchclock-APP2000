/**
 * @file Two main functions for performing clock-out operations, and setting the flekstid-balance.
 * @module ClockOperation
 * @author Torjus A.M
 */
import calculateTime from './calculateTime';
import Employee from "../../../utils/employee";
import {durationToPostgresInterval as durToPGInterval} from "../../../utils/durationToPGInterval";
import {duration} from "moment/moment";
import setFleksiBalance from "./setFleksiBalance";

/**
 * Performs a clock-out operation for an employee by sending a request to the api endpoint and handle the server response.
 * Calls on the calculateTime function to calculate the working time and overtime for the employee before clocking out.
 * Then set those values to the postgres-interval type before sending the request to the server.
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
        // Returns an object with thisWorkingTime and overtimeInterval
        const calculatedTime = calculateTime(employee, currentTime);
        // Convert to correct format
        const thisWorkingTime = durToPGInterval(duration(calculatedTime.thisWorkingTime));
        const overtimeInterval = durToPGInterval(duration(calculatedTime.overtimeInterval));

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