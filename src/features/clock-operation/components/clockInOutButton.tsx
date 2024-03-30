// Author: Torjus A.M
import React, {FC} from 'react';
import {Employee} from '../../../lib/types/employee';
import {useWorkIntervalContext} from '../../../context/workIntervalContext';
import {useEmployeeContext} from '../../../context/employeeContext';
import {clockInOutOperation} from '../services/performClockOperation';
import ArrowOut from '../../../assets/arrowOut.svg';
import ArrowIn from '../../../assets/arrowIn.svg';
import '@fontsource/public-sans';
import Toast from '../../../components/toastContainer';
import styles from './punchClock.module.css'

interface ClockInOutButtonProps {
    employee: Employee;
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
    setErrorMessage: (errorMessage: string | null) => void;
}

// Updates employees status and perform check operation.
const ClockInOutButton: FC<ClockInOutButtonProps> = ({employee, isLoading, setIsLoading, setErrorMessage}) => {
    const {updateEmployeeStatus} = useEmployeeContext();
    const {workTimeData} = useWorkIntervalContext();

    const handleClick = async () => {
        await clockInOutOperation(employee, workTimeData, setIsLoading, setErrorMessage, updateEmployeeStatus);
    };

    const status = employee.isClockedIn ? styles.clockedIn : styles.clockedOut;
    const Arrow = employee.isClockedIn ? ArrowOut : ArrowIn;

    return (
        <>
            <button onClick={handleClick} className={`${styles.buttonContainer} ${status}`} disabled={isLoading}>
                <div className={styles.iconContainer}>
                    <Arrow className={styles.icon}/>
                </div>
                {employee.isClockedIn ? 'Stemple ut' : 'Stemple inn'}
            </button>
            <Toast/>
        </>
    );
};

export default ClockInOutButton;
