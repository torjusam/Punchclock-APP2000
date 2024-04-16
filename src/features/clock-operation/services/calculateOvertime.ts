/**
 * @file Function for calculating overtime for an employee.
 * Uses moment.js library to handle durations and time calculations.
 * @module ClockOperation
 * @Author Torjus A.M
 */
import moment from 'moment';
import {Employee} from "../../../lib/types/employee";

/**
 * Validates the working-time interval, and calculates any potential overtime.
 * Converts interval values to milliseconds for accurate comparisons
 *
 * @param {Employee} employee - The employee object containing balance, planned work time and daily work time.
 * @param {Date} currentTime - The current time.
 * @returns {moment.Duration} - Returns a moment.Duration object, which represents the overtime.
 *
 * @throws {TypeError} - Throws an error if the working time is not a number or zero.
 * @throws {RangeError} - Throws an error if the week balance is less than or equal to zero.
 */
export function calculateOvertime(employee: Employee, currentTime: Date) {
    // Convert employee balance to milliseconds or set to 0 if not present.
    const weekBalance = employee.balance ? moment.duration(employee.balance).asMilliseconds() : 0;
    // Convert values to ms
    const plannedWork = moment.duration(employee.PlannedWork).asMilliseconds();
    const plannedDailyWork = employee.dailyWorkTime.asMilliseconds();
    // Calculate this shifts working-time as the difference between right now and last check-in.
    const thisWorkingTime = moment(currentTime).diff(moment(employee.lastCheckIn));

    // Validate the working-time interval.
    if (isNaN(thisWorkingTime) || !thisWorkingTime) throw new TypeError('Ugyldig utstempling!');
    if (weekBalance <= 0) throw new RangeError('Ugylidg arbeidstid, prøv igjen.');

    // If plannedwork is reached, all working-time is overtime.
    if (weekBalance >= plannedWork) {
        return moment.duration(thisWorkingTime);
    }

    // If the sum of week balance and this working time is greater than the planned work, calculate the difference as overtime.
    // e.g: 40 hours planned, 35 hour balance + 6 hour worktime = 1 hour overtime.
    if ((weekBalance + thisWorkingTime) > plannedWork) {
        return moment.duration((weekBalance + thisWorkingTime) - plannedWork);
    }

    // If this working time is greater than the planned daily work, calculate the difference as overtime.
    if (thisWorkingTime > plannedDailyWork) {
        return moment.duration(thisWorkingTime - plannedDailyWork);
    }

    // If none of the above conditions are met, return 0 as overtime
    return moment.duration(0);
}