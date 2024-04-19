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
 * @returns {ReactNode} The PunchClockTimer component.
 */
const PunchClockTimer = () => {
    // Destructure necessary properties from the selected employee, and the timer and loading state.
    const {
        selectedEmployee: {lastCheckIn, lastCheckOut, isClockedIn},
        timer,
        isTimerLoading
    } = useSelectedEmployeeContext();

    const formatTime = (time: Date): string => moment(time).isValid() ? moment(time).format('LT') : '?';

    // Format the check-in and check-out times using the helper function.
    const formattedCheckIn = formatTime(lastCheckIn);
    const formattedCheckOut = isClockedIn ? ' ?' : formatTime(lastCheckOut);

    return (
        <div className={styles.timeDisplay}>
            {isTimerLoading || (isClockedIn && timer === 0) ? (
                <>
                    <div className={styles.line}></div>
                    <div className={`${styles.line} ${styles.w2}`}></div>
                </>
            ) : (
                <>
                    {/* If the employee is not clocked in, and the timer is 0 or null, display "00t 00m 00s" */}
                    {!isClockedIn && (timer === 0 || !timer) && (
                        <>
                            <h1>00t 00m 00s</h1>
                            <h2>Stemple Inn</h2>
                        </>
                    )}
                    {/* If timer is valid and above 0, display the timer and check-in/out times */}
                    {timer >= 1 && (
                        <>
                            <h1>{formatTimer(timer)}</h1>
                            <h2>{formattedCheckIn} - {formattedCheckOut}</h2>
                        </>
                    )}
                </>
            )}
        </div>
    );
};


export default PunchClockTimer;
