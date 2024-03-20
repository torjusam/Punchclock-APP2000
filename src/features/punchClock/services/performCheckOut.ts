
import moment from 'moment';
import 'moment/locale/nb';

// Moment library: NB = Norwegian Bokmål
moment.locale('nb');

function calculateOvertime(employee, workTimeData) {
    // The employees daily worktime, anything above it will count as overtime.
    const dailyWorkTimeMs = employee.dailyWorkTime.asMilliseconds();
    // Current working time is the difference between last checkin and right now, in ms.
    const worktimeMs = moment().diff(moment(employee.lastCheckIn));
    const weeklyWorkTime = moment.duration(workTimeData[0].sum);
    const plannedWorkMs = moment.duration(employee.PlannedWork).asMilliseconds();

    if (worktimeMs < 0) {
        throw new RangeError('Worktime is negative');
    }
    // If plannedwork is reached, all worktime is overtime.
    if (weeklyWorkTime.asMilliseconds() >= plannedWorkMs) {
        return moment.duration(worktimeMs);
    }

    // If worktime is greater than dailyWorkTime, calculate overtime.
    if (worktimeMs > dailyWorkTimeMs) {
        const overtimeMs = worktimeMs - dailyWorkTimeMs;
        const overtime = moment.duration(overtimeMs);
        return overtime;
    }

    // If no conditions match, no overtime this time.
    if (worktimeMs < dailyWorkTimeMs) {
        return moment.duration(0);
    }
}

// Helper function to convert a Moment.js duration object to a PostgreSQL interval string
function durationToPostgresInterval(duration) {
    const hours = Math.floor(duration.asHours());
    const minutes = duration.minutes();
    const seconds = duration.seconds();
    console.log(hours, minutes, seconds);
    return `${hours} hours ${minutes} minutes ${seconds} seconds`;
}

// Perform API call after calculating overtime.
export const checkOutEmployee = async (employee, workTimeData) => {
    try {
        const overtime = await calculateOvertime(employee, workTimeData);
        const overtimeInterval = durationToPostgresInterval(overtime);
        const currentTime = new Date();
        const response = await fetch('/api/checkOut', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ employee, currentTime, overtimeInterval }),
        });
        if (!response.ok) {
            throw new Error('Failed to perform check operation');
        }
        return overtime;
    } catch (error) {
        // Reject the promise with the error
        return Promise.reject(error);
    }
};