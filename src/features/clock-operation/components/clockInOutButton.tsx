/*
    Author: Torjus A.M, Thomas H
    Component responsible for rendering a button conditionally, and calling on the clock-operation function
*/
import React, {FC, useState} from 'react';
import {clockInOutOperation} from '../services/performClockOperation';
import ArrowOut from '../../../assets/arrowOut.svg';
import ArrowIn from '../../../assets/arrowIn.svg';
import '@fontsource/public-sans';
import Toast from '../../../lib/toastContainer';
import styles from './punchClock.module.css'
import {useSelectedEmployeeContext} from "../../../context/selectedEmployeeContext";
import {useEmployeeWorkDataContext} from "../../../context/employeeWorkDataContext";

const ClockInOutButton: FC = () => {
    const {selectedEmployee, updateEmployeeStatus} = useSelectedEmployeeContext();
    const {balance} = useEmployeeWorkDataContext();
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async () => {
        await clockInOutOperation(
            selectedEmployee,
            balance,
            setIsLoading,
            updateEmployeeStatus
        );
    };
    // Which style and icon to use
    const status = selectedEmployee.isClockedIn ? styles.clockedIn : styles.clockedOut;
    const Arrow = selectedEmployee.isClockedIn ? ArrowOut : ArrowIn;

    return (
        <>
            <button
                className={`${styles.buttonContainer} ${status}`}
                onClick={handleClick}
                disabled={isLoading} // Disabled while loading
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
