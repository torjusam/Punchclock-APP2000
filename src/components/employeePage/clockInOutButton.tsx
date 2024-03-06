// Author: Torjus A.M
import React from 'react';
import { Employee } from '../../lib/employee';
import { useEmployeeContext } from '../../hooks/employeeContext';
import styles from '../Buttons/buttons.module.css'
import { checkOperation } from '../../lib/checkOperation';

interface ClockInOutButtonProps {
    employee: Employee;
}

// Updates employees status and perforsm check operation. Triggers re-render of employee table on frontpage
const ClockInOutButton: React.FC<ClockInOutButtonProps> = ({ employee }) => {
    const { employees, setEmployees } = useEmployeeContext();

    const handleClick = async () => {
        if (employee) {
            const status = await checkOperation(employee, employees, setEmployees);
            console.log(status);
        }
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
