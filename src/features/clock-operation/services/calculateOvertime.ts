/* 
    Author: Torjus A.M
    Fujcnction to calculate overtime for an employee using moment.js library 
    to handle durations and time calculations. Includes a helper function to turn
    result (duration object) into a string that fits the PostgreSQL interval type.
*/ 
import moment from 'moment';
import 'moment/locale/nb';

// Moment library: NB = Norwegian Bokmål
moment.locale('nb');

// Starts by converting relevant times and intervals into ms, to accurately perform calculations.
export function calculateOvertime(employee, workTimeData) {
    const weeklyWorkTime = moment.duration(workTimeData[0].sum);
    const weeklyWorkTimeMs = weeklyWorkTime.asMilliseconds();
    const plannedWorkMs = moment.duration(employee.PlannedWork).asMilliseconds();
    // The employees daily worktime, anything above it will count as overtime.
    const dailyWorkTimeMs = employee.dailyWorkTime.asMilliseconds();
    // Current working time is the interval between right now(moment()), and employees last checkin.
    const workTimeMs = moment().diff(moment(employee.lastCheckIn));

    if (workTimeMs < 0) {
        throw new RangeError('Worktime is negative');
    }

    // If plannedwork is reached, all worktime is overtime.
    if (weeklyWorkTimeMs >= plannedWorkMs) {
        return moment.duration(workTimeMs);
    }

    // If worktime exceeds planned worktime for the week, calculate offshoot as overtime. e.g 35 hour salary + 6 hour worktime = 1 hour overtime.
    if (weeklyWorkTimeMs + workTimeMs > plannedWorkMs) {
        const overtimeMs = (weeklyWorkTime.asMilliseconds() + workTimeMs) - plannedWorkMs;
        const overtime = moment.duration(overtimeMs);
        return overtime;
    }

    // If worktime is greater than dailyWorkTime, return the offshoot as overtime. e.g 9h workday, 10h worktime = 1h overtime.
    if (workTimeMs > dailyWorkTimeMs) {
        const overtimeMs = workTimeMs - dailyWorkTimeMs;
        const overtime = moment.duration(overtimeMs);
        return overtime;
    }

    // If no conditions match, no overtime this time.
    if (workTimeMs < dailyWorkTimeMs) {
        return moment.duration(0);
    }
}

// Helper function to convert a Moment.js duration object to a PostgreSQL interval string
export function durationToPostgresInterval(duration) {
    const hours = Math.floor(duration.asHours());
    const minutes = duration.minutes();
    const seconds = duration.seconds();
    return `${hours} hours ${minutes} minutes ${seconds} seconds`;
}
