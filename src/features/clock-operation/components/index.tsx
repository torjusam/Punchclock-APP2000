/**
 * @file Renders and formats the punchclock-timer: "stemplingsklokke".
 * @module ClockOperation
 * @Author Torjus A.M
 */
import React from 'react';
import {useSelectedEmployeeContext} from "../../context/selectedEmployeeContext";
import {formatTimer} from "../services/formatTimer";
import moment from 'moment';
import styles from './punchClock.module.css';

/**
 * This component displays the punchclock-timer for the selected employee.
 * It also shows the check-in and check-out times of the employee.
 *
 * @returns {ReactNode} The PunchClockTimer component.
 */
const PunchClockTimer = () => {
    // Destructure necessary properties from the selected employee, and the timer and loading state.
    const {
        selectedEmployee: {lastCheckIn, lastCheckOut, isClockedIn},
        timer,
        isTimerLoading
    } = useSelectedEmployeeContext();

    /**
     * Helper function to format a given time.
     * If the time is valid, it is formatted and returned. If not, a question mark is returned.
     *
     * @param {Date} time The time to be formatted.
     * @returns {string} The formatted time if valid, or a question mark if not.
     */
    const formatTime = (time: Date): string => moment(time).isValid() ? moment(time).format('LT') : '?';

    // Format the check-in and check-out times using the helper function.
    const formattedCheckIn = formatTime(lastCheckIn);
    const formattedCheckOut = isClockedIn ? ' ?' : formatTime(lastCheckOut);

    return (
        <div className={styles.timeDisplay}>
            {isTimerLoading ? (
                <>
                    <div className={styles.line}></div>
                    <div className={`${styles.line} ${styles.w2}`}></div>
                </>
            ) : (
                timer >= 0 && (
                    <>
                        <h1>{formatTimer(timer)}</h1>
                        <h2>{formattedCheckIn} - {formattedCheckOut}</h2>
                    </>
                )
            )}
        </div>
    );
};


export default PunchClockTimer;
