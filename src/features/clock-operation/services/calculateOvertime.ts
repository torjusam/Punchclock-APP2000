/**
 * @file Function for calculating overtime and working-time for an employee before clocking out.
 * Uses moment.js library to handle durations and time calculations.
 * @module ClockOperation
 * @Author Torjus A.M
 */
import moment, {duration} from 'moment';
import Employee from "../../../lib/types/employee";
import {durationToPostgresInterval} from "../../../lib/durationToPGInterval";

/**
 * Calculates the working time since the last check-in and determines any overtime.
 * Takes into account the total weekly work balance, planned work time for the week, and the daily work time.
 * Returns both the calculated working time for the current shift, and any overtime in PostgreSQL interval format.
 *
 * @param {Employee} employee - The employee object, with balance, dailyWorkTime, PlannedWork and lastCheckIn properties.
 * @param {Date} currentTime - The current timestamp as a JavaScript Date object.
 * @returns {Object} - An object containing thisWorkingTime and overtimeInterval.
 *
 * @throws {Error} - Thrown if the lastCheckIn is not a valid ISO 8601 date string.
 * @throws {TypeError} - Thrown if the working time calculated is not a number or is invalid.
 * @throws {RangeError} - Thrown if the calculated working time is less than or equal to zero.
 */
export default function calculateTime(employee: Employee, currentTime: Date) {
    // Destruct the necessary properties from the employee object.
    const {balance, dailyWorkTime, PlannedWork, lastCheckIn} = employee;

    // Convert values to milliseconds for accurate calculations
    const weekBalance = duration(balance).asMilliseconds();
    const plannedWork = duration(PlannedWork).asMilliseconds();
    const plannedDailyWork = dailyWorkTime.asMilliseconds();

    // Start by validating values
    if (!lastCheckIn || !moment(lastCheckIn, moment.ISO_8601, true).isValid()) {
        throw new Error('lastCheckIn is not valid');
    }
    const thisWorkingTime = moment(currentTime).diff(moment(lastCheckIn));

    if (isNaN(thisWorkingTime) || !thisWorkingTime) {
        throw new TypeError('Invalid clock-out time!');
    }
    if (thisWorkingTime <= 0) {
        throw new RangeError('Invalid work duration, please try again.');
    }

    // The overtime to be returned. If none of the conditions below match, return 0 (no overtime)
    let overtimeInterval = duration(0);

    // If plannedwork is reached, all working-time is overtime.
    if (weekBalance >= plannedWork) {
        overtimeInterval = duration(thisWorkingTime);
    }

        // If the sum of week balance and this working time is greater than the planned work, calculate the difference as overtime.
    // e.g: 40 hours planned, 35 hour balance + 6 hour worktime = 1 hour overtime.
    else if ((weekBalance + thisWorkingTime) > plannedWork) {
        overtimeInterval = duration((weekBalance + thisWorkingTime) - plannedWork);
    }

    // If this working time is greater than the planned daily work, calculate the difference as overtime.
    else if (thisWorkingTime > plannedDailyWork) {
        overtimeInterval = duration(thisWorkingTime - plannedDailyWork);
    }

    // Return an object with both thisWorkingTime and overtimeInterval
    // Convert thisWorkingTime and overtimeInterval to PostgreSQL intervals
    const thisWorkingTimeInterval = durationToPostgresInterval(duration(thisWorkingTime));
    const overtimePostgresInterval = durationToPostgresInterval(overtimeInterval);

    // Return an object with both thisWorkingTime and overtimeInterval as PostgreSQL intervals
    return {
        thisWorkingTime: thisWorkingTimeInterval,
        overtimeInterval: overtimePostgresInterval
    };
}