// Author: Torjus A.M
import React from 'react';
import { Employee } from '../../lib/employee';
import { performCheckOperation } from '../../lib/dataAccess';
import { useEmployeeContext } from '../employeeContext';

interface ClockInOutButtonProps {
    employee: Employee | null;
    isClockedIn: boolean;
}

// Updates employees status and perforsm check operation. Triggers re-render of employee table on frontpage
const ClockInOutButton: React.FC<ClockInOutButtonProps> = ({ employee, isClockedIn }) => {
    if (!employee) {
        return null;
    }
    const { employees, setEmployees } = useEmployeeContext();

    const handleClick = async () => {
        await performCheckOperation(employee.id, isClockedIn);

        const index = employees.findIndex(emp => emp.id === employee.id);

        employees[index].isClockedIn = !isClockedIn;

        // Create a new array with the updated employee at the beginning if checking in, or at the end if checking out
        const updatedEmployees = isClockedIn
            ? [...employees.slice(0, index), ...employees.slice(index + 1), employees[index]]
            : [employees[index], ...employees.slice(0, index), ...employees.slice(index + 1)];

        // Update states with new array
        setEmployees(updatedEmployees);
    };

    return (
        <button onClick={handleClick}>
            {isClockedIn ? 'Stemple ut' : 'Stemple inn'}
        </button>
    );

};
export default ClockInOutButton;
