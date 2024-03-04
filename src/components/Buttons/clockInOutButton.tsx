// Author: Torjus A.M
import React from 'react';
import { Employee } from '../../lib/employee';
import { performCheckOperation } from '../../lib/dataAccess';
import { useEmployeeContext } from '../employeeContext';
import styles from './buttons.module.css'

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
    
    const employeeStatus = employee.isClockedIn;

    const handleClick = async () => {
        await performCheckOperation(employee.id, employeeStatus);

        // Find the index of the employee in the global state array
        const index = employees.findIndex(emp => emp.id === employee.id);
        employees[index].isClockedIn = !employeeStatus;

        // Update the employee's last check in/out time
        if (employeeStatus) {
            employees[index].lastCheckOut = new Date();
        } else {
            employees[index].lastCheckIn = new Date();
        }
        
        // Create a new array with the updated employee at the beginning if checking in, or at the end if checking out
        // Maybe inneffecient?? But it works
        const updatedEmployees = employeeStatus
            ? [...employees.slice(0, index), ...employees.slice(index + 1), employees[index]]
            : [employees[index], ...employees.slice(0, index), ...employees.slice(index + 1)];

        // Update states with new array
        setEmployees(updatedEmployees);
    };

    const buttonClass = employeeStatus ? styles.clockOut : styles.clockIn;
    
    return (
        <button onClick={handleClick} className={`${styles.buttonBase} ${styles.activeButton} ${buttonClass}`}>
            <img className={`${styles.icon} ${styles.iconActive}`} src="/clocking.png" alt="clocking-icon" />
            {employeeStatus ? 'Stemple ut' : 'Stemple inn'}
        </button>
    );
};

export default ClockInOutButton;
