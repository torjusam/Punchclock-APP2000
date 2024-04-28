/**
 * @file Renders a button that calls on the clock-operation.
 * @module ClockOperation
 * @memberOf EmployeePage
 * @author Torjus A.M, Thomas H
 */
import React, {FC, useState} from 'react';
import {clockInOutOperation} from '../services/performClockOperation';
import ArrowOut from '../../../assets/arrowOut.svg';
import ArrowIn from '../../../assets/arrowIn.svg';
import {useSelectedEmployeeContext} from "../../context/selectedEmployeeContext";
import Toast from '../../../lib/toastContainer';
import styles from './punchClock.module.css'
import ClockBtnLoading from "./clockInOutBtnLoading";

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

    // Loading
    if (!selectedEmployee)
        return <ClockBtnLoading/>;

    // Button press handles clocking in or out
    const handleClick = async () => {
        await clockInOutOperation(
            selectedEmployee,
            setIsLoading,
            updateEmployeeStatus
        );
    };

    // Style the button based on the employee's clocked-in status
    const {isClockedIn} = selectedEmployee;
    const status = isClockedIn ? styles.clockedIn : styles.clockedOut;
    const text = isClockedIn ? 'Stemple ut' : 'Stemple inn';
    const Arrow = isClockedIn ? ArrowOut : ArrowIn;

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
                {text}
            </button>
            <Toast/> {/* Toast notification can be called from here */}
        </>
    );
};

export default ClockInOutButton;
