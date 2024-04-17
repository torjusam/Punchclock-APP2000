/**
 * @file Function for calculating overtime and working-time for an employee before clocking out.
 * Uses moment.js library to handle durations and time calculations.
 * @module ClockOperation
 * @Author Torjus A.M
 */
import moment, {duration} from 'moment';
import {Employee} from "../../../../lib/types/employee";
import {durationToPostgresInterval} from "../../../../lib/durationToPGInterval";

/**
 * Calculates and validates the working-time interval, and calculates any potential overtime.
 * Converts interval values to milliseconds for accurate comparisons, then to PostgreSQL intervals before posting.
 *
 * @param {Employee} employee - The employee object containing balance, planned work time and daily work time.
 * @param {Date} currentTime - The current time.
 * @returns {moment.Duration} - Returns a moment.Duration object, which represents the overtime.
 *
 * @throws {TypeError} - Throws an error if the working time is not a number or zero.
 * @throws {RangeError} - Throws an error if the week balance is less than or equal to zero.
 */
export default function calculateTime(employee: Employee, currentTime: Date) {
    // Convert employee balance to milliseconds or set to 0 if not present.
    const weekBalance = employee.balance ? duration(employee.balance).asMilliseconds() : 0;
    // Convert values to ms
    const plannedWork = duration(employee.PlannedWork).asMilliseconds();
    const plannedDailyWork = employee.dailyWorkTime.asMilliseconds();
    // Calculate this shifts working-time as the difference between right now and last check-in.

    if (!employee.lastCheckIn || !moment(employee.lastCheckIn, moment.ISO_8601, true).isValid()) {
        throw new Error('lastCheckIn er ikke gyldig');
    }
    const thisWorkingTime = moment(currentTime).diff(moment(employee.lastCheckIn));

    // Validate the working-time interval.
    if (isNaN(thisWorkingTime) || !thisWorkingTime) throw new TypeError('Ugyldig utstempling!');
    if (thisWorkingTime <= 0) throw new RangeError('Ugylidg arbeidstid, prøv igjen.');

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