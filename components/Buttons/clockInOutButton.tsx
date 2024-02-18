// Author: Torjus A.M
import React, { useState } from 'react';
import styles from '../../lib/styles/Buttons.module.css';
import { Employee } from '../../lib/employee';
import { performCheckOperation } from '../../lib/dataAccess';
import { useEmployeeContext } from '../employeeContext';

interface ClockInOutButtonProps {
    employee: Employee;
    isClockedIn: boolean;
    setSelectedEmployee: React.Dispatch<React.SetStateAction<Employee | null>>
}

// Updates employees status and perforsm check operation. Triggers re-render of employee table on frontpage
const ClockInOutButton: React.FC<ClockInOutButtonProps> = ({ employee, isClockedIn, setSelectedEmployee }) => {
    const handleClick = async () => {
        await performCheckOperation(employee.id, isClockedIn);
        employee.setIsClockedIn(!isClockedIn);

        const updatedEmployee = { ...employee, isClockedIn: !isClockedIn };
        setSelectedEmployee(updatedEmployee as Employee);
      };
    
      return (
        <button onClick={handleClick}>
          {isClockedIn ? 'Stemple ut' : 'Stemple inn'}
        </button>
      );
    
    };
  export default ClockInOutButton;
