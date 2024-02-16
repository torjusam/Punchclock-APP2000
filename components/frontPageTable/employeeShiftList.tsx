//Author: Torjus A.M, Thomas H
import React, { useEffect, useState, useContext, use } from 'react';
import { Employee } from '../../lib/employee';
import EmployeeListDisplay from './employeeTable';
import ClockInOutButton from '../Buttons/clockInOutButton'
import GoToPersonalPageButton from '../Buttons/redirectToPageButton';
import { deleteEmployee, performCheckOperation } from '../../lib/dataAccess';
import Link from 'next/link';
import DeleteEmployeeButton from '../Buttons/deleteEmployeeButton';
import container from '../../lib/styles/flexContainers.module.css';
import { useEmployeeContext } from '../employeeContext';

const EmployeeShiftList: React.FC = () => {
  // Use custom hook for state context
  const { employees, setEmployees, clockedInEmployees, setClockedInEmployees } = useEmployeeContext()
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [resultMessage, setResultMessage] = useState<string | void>();

  const handleSelectedEmployee = (employee: Employee) => {
    setSelectedEmployee(selectedEmployee || null);
  };

  const clockInOut = async (employee: Employee) => {
    const response = await performCheckOperation(employee.id, employee.isClockedIn);
      setClockedInEmployees(prevClockedInEmployees => prevClockedInEmployees.filter(emp => emp.id !== employee.id));
      setResultMessage('Check' + (employee.isClockedIn ? ' out' : ' in') + ' successful');

  };

  return (
    <>
      {employees.length > 0 ? (
        <EmployeeListDisplay
          employeeShiftInfo={employees}
          onSelectEmployee={handleSelectedEmployee}
          selectedEmployee={selectedEmployee}
        />
      ) : (
        <p>No employees found.</p>
      )}
    </>
  );
}

export default EmployeeShiftList;