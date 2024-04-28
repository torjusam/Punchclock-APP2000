/**
 * @file Renders and formats the punchclock-timer for the selected employee.
 * @module ClockOperation
 * @memberof EmployeePage
 * @author Torjus A.M
 */
import React from 'react';
import {useSelectedEmployeeContext} from "../../context/selectedEmployeeContext";
import moment from 'moment';
import styles from './punchClock.module.css';

/**
 * Helper function to format given time into a string representation of hours, minutes, and seconds.
 * @param {number} seconds - The time in seconds to be formatted.
 * @returns {string} A string representing the formatted time. The format is "00t 00m 00s".
 */
function formatTimer(seconds: number) {
    const duration = moment.duration(seconds, 'seconds');
    const hours = duration.hours().toString().padStart(2, '0');
    const minutes = duration.minutes().toString().padStart(2, '0');
    const secs = duration.seconds().toString().padStart(2, '0');
    return `${hours}t ${minutes}m ${secs}s`;
}

/**
 * Component displays the punchclock-timer for the selected employee.
 * It also shows the check-in and check-out times of the employee, depending on their clocked-in status.
 * @description The timer will display a loading animation while fetching data.
 * @returns {ReactNode} The PunchClockTimer component.
 */
const PunchClockTimer = () => {
    const {selectedEmployee: emp, timer, isTimerLoading} = useSelectedEmployeeContext();

    // Loading animation while fetching data. Last part of if-statement is to avoid a flicker when the timer is 0.
    if (!emp || isTimerLoading || (!isTimerLoading && emp.isClockedIn && timer <= 0)) {
        return (
            <div className={styles.timeDisplay}>
                <div className={styles.line}></div>
                <div className={`${styles.line} ${styles.w2}`}></div>
            </div>
        )
    }

    // If the employee is not clocked in, and the timer is 0 or null display default. This is for newly created employees.
    if (!emp.isClockedIn && (!timer && !emp.lastCheckOut)) {
        return (
            <div className={styles.timeDisplay}>
                <h1>00t 00m 00s</h1>
                <h2>Stemple Inn</h2>
            </div>
        );
    }

    // Format time as 00:00 if valid, or ? if not.
    const formatTime = (time: Date): string => moment(time).isValid() ? moment(time).format('LT') : '?';

    return (
        <div className={styles.timeDisplay}>
            <h1>{formatTimer(timer)}</h1>
            {/* Display checkin - checkout, or ? if checked in */}
            <h2>{formatTime(emp.lastCheckIn)} - {emp.isClockedIn ? ' ?' : formatTime(emp.lastCheckOut)}</h2>
        </div>
    );
};


export default PunchClockTimer;
