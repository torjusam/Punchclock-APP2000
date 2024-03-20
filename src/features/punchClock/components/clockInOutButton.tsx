// Author: Torjus A.M
import React, {useState} from 'react';
import { Employee } from '../../../lib/employee';
import { useWorkIntervalContext } from '../../../context/workIntervalContext';
import { useEmployeeContext } from '../../../context/employeeContext';
import ArrowOut from '../../../assets/arrowOut.svg';
import ArrowIn from '../../../assets/arrowIn.svg';
import styles from './punchClock.module.css'
import { checkOperation } from '../services/checkOperation';

interface ClockInOutButtonProps {
    employee: Employee;
    setIsLoading: (isLoading: boolean) => void;
}

// Updates employees status and perforsm check operation.
const ClockInOutButton: React.FC<ClockInOutButtonProps> = ({ employee, setIsLoading }) => {
    const { employees, setEmployees } = useEmployeeContext();
    const { workTimeData } = useWorkIntervalContext();

    const handleClick = async () => {
        if (employee) {
            setIsLoading(true);
            await checkOperation(employee, employees, setEmployees, workTimeData);
            setIsLoading(false);
        }
    };

    const status = employee.isClockedIn ? styles.clockedIn : styles.clockedOut;
    const Arrow = employee.isClockedIn ? ArrowOut : ArrowIn;

    return (
        <button onClick={handleClick} className={`${styles.buttonContainer} ${status}`}>
            <div className={styles.iconContainer}>
                <Arrow className={styles.icon} />
            </div>
            {employee.isClockedIn ? 'Stemple ut' : 'Stemple inn'}
        </button>
    );
};

export default ClockInOutButton;
