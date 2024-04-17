/**
 * @file Renders a button that calls on the clock-operation.
 * @module ClockOperation
 * @Author Torjus A.M, Thomas H
 */
import React, {FC, useState} from 'react';
import {clockInOutOperation} from '../services/performClockOperation';
import ArrowOut from '../../../assets/arrowOut.svg';
import ArrowIn from '../../../assets/arrowIn.svg';
import {useSelectedEmployeeContext} from "../../context/selectedEmployeeContext";
import Toast from '../../../lib/toastContainer';
import styles from './punchClock.module.css'

/**
 * ClockInOutButton is a functional component that renders a button with conditional styling.
 * The button's onClick event triggers the clockInOutOperation function.
 * The button is disabled while the clockInOutOperation function is loading or the timer is loading.
 * The button's text and icon change based on whether the selected employee is clocked in or not.
 * @returns {JSX.Element} A button element with conditional styling and functionality.
 */
const ClockInOutButton: FC = () => {
    const {selectedEmployee, updateEmployeeStatus, isTimerLoading} = useSelectedEmployeeContext();
    const [isLoading, setIsLoading] = useState(false);

    /**
     * handleClick is an async function that triggers the clockInOutOperation function.
     * It updates the loading state and the selected employee's status.
     */
    const handleClick = async () => {
        await clockInOutOperation(
            selectedEmployee,
            setIsLoading,
            updateEmployeeStatus
        );
    };

    // Which style and icon to use based on if employee is clocked in or not
    const status = selectedEmployee.isClockedIn ? styles.clockedIn : styles.clockedOut;
    const Arrow = selectedEmployee.isClockedIn ? ArrowOut : ArrowIn;

    return (
        <>
            <button
                className={`${styles.buttonContainer} ${status}`}
                onClick={handleClick}
                disabled={isLoading || isTimerLoading} // Disabled while loading
            >
                <div className={styles.iconContainer}>
                    <Arrow className={styles.icon}/>
                </div>
                {selectedEmployee.isClockedIn ? 'Stemple ut' : 'Stemple inn'}
            </button>
            <Toast/> {/* Toast notification can be called from here */}
        </>
    );
};

export default ClockInOutButton;
