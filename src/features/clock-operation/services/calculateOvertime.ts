/* 
    Author: Torjus A.M
    Fujcnction to calculate overtime for an employee using moment.js library 
    to handle durations and time calculations. Includes a helper function to turn
    result (duration object) into a string that fits the PostgreSQL interval type.
    TODO: Cleanup?
*/
import moment from 'moment';
import {Employee} from "../../../lib/types/employee";

// Starts by converting relevant times and intervals into ms, to accurately perform calculations.
export function calculateOvertime(employee: Employee, balance, currentTime: Date) {
    // Sets balance to 0 if no balance is found.
    const weeklyWorkTime = balance && balance[0] && balance[0].sum ? moment.duration(balance[0].sum) : moment.duration(0);
    const weeklyWorkTimeMs = weeklyWorkTime.asMilliseconds();
    // const weeklyWorkTimeMs = moment.duration(balance[0].sum).asMilliseconds();

    const plannedWorkMs = moment.duration(employee.PlannedWork).asMilliseconds();
    const dailyWorkTimeMs = employee.dailyWorkTime.asMilliseconds();

    // The interval between currentTime and the employees last checkin.
    const workTimeMs = moment(currentTime).diff(moment(employee.lastCheckIn));

    // Validate before posting to server.
    if (isNaN(workTimeMs) || !workTimeMs) {
        throw new TypeError('Ugyldig utstempling!');
    }
    if (workTimeMs <= 0) {
        throw new RangeError('Ugylidg arbeidstid, prøv igjen.');
    }

    // If plannedwork is reached, all worktime is overtime.
    if (weeklyWorkTimeMs >= plannedWorkMs) {
        return moment.duration(workTimeMs);
    }

    // If worktime exceeds planned worktime for the week, calculate offshoot as overtime. e.g 35 hour salary + 6 hour worktime = 1 hour overtime.
    if (weeklyWorkTimeMs + workTimeMs > plannedWorkMs) {
        const overtimeMs = (weeklyWorkTime.asMilliseconds() + workTimeMs) - plannedWorkMs;
        return moment.duration(overtimeMs);
    }

    // If worktime is greater than dailyWorkTime, return the offshoot as overtime. e.g 9h workday, 10h worktime = 1h overtime.
    if (workTimeMs > dailyWorkTimeMs) {
        const overtimeMs = workTimeMs - dailyWorkTimeMs;
        return moment.duration(overtimeMs);
    }

    if (workTimeMs < dailyWorkTimeMs) {
        return moment.duration(0);
    }
}