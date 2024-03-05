// Author: Torjus A.M
import React from 'react';
import { Employee } from '../../lib/employee';
import { performCheckOperation } from '../../lib/dataAccess';
import { useEmployeeContext } from '../../hooks/employeeContext';
import styles from './buttons.module.css'
import { useCheckOperation } from '../../hooks/checkOperation';

interface ClockInOutButtonProps {
    employee: Employee | null;
}

// Updates employees status and perforsm check operation. Triggers re-render of employee table on frontpage
const ClockInOutButton: React.FC<ClockInOutButtonProps> = ({ employee }) => {
    const { employees, setEmployees } = useEmployeeContext();

    /* Must check for null value at top of component, as all logic below throws erros if employee can be null.
    probably better ways of doing this but not biggest priority */
    if (!employee) {
        return (
            <button className={`${styles.buttonBase} ${styles.disabledButton}`}>
                <img className={`${styles.icon} ${styles.iconDisabled}`}  src="/clocking.png" alt="clocking-icon" />
                Stemple
            </button>
        )
    }

    const handleClick = async () => {
        useCheckOperation(employee.id, employee.isClockedIn);
    };

    const buttonClass = employee.isClockedIn ? styles.clockOut : styles.clockIn;
    
    return (
        <button onClick={handleClick} className={`${styles.buttonBase} ${styles.activeButton} ${buttonClass}`}>
            <img className={`${styles.icon} ${styles.iconActive}`} src="/clocking.png" alt="clocking-icon" />
            {employee.isClockedIn ? 'Stemple ut' : 'Stemple inn'}
        </button>
    );
};

export default ClockInOutButton;
