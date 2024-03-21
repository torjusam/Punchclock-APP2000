// Author: Torjus A.M
import React, { useState } from 'react';
import { Employee } from '../../../lib/employee';
import { useWorkIntervalContext } from '../../../context/workIntervalContext';
import { useEmployeeContext } from '../../../context/employeeContext';
import { clockIn, clockOut } from '../services/';
import ArrowOut from '../../../assets/arrowOut.svg';
import ArrowIn from '../../../assets/arrowIn.svg';
import styles from './punchClock.module.css'

interface ClockInOutButtonProps {
    employee: Employee;
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
    setErrorMessage: (errorMessage: string | null) => void;
}

// Updates employees status and perforsm check operation.
const ClockInOutButton: React.FC<ClockInOutButtonProps> = ({ employee, isLoading, setIsLoading, setErrorMessage }) => {
    const { updateEmployeeStatus } = useEmployeeContext();
    const { workTimeData } = useWorkIntervalContext();

    const handleClick = async () => {
        setIsLoading(true);
        setErrorMessage(null); // Reset error message at the start of the operation
        try {
            const checkFunction = employee.isClockedIn ? clockOut : clockIn;
            const result = await checkFunction(employee, workTimeData);
            if (result) {
                updateEmployeeStatus(employee);
            }
        } catch (error) {
            if (error instanceof RangeError) {
                // If it's a RangeError, do nothing. Error is thrown if worktime is negative, just needs to try again.
                setErrorMessage("Ugyldig utstempling, prøv igjen.");
                return;
            } else {
                console.error(error);
                setErrorMessage("Feil ved stempling, prøv igjen senere.");
                return;
            }
        } finally {
            setIsLoading(false);
        }
    };

    const status = employee.isClockedIn ? styles.clockedIn : styles.clockedOut;
    const Arrow = employee.isClockedIn ? ArrowOut : ArrowIn;

    return (
        <button onClick={handleClick} className={`${styles.buttonContainer} ${status}`} disabled={isLoading}>
            <div className={styles.iconContainer}>
                <Arrow className={styles.icon} />
            </div>
            {employee.isClockedIn ? 'Stemple ut' : 'Stemple inn'}
        </button>
    );
};

export default ClockInOutButton;
